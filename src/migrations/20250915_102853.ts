import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "sub_links" ALTER COLUMN "title" SET DEFAULT 'google';
  ALTER TABLE "nav_links" ALTER COLUMN "title" SET DEFAULT 'home';
  ALTER TABLE "btns" ALTER COLUMN "title" SET DEFAULT 'youtube';
  ALTER TABLE "btns" ALTER COLUMN "size" SET DEFAULT 'lg';
  ALTER TABLE "pages_blocks_navbar1" ALTER COLUMN "logo_use_media" SET DEFAULT true;
  ALTER TABLE "_sub_links_v" ALTER COLUMN "title" SET DEFAULT 'google';
  ALTER TABLE "_nav_links_v" ALTER COLUMN "title" SET DEFAULT 'home';
  ALTER TABLE "_btns_v" ALTER COLUMN "title" SET DEFAULT 'youtube';
  ALTER TABLE "_btns_v" ALTER COLUMN "size" SET DEFAULT 'lg';
  ALTER TABLE "_pages_v_blocks_navbar1" ALTER COLUMN "logo_use_media" SET DEFAULT true;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "sub_links" ALTER COLUMN "title" DROP DEFAULT;
  ALTER TABLE "nav_links" ALTER COLUMN "title" DROP DEFAULT;
  ALTER TABLE "btns" ALTER COLUMN "title" DROP DEFAULT;
  ALTER TABLE "btns" ALTER COLUMN "size" SET DEFAULT 'sm';
  ALTER TABLE "pages_blocks_navbar1" ALTER COLUMN "logo_use_media" SET DEFAULT false;
  ALTER TABLE "_sub_links_v" ALTER COLUMN "title" DROP DEFAULT;
  ALTER TABLE "_nav_links_v" ALTER COLUMN "title" DROP DEFAULT;
  ALTER TABLE "_btns_v" ALTER COLUMN "title" DROP DEFAULT;
  ALTER TABLE "_btns_v" ALTER COLUMN "size" SET DEFAULT 'sm';
  ALTER TABLE "_pages_v_blocks_navbar1" ALTER COLUMN "logo_use_media" SET DEFAULT false;`)
}
