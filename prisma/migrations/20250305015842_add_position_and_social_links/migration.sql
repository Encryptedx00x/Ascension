/*
  Warnings:

  - The primary key for the `Admin` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `email` on the `Admin` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Admin` table. All the data in the column will be lost.
  - You are about to drop the column `github` on the `TeamMember` table. All the data in the column will be lost.
  - You are about to drop the column `linkedin` on the `TeamMember` table. All the data in the column will be lost.
  - Added the required column `username` to the `Admin` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Contact" ADD COLUMN "subject" TEXT;

-- TeamMember alterations
ALTER TABLE "TeamMember" ADD COLUMN "position" TEXT;
ALTER TABLE "TeamMember" ADD COLUMN "socialLinks" TEXT;

-- Remover colunas que não são mais necessárias
ALTER TABLE "TeamMember" DROP COLUMN "github";
ALTER TABLE "TeamMember" DROP COLUMN "linkedin";

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Admin" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Admin" ("createdAt", "id", "password", "updatedAt") SELECT "createdAt", "id", "password", "updatedAt" FROM "Admin";
DROP TABLE "Admin";
ALTER TABLE "new_Admin" RENAME TO "Admin";
CREATE UNIQUE INDEX "Admin_username_key" ON "Admin"("username");
CREATE TABLE "new_TeamMember" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT,
    "role" TEXT,
    "position" TEXT,
    "bio" TEXT,
    "imageUrl" TEXT,
    "socialLinks" TEXT,
    "password" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_TeamMember" ("bio", "createdAt", "email", "id", "imageUrl", "name", "password", "phone", "role", "updatedAt") SELECT "bio", "createdAt", "email", "id", "imageUrl", "name", "password", "phone", "role", "updatedAt" FROM "TeamMember";
DROP TABLE "TeamMember";
ALTER TABLE "new_TeamMember" RENAME TO "TeamMember";
CREATE UNIQUE INDEX "TeamMember_email_key" ON "TeamMember"("email");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
