/*
  Warnings:

  - The primary key for the `Casts` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Casts` table. All the data in the column will be lost.
  - The primary key for the `Genres` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Genres` table. All the data in the column will be lost.
  - The primary key for the `Movies` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Movies` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Movies" DROP CONSTRAINT "Movies_cast_id_fkey";

-- DropForeignKey
ALTER TABLE "Movies" DROP CONSTRAINT "Movies_genres_id_fkey";

-- AlterTable
ALTER TABLE "Casts" DROP CONSTRAINT "Casts_pkey",
DROP COLUMN "id",
ADD COLUMN     "cast_id" SERIAL NOT NULL,
ADD CONSTRAINT "Casts_pkey" PRIMARY KEY ("cast_id");

-- AlterTable
ALTER TABLE "Genres" DROP CONSTRAINT "Genres_pkey",
DROP COLUMN "id",
ADD COLUMN     "genres_id" SERIAL NOT NULL,
ADD CONSTRAINT "Genres_pkey" PRIMARY KEY ("genres_id");

-- AlterTable
ALTER TABLE "Movies" DROP CONSTRAINT "Movies_pkey",
DROP COLUMN "id",
ADD COLUMN     "movie_id" SERIAL NOT NULL,
ADD CONSTRAINT "Movies_pkey" PRIMARY KEY ("movie_id");

-- AddForeignKey
ALTER TABLE "Movies" ADD CONSTRAINT "Movies_cast_id_fkey" FOREIGN KEY ("cast_id") REFERENCES "Casts"("cast_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Movies" ADD CONSTRAINT "Movies_genres_id_fkey" FOREIGN KEY ("genres_id") REFERENCES "Genres"("genres_id") ON DELETE RESTRICT ON UPDATE CASCADE;
