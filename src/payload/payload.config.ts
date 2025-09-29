import "dotenv/config";
import { buildConfig } from "payload";
import { mongooseAdapter } from "@payloadcms/db-mongodb";
import { slateEditor } from "@payloadcms/richtext-slate";
import path from "path";

export default buildConfig({
    secret: process.env.PAYLOAD_SECRET!,
    serverURL: process.env.NEXT_PUBLIC_SERVER_URL || "",
    collections: [],
    // routes: {
    //     admin: "/sell"
    // },
    admin: {
        meta: {
            titleSuffix: "- Digital Marketplace",
            icons: "/favicon.ico",
        }
    },
    editor: slateEditor({}),
    db: mongooseAdapter({
        url: process.env.MONGO_URL!
    }),
    typescript: {
        outputFile: path.resolve(__dirname, "payload/payload-types.ts")
    }
})