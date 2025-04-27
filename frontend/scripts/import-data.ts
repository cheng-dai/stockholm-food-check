import { prisma } from "../../backend/src/lib/prisma";
import * as fs from "fs";
import * as path from "path";

// Helper function to parse float safely
function parseFloatSafe(value: any): number {
  const parsed = parseFloat(value);
  return isNaN(parsed) ? 0 : parsed;
}

// Helper function to parse date safely
function parseDateSafe(dateStr: string): Date {
  try {
    const date = new Date(dateStr);
    return isNaN(date.getTime()) ? new Date() : date;
  } catch (error) {
    console.error("Error parsing date:", dateStr);
    return new Date();
  }
}

async function importData() {
  try {
    // Ensure clean connection at start
    await prisma.$connect();

    // Read the JSON file
    const rawData = fs.readFileSync(
      path.join(process.cwd(), "src", "data.json"),
      "utf-8"
    );
    const data = JSON.parse(rawData);

    console.log("Starting data import...");
    let processed = 0;
    let inspectionsCreated = 0;
    let violationsCreated = 0;

    // Process each establishment
    for (const item of data) {
      try {
        console.log("Processing item:", {
          name: item.Name,
          address: item.Address,
          hasInspectionDate: !!item.InspectionDate,
          hasViolations: !!(
            item.Violations &&
            Array.isArray(item.Violations) &&
            item.Violations.length > 0
          ),
        });

        const name = (item.Name || "Unknown").slice(0, 255);
        const address = (item.Address || "Unknown").slice(0, 255);

        // Find or create establishment
        let establishment = await prisma.establishment.findFirst({
          where: {
            AND: [{ name: { equals: name } }, { address: { equals: address } }],
          },
        });

        const establishmentData = {
          name,
          address,
          latitude: parseFloatSafe(item.Latitude),
          longitude: parseFloatSafe(item.Longitude),
        };

        if (establishment) {
          // Update existing establishment
          establishment = await prisma.establishment.update({
            where: { id: establishment.id },
            data: establishmentData,
          });
          console.log("Updated establishment:", establishment.id);
        } else {
          // Create new establishment
          establishment = await prisma.establishment.create({
            data: establishmentData,
          });
          console.log("Created new establishment:", establishment.id);
        }

        // Create inspection if it exists
        if (item.InspectionDate) {
          try {
            const inspectionDate = parseDateSafe(item.InspectionDate);
            console.log("Creating inspection for date:", inspectionDate);

            const inspection = await prisma.inspection.create({
              data: {
                date: inspectionDate,
                result: (item.Result || "Unknown").slice(0, 255),
                establishmentId: establishment.id,
              },
            });
            inspectionsCreated++;
            console.log("Created inspection:", inspection.id);

            // Create violations if they exist
            if (
              item.Violations &&
              Array.isArray(item.Violations) &&
              item.Violations.length > 0
            ) {
              console.log(`Processing ${item.Violations.length} violations`);

              for (const violation of item.Violations) {
                try {
                  const violationRecord = await prisma.violation.create({
                    data: {
                      code: (violation.Code || "Unknown").slice(0, 50),
                      description: violation.Description || "No description",
                      points: parseInt(violation.Points) || 0,
                      inspectionId: inspection.id,
                    },
                  });
                  violationsCreated++;
                  console.log("Created violation:", violationRecord.id);
                } catch (violationError) {
                  console.error("Error creating violation:", violationError);
                  console.error("Violation data:", violation);
                }
              }
            }
          } catch (inspectionError) {
            console.error("Error creating inspection:", inspectionError);
            console.error("Inspection data:", {
              date: item.InspectionDate,
              result: item.Result,
              establishmentId: establishment.id,
            });
          }
        }

        processed++;
        if (processed % 10 === 0) {
          console.log(
            `Progress: ${processed} establishments, ${inspectionsCreated} inspections, ${violationsCreated} violations`
          );
        }
      } catch (itemError) {
        console.error("Error processing item:", itemError);
        console.error("Item data:", item);
        continue;
      }
    }

    console.log(
      `Data import completed!\n` +
        `Processed ${processed} establishments\n` +
        `Created ${inspectionsCreated} inspections\n` +
        `Created ${violationsCreated} violations`
    );
  } catch (error) {
    console.error("Error importing data:", error);
    throw error;
  } finally {
    console.log("Cleaning up connections...");
    await prisma.$disconnect();
  }
}

// Handle cleanup on script exit
process.on("beforeExit", async () => {
  console.log("Ensuring disconnection before exit...");
  await prisma.$disconnect();
});

process.on("SIGINT", async () => {
  console.log("Received SIGINT. Cleaning up...");
  await prisma.$disconnect();
  process.exit(0);
});

// Run the import
importData().catch(async (e) => {
  console.error(e);
  await prisma.$disconnect();
  process.exit(1);
});
