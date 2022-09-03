-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_collection_id_FK_fkey";

-- AlterTable
ALTER TABLE "Post" ALTER COLUMN "collection_id_FK" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_collection_id_FK_fkey" FOREIGN KEY ("collection_id_FK") REFERENCES "Collection"("id") ON DELETE SET NULL ON UPDATE CASCADE;
