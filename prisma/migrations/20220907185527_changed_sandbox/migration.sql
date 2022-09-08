/*
  Warnings:

  - You are about to drop the column `topicTitle` on the `Topic_Sandbox` table. All the data in the column will be lost.
  - Added the required column `topic_title` to the `Topic_Sandbox` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Topic_Sandbox" DROP COLUMN "topicTitle",
ADD COLUMN     "topic_title" TEXT NOT NULL;
