-- CreateTable
CREATE TABLE "User" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" TEXT NOT NULL DEFAULT 'NO_NAME',
    "email" TEXT NOT NULL,
    "emailVerified" TIMESTAMP(6),
    "image" TEXT,
    "password" TEXT,
    "role" TEXT NOT NULL DEFAULT 'user',
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Account" (
    "userId" UUID NOT NULL,
    "type" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "providerAccountId" TEXT NOT NULL,
    "refresh_token" TEXT,
    "access_token" TEXT,
    "expires_at" INTEGER,
    "token_type" TEXT,
    "scope" TEXT,
    "id_token" TEXT,
    "session_state" TEXT,
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("provider","providerAccountId")
);

-- CreateTable
CREATE TABLE "Session" (
    "sessionToken" TEXT NOT NULL,
    "userId" UUID NOT NULL,
    "expires" TIMESTAMP(6) NOT NULL,
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("sessionToken")
);

-- CreateTable
CREATE TABLE "VerificationToken" (
    "identifier" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "VerificationToken_pkey" PRIMARY KEY ("identifier","token")
);

-- CreateTable
CREATE TABLE "Genre" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" TEXT NOT NULL,
    "comicId" UUID,

    CONSTRAINT "Genre_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Category" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" TEXT NOT NULL,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Author" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" TEXT NOT NULL,

    CONSTRAINT "Author_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Artist" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" TEXT NOT NULL,

    CONSTRAINT "Artist_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ComicImage" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "link" TEXT NOT NULL,
    "image" TEXT,
    "status" TEXT,
    "checksum" TEXT,
    "comicId" UUID,
    "chapterId" UUID,

    CONSTRAINT "ComicImage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Comic" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "rating" DECIMAL(10,1) NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "link" TEXT NOT NULL,
    "serialization" TEXT,
    "numchapters" INTEGER NOT NULL DEFAULT 0,
    "numimages" INTEGER NOT NULL DEFAULT 0,
    "has_chapters" BOOLEAN NOT NULL DEFAULT false,
    "has_images" BOOLEAN NOT NULL DEFAULT false,
    "categoryId" UUID NOT NULL,
    "authorId" UUID NOT NULL,
    "artistId" UUID NOT NULL,
    "userId" UUID,

    CONSTRAINT "Comic_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ChapterImage" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "link" TEXT NOT NULL,
    "image" TEXT,
    "status" TEXT,
    "checksum" TEXT,
    "chapterId" UUID,

    CONSTRAINT "ChapterImage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Chapter" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "title" TEXT,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "link" TEXT NOT NULL,
    "numimages" INTEGER NOT NULL DEFAULT 0,
    "has_images" BOOLEAN NOT NULL DEFAULT false,
    "comicId" UUID NOT NULL,

    CONSTRAINT "Chapter_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_email_idx" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "zgenre_name_idx" ON "Genre"("name");

-- CreateIndex
CREATE UNIQUE INDEX "zcategory_name_idx" ON "Category"("name");

-- CreateIndex
CREATE UNIQUE INDEX "zauthor_name_idx" ON "Author"("name");

-- CreateIndex
CREATE UNIQUE INDEX "zartist_name_idx" ON "Artist"("name");

-- CreateIndex
CREATE UNIQUE INDEX "zcomic_title_idx" ON "Comic"("title");

-- CreateIndex
CREATE UNIQUE INDEX "zcomic_slug_idx" ON "Comic"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "zchapter_slug_idx" ON "Chapter"("slug");

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Genre" ADD CONSTRAINT "Genre_comicId_fkey" FOREIGN KEY ("comicId") REFERENCES "Comic"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ComicImage" ADD CONSTRAINT "ComicImage_comicId_fkey" FOREIGN KEY ("comicId") REFERENCES "Comic"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ComicImage" ADD CONSTRAINT "ComicImage_chapterId_fkey" FOREIGN KEY ("chapterId") REFERENCES "Chapter"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comic" ADD CONSTRAINT "Comic_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comic" ADD CONSTRAINT "Comic_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "Author"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comic" ADD CONSTRAINT "Comic_artistId_fkey" FOREIGN KEY ("artistId") REFERENCES "Artist"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comic" ADD CONSTRAINT "Comic_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChapterImage" ADD CONSTRAINT "ChapterImage_chapterId_fkey" FOREIGN KEY ("chapterId") REFERENCES "Chapter"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Chapter" ADD CONSTRAINT "Chapter_comicId_fkey" FOREIGN KEY ("comicId") REFERENCES "Comic"("id") ON DELETE CASCADE ON UPDATE CASCADE;
