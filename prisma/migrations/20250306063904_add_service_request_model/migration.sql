/*
  Warnings:

  - You are about to alter the column `features` on the `Budget` table. The data in that column could be lost. The data in that column will be cast from `String` to `Json`.
  - Made the column `additionalInfo` on table `Budget` required. This step will fail if there are existing NULL values in that column.
  - Made the column `budget` on table `Budget` required. This step will fail if there are existing NULL values in that column.
  - Made the column `deadline` on table `Budget` required. This step will fail if there are existing NULL values in that column.
  - Made the column `designPreferences` on table `Budget` required. This step will fail if there are existing NULL values in that column.
  - Made the column `features` on table `Budget` required. This step will fail if there are existing NULL values in that column.
  - Made the column `howFound` on table `Budget` required. This step will fail if there are existing NULL values in that column.
  - Made the column `references` on table `Budget` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateTable
CREATE TABLE "ServiceRequest" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT,
    "service" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Budget" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "company" TEXT,
    "projectType" TEXT NOT NULL,
    "projectDescription" TEXT NOT NULL,
    "deadline" TEXT NOT NULL,
    "budget" TEXT NOT NULL,
    "features" JSONB NOT NULL,
    "designPreferences" TEXT NOT NULL,
    "references" TEXT NOT NULL,
    "howFound" TEXT NOT NULL,
    "additionalInfo" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Budget" ("additionalInfo", "budget", "company", "createdAt", "deadline", "designPreferences", "email", "features", "howFound", "id", "name", "phone", "projectDescription", "projectType", "references", "status", "updatedAt") SELECT "additionalInfo", "budget", "company", "createdAt", "deadline", "designPreferences", "email", "features", "howFound", "id", "name", "phone", "projectDescription", "projectType", "references", "status", "updatedAt" FROM "Budget";
DROP TABLE "Budget";
ALTER TABLE "new_Budget" RENAME TO "Budget";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
