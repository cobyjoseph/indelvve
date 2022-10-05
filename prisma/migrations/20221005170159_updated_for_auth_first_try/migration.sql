/*
  Warnings:

  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `user_collection` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `user_post` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[username]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userAuthToken]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `passwordHash` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userAuthToken` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('USER', 'ADMIN');

-- DropForeignKey
ALTER TABLE "Collection" DROP CONSTRAINT "Collection_user_id_FK_fkey";

-- DropForeignKey
ALTER TABLE "Comments" DROP CONSTRAINT "Comments_user_id_FK_fkey";

-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_user_id_FK_fkey";

-- DropForeignKey
ALTER TABLE "Topic" DROP CONSTRAINT "Topic_user_id_FK_fkey";

-- DropForeignKey
ALTER TABLE "user_collection" DROP CONSTRAINT "user_collection_user_id_FK_fkey";

-- DropForeignKey
ALTER TABLE "user_post" DROP CONSTRAINT "user_post_user_id_FK_fkey";

-- AlterTable
ALTER TABLE "Collection" ALTER COLUMN "user_id_FK" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Comments" ALTER COLUMN "user_id_FK" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Post" ALTER COLUMN "user_id_FK" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Topic" ALTER COLUMN "user_id_FK" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
ADD COLUMN     "passwordHash" TEXT NOT NULL,
ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'USER',
ADD COLUMN     "userAuthToken" TEXT NOT NULL,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "User_id_seq";

-- AlterTable
ALTER TABLE "user_collection" DROP CONSTRAINT "user_collection_pkey",
ALTER COLUMN "user_id_FK" SET DATA TYPE TEXT,
ADD CONSTRAINT "user_collection_pkey" PRIMARY KEY ("user_id_FK", "collection_id_FK");

-- AlterTable
ALTER TABLE "user_post" DROP CONSTRAINT "user_post_pkey",
ALTER COLUMN "user_id_FK" SET DATA TYPE TEXT,
ADD CONSTRAINT "user_post_pkey" PRIMARY KEY ("user_id_FK", "post_id_FK");

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "User_userAuthToken_key" ON "User"("userAuthToken");

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_user_id_FK_fkey" FOREIGN KEY ("user_id_FK") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_post" ADD CONSTRAINT "user_post_user_id_FK_fkey" FOREIGN KEY ("user_id_FK") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Collection" ADD CONSTRAINT "Collection_user_id_FK_fkey" FOREIGN KEY ("user_id_FK") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_collection" ADD CONSTRAINT "user_collection_user_id_FK_fkey" FOREIGN KEY ("user_id_FK") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Topic" ADD CONSTRAINT "Topic_user_id_FK_fkey" FOREIGN KEY ("user_id_FK") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comments" ADD CONSTRAINT "Comments_user_id_FK_fkey" FOREIGN KEY ("user_id_FK") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
