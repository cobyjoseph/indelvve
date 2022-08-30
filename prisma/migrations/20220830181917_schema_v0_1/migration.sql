-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "date_created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Post" (
    "id" SERIAL NOT NULL,
    "date_created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "content" TEXT NOT NULL,
    "upvoted_number" INTEGER NOT NULL,
    "user_id_FK" INTEGER NOT NULL,
    "collection_id_FK" INTEGER NOT NULL,

    CONSTRAINT "Post_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_post" (
    "user_id_FK" INTEGER NOT NULL,
    "post_id_FK" INTEGER NOT NULL,

    CONSTRAINT "user_post_pkey" PRIMARY KEY ("user_id_FK","post_id_FK")
);

-- CreateTable
CREATE TABLE "Collection" (
    "id" SERIAL NOT NULL,
    "date_created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "content" TEXT NOT NULL,
    "upvoted_number" INTEGER NOT NULL,
    "user_id_FK" INTEGER NOT NULL,

    CONSTRAINT "Collection_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_collection" (
    "user_id_FK" INTEGER NOT NULL,
    "collection_id_FK" INTEGER NOT NULL,

    CONSTRAINT "user_collection_pkey" PRIMARY KEY ("user_id_FK","collection_id_FK")
);

-- CreateTable
CREATE TABLE "Topic" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "user_id_FK" INTEGER NOT NULL,

    CONSTRAINT "Topic_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "collection_topic" (
    "collection_id_FK" INTEGER NOT NULL,
    "topic_id_FK" INTEGER NOT NULL,

    CONSTRAINT "collection_topic_pkey" PRIMARY KEY ("collection_id_FK","topic_id_FK")
);

-- CreateTable
CREATE TABLE "Comments" (
    "id" SERIAL NOT NULL,
    "date_created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "content" TEXT NOT NULL,
    "user_id_FK" INTEGER NOT NULL,
    "post_id_FK" INTEGER NOT NULL,

    CONSTRAINT "Comments_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_user_id_FK_fkey" FOREIGN KEY ("user_id_FK") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_collection_id_FK_fkey" FOREIGN KEY ("collection_id_FK") REFERENCES "Collection"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_post" ADD CONSTRAINT "user_post_user_id_FK_fkey" FOREIGN KEY ("user_id_FK") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_post" ADD CONSTRAINT "user_post_post_id_FK_fkey" FOREIGN KEY ("post_id_FK") REFERENCES "Post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Collection" ADD CONSTRAINT "Collection_user_id_FK_fkey" FOREIGN KEY ("user_id_FK") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_collection" ADD CONSTRAINT "user_collection_user_id_FK_fkey" FOREIGN KEY ("user_id_FK") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_collection" ADD CONSTRAINT "user_collection_collection_id_FK_fkey" FOREIGN KEY ("collection_id_FK") REFERENCES "Collection"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Topic" ADD CONSTRAINT "Topic_user_id_FK_fkey" FOREIGN KEY ("user_id_FK") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "collection_topic" ADD CONSTRAINT "collection_topic_collection_id_FK_fkey" FOREIGN KEY ("collection_id_FK") REFERENCES "Collection"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "collection_topic" ADD CONSTRAINT "collection_topic_topic_id_FK_fkey" FOREIGN KEY ("topic_id_FK") REFERENCES "Topic"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comments" ADD CONSTRAINT "Comments_user_id_FK_fkey" FOREIGN KEY ("user_id_FK") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comments" ADD CONSTRAINT "Comments_post_id_FK_fkey" FOREIGN KEY ("post_id_FK") REFERENCES "Post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
