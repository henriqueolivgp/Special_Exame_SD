/*
  Warnings:

  - The primary key for the `Casts` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Genres` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Movies` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "Movies" DROP CONSTRAINT "Movies_cast_id_fkey";

-- DropForeignKey
ALTER TABLE "Movies" DROP CONSTRAINT "Movies_genres_id_fkey";

-- AlterTable
ALTER TABLE "Casts" DROP CONSTRAINT "Casts_pkey",
ALTER COLUMN "cast_id" DROP DEFAULT,
ALTER COLUMN "cast_id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Casts_pkey" PRIMARY KEY ("cast_id");
DROP SEQUENCE "Casts_cast_id_seq";

-- AlterTable
ALTER TABLE "Genres" DROP CONSTRAINT "Genres_pkey",
ALTER COLUMN "genres_id" DROP DEFAULT,
ALTER COLUMN "genres_id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Genres_pkey" PRIMARY KEY ("genres_id");
DROP SEQUENCE "Genres_genres_id_seq";

-- AlterTable
ALTER TABLE "Movies" DROP CONSTRAINT "Movies_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "cast_id" DROP DEFAULT,
ALTER COLUMN "cast_id" SET DATA TYPE TEXT,
ALTER COLUMN "genres_id" DROP DEFAULT,
ALTER COLUMN "genres_id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Movies_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Movies_id_seq";
DROP SEQUENCE "Movies_cast_id_seq";
DROP SEQUENCE "Movies_genres_id_seq";

-- AddForeignKey
ALTER TABLE "Movies" ADD CONSTRAINT "Movies_cast_id_fkey" FOREIGN KEY ("cast_id") REFERENCES "Casts"("cast_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Movies" ADD CONSTRAINT "Movies_genres_id_fkey" FOREIGN KEY ("genres_id") REFERENCES "Genres"("genres_id") ON DELETE RESTRICT ON UPDATE CASCADE;
