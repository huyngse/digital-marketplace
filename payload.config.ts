import sharp from 'sharp'
import { slateEditor } from "@payloadcms/richtext-slate";
import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { buildConfig } from 'payload'

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
    sharp,
})