-- AlterTable
ALTER TABLE "ProductStock" ALTER COLUMN "updatedAt" SET DATA TYPE TIMESTAMP(3);

-- AlterTable
ALTER TABLE "Session" ADD COLUMN     "expires" INTEGER;

-- AlterTable
CREATE SEQUENCE settings_id_seq;
ALTER TABLE "Settings" ALTER COLUMN "id" SET DEFAULT nextval('settings_id_seq');
ALTER SEQUENCE settings_id_seq OWNED BY "Settings"."id";
