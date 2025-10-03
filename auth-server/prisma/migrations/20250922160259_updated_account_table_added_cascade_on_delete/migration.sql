-- DropForeignKey
ALTER TABLE "base"."accounts" DROP CONSTRAINT "accounts_user_id_fkey";

-- AddForeignKey
ALTER TABLE "base"."accounts" ADD CONSTRAINT "accounts_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "base"."users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
