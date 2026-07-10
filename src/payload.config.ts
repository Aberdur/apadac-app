import { sqliteAdapter } from "@payloadcms/db-sqlite";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import path from "path";
import { buildConfig } from "payload";
import sharp from "sharp";
import { fileURLToPath } from "url";

import { es } from '@payloadcms/translations/languages/es';
import { en } from '@payloadcms/translations/languages/en';

import { AnimalDossiers } from "./collections/AnimalDossiers";
import { AnimalFiles } from "./collections/AnimalFiles";
import { Animals } from "./collections/Animals";
import { Announcements } from "./collections/Announcements";
import { Media } from "./collections/Media";
import { Users } from "./collections/Users";
import { HelpSettings } from "./globals/HelpSettings";
import { getPayloadSecret } from "./lib/security";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);
const uploadFileSizeLimit = 50 * 1024 * 1024;

export default buildConfig({
  i18n: {
    supportedLanguages: { es, en },
    fallbackLanguage: 'es',
  },
  admin: {
    components: {
      afterNavLinks: [
        {
          exportName: "BackToSiteLink",
          path: "@/components/admin/back-to-site-link",
        },
      ],
    },
    importMap: {
      baseDir: path.resolve(dirname),
    },
    user: Users.slug,
  },
  collections: [Users, Media, AnimalFiles, Animals, AnimalDossiers, Announcements],
  globals: [HelpSettings],
  db: sqliteAdapter({
    client: {
      url: process.env.DATABASE_URL || "file:./data/apadac.db",
    },
    push: process.env.PAYLOAD_DB_PUSH === "true",
  }),
  editor: lexicalEditor(),
  serverURL: process.env.NEXT_PUBLIC_SERVER_URL || process.env.PAYLOAD_PUBLIC_SERVER_URL,
  secret: getPayloadSecret(),
  sharp,
  upload: {
    limits: {
      fileSize: uploadFileSizeLimit,
    },
    tempFileDir: "/tmp",
    useTempFiles: true,
  },
  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },
});