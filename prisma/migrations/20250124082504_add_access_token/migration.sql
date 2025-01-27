-- DropIndex
DROP INDEX "Session_accessToken_key";

-- DropIndex
DROP INDEX "Session_userId_key";

-- AlterTable
ALTER TABLE "Session" ALTER COLUMN "accessToken" DROP NOT NULL;

-- CreateIndex
CREATE INDEX "Session_userId_idx" ON "Session"("userId");
