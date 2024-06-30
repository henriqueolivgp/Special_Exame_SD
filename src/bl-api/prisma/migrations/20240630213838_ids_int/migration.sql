/*
  Warnings:

  - The primary key for the `Casts` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `Casts` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `Genres` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `Genres` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `Movies` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `Movies` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `cast_id` column on the `Movies` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `genres_id` column on the `Movies` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- DropForeignKey
ALTER TABLE "Movies" DROP CONSTRAINT "Movies_cast_id_fkey";

-- DropForeignKey
ALTER TABLE "Movies" DROP CONSTRAINT "Movies_genres_id_fkey";

-- AlterTable
ALTER TABLE "Casts" DROP CONSTRAINT "Casts_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Casts_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Genres" DROP CONSTRAINT "Genres_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Genres_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Movies" DROP CONSTRAINT "Movies_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
DROP COLUMN "cast_id",
ADD COLUMN     "cast_id" SERIAL NOT NULL,
DROP COLUMN "genres_id",
ADD COLUMN     "genres_id" SERIAL NOT NULL,
ADD CONSTRAINT "Movies_pkey" PRIMARY KEY ("id");

-- AddForeignKey
ALTER TABLE "Movies" ADD CONSTRAINT "Movies_cast_id_fkey" FOREIGN KEY ("cast_id") REFERENCES "Casts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Movies" ADD CONSTRAINT "Movies_genres_id_fkey" FOREIGN KEY ("genres_id") REFERENCES "Genres"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
