-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_user_id_FK_fkey";

-- AlterTable
ALTER TABLE "Post" ALTER COLUMN "user_id_FK" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_user_id_FK_fkey" FOREIGN KEY ("user_id_FK") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
