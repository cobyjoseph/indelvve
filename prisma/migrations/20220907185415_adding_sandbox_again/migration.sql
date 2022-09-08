/*
  Warnings:

  - You are about to drop the `Sandbox` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Topic" DROP CONSTRAINT "Topic_user_id_FK_fkey";

-- AlterTable
ALTER TABLE "Topic" ALTER COLUMN "user_id_FK" DROP NOT NULL;

-- DropTable
DROP TABLE "Sandbox";

-- CreateTable
CREATE TABLE "Topic_Sandbox" (
    "id" SERIAL NOT NULL,
    "topicTitle" TEXT NOT NULL,

    CONSTRAINT "Topic_Sandbox_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Topic" ADD CONSTRAINT "Topic_user_id_FK_fkey" FOREIGN KEY ("user_id_FK") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
