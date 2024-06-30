/*
  Warnings:

  - The primary key for the `Genres` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Genres` table. All the data in the column will be lost.
  - You are about to drop the `Cast` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE "Genres" DROP CONSTRAINT "Genres_pkey",
DROP COLUMN "id",
ADD COLUMN     "genres_id" SERIAL NOT NULL,
ADD CONSTRAINT "Genres_pkey" PRIMARY KEY ("genres_id");

-- AlterTable
ALTER TABLE "Movies" ADD COLUMN     "cast_id" SERIAL NOT NULL,
ADD COLUMN     "genres_id" SERIAL NOT NULL;

-- DropTable
DROP TABLE "Cast";

-- CreateTable
CREATE TABLE "Casts" (
    "cast_id" SERIAL NOT NULL,
    "name" TEXT,

    CONSTRAINT "Casts_pkey" PRIMARY KEY ("cast_id")
);

-- AddForeignKey
ALTER TABLE "Movies" ADD CONSTRAINT "Movies_cast_id_fkey" FOREIGN KEY ("cast_id") REFERENCES "Casts"("cast_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Movies" ADD CONSTRAINT "Movies_genres_id_fkey" FOREIGN KEY ("genres_id") REFERENCES "Genres"("genres_id") ON DELETE RESTRICT ON UPDATE CASCADE;
