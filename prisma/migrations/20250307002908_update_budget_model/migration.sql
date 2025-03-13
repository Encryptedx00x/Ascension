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
    "status" TEXT NOT NULL DEFAULT 'pendente',
    "selectedModel" TEXT,
    "modelPrice" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Budget" ("additionalInfo", "budget", "company", "createdAt", "deadline", "designPreferences", "email", "features", "howFound", "id", "name", "phone", "projectDescription", "projectType", "references", "status", "updatedAt") SELECT "additionalInfo", "budget", "company", "createdAt", "deadline", "designPreferences", "email", "features", "howFound", "id", "name", "phone", "projectDescription", "projectType", "references", "status", "updatedAt" FROM "Budget";
DROP TABLE "Budget";
ALTER TABLE "new_Budget" RENAME TO "Budget";
CREATE TABLE "new_Contact" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT,
    "subject" TEXT,
    "message" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'pendente',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Contact" ("createdAt", "email", "id", "message", "name", "phone", "status", "subject", "updatedAt") SELECT "createdAt", "email", "id", "message", "name", "phone", "status", "subject", "updatedAt" FROM "Contact";
DROP TABLE "Contact";
ALTER TABLE "new_Contact" RENAME TO "Contact";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
