/*
  Warnings:

  - You are about to alter the column `name` on the `establishments` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `address` on the `establishments` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `result` on the `inspections` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `code` on the `violations` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(50)`.

*/
-- AlterTable
ALTER TABLE "establishments" ALTER COLUMN "name" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "address" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "created_at" SET DATA TYPE TIMESTAMP(6),
ALTER COLUMN "updated_at" SET DATA TYPE TIMESTAMP(6);

-- AlterTable
ALTER TABLE "inspections" ALTER COLUMN "date" SET DATA TYPE DATE,
ALTER COLUMN "result" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "created_at" SET DATA TYPE TIMESTAMP(6),
ALTER COLUMN "updated_at" SET DATA TYPE TIMESTAMP(6);

-- AlterTable
ALTER TABLE "violations" ALTER COLUMN "code" SET DATA TYPE VARCHAR(50),
ALTER COLUMN "created_at" SET DATA TYPE TIMESTAMP(6),
ALTER COLUMN "updated_at" SET DATA TYPE TIMESTAMP(6);

-- CreateIndex
CREATE INDEX "establishments_name_address_idx" ON "establishments"("name", "address");

-- CreateIndex
CREATE INDEX "inspections_establishment_id_idx" ON "inspections"("establishment_id");

-- CreateIndex
CREATE INDEX "violations_inspection_id_idx" ON "violations"("inspection_id");
