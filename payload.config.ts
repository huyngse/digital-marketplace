import sharp from 'sharp'
import { slateEditor } from "@payloadcms/richtext-slate";
import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { buildConfig } from 'payload'
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default buildConfig({
    admin: {
        meta: {
            titleSuffix: "- Digital Marketplace",
            icons: "/favicon.ico",
        }
    },
    editor: slateEditor({}),
    collections: [],
    secret: process.env.PAYLOAD_SECRET || '',
    db: mongooseAdapter({
        url: process.env.MONGO_URL || '',
    }),
    typescript: {
        outputFile: path.resolve(__dirname, "src/types/payload-types.ts")
    },
    sharp,
})