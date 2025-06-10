-- CreateEnum
CREATE TYPE "BookVisibility" AS ENUM ('PUBLIC', 'TEACHERS_ONLY');

-- AlterTable
ALTER TABLE "books" ADD COLUMN     "visibility" "BookVisibility" NOT NULL DEFAULT 'PUBLIC';
