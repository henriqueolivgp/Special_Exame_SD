/*
  Warnings:

  - The primary key for the `Casts` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `cast_id` on the `Casts` table. All the data in the column will be lost.
  - The primary key for the `Genres` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `genres_id` on the `Genres` table. All the data in the column will be lost.
  - The required column `id` was added to the `Casts` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - The required column `id` was added to the `Genres` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- DropForeignKey
ALTER TABLE "Movies" DROP CONSTRAINT "Movies_cast_id_fkey";

-- DropForeignKey
ALTER TABLE "Movies" DROP CONSTRAINT "Movies_genres_id_fkey";

-- AlterTable
ALTER TABLE "Casts" DROP CONSTRAINT "Casts_pkey",
DROP COLUMN "cast_id",
ADD COLUMN     "id" TEXT NOT NULL,
ADD CONSTRAINT "Casts_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Genres" DROP CONSTRAINT "Genres_pkey",
DROP COLUMN "genres_id",
ADD COLUMN     "id" TEXT NOT NULL,
ADD CONSTRAINT "Genres_pkey" PRIMARY KEY ("id");

-- AddForeignKey
ALTER TABLE "Movies" ADD CONSTRAINT "Movies_cast_id_fkey" FOREIGN KEY ("cast_id") REFERENCES "Casts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Movies" ADD CONSTRAINT "Movies_genres_id_fkey" FOREIGN KEY ("genres_id") REFERENCES "Genres"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
