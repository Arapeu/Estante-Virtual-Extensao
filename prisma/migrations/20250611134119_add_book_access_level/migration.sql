-- CreateEnum
CREATE TYPE "BookAccess" AS ENUM ('PUBLIC', 'STUDENT_AND_TEACHER', 'TEACHER_ONLY');

-- AlterTable
ALTER TABLE "books" ADD COLUMN     "accessLevel" "BookAccess" NOT NULL DEFAULT 'PUBLIC';
