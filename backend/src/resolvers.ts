import prisma from "./lib/prisma.ts";
import { Resolvers } from "./resolvers-types.ts";

const formatDates = (obj: any) => ({
  ...obj,
  createdAt: obj.createdAt.toISOString(),
  updatedAt: obj.updatedAt.toISOString(),
  inspections: obj.inspections?.map((insp: any) => ({
    ...insp,
    date: insp.date.toISOString(),
    createdAt: insp.createdAt.toISOString(),
    updatedAt: insp.updatedAt.toISOString(),
  })),
});

export const resolvers: Resolvers = {
  Query: {
    establishments: async () => {
      const results = await prisma.establishment.findMany({
        include: { inspections: true },
      });
      return results.map(formatDates);
    },
    establishment: async (_, args: { id: number }) => {
      const result = await prisma.establishment.findUnique({
        where: { id: args.id },
        include: { inspections: true },
      });
      return result ? formatDates(result) : null;
    },
  },
};
