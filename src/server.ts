import 'dotenv/config';
import express from "express";
import { nextApp, nextHandler } from "./lib/nextUtils.ts";
import * as trpcExpress from '@trpc/server/adapters/express';
import { appRouter } from "./trpc/routers/_app.ts";

const createContext = ({ req, res }: trpcExpress.CreateExpressContextOptions) => ({
    req, res
})

const app = express();

const PORT = Number(process.env.PORT) || 3000;

const start = async () => {
    app.use("/api/trpc", trpcExpress.createExpressMiddleware({
        router: appRouter,
        createContext
    }))
    app.use((req, res) => nextHandler(req, res));
    nextApp.prepare().then(() => {
        app.listen(PORT, () => {
            console.log(`Next.js App URL: ${process.env.NEXT_PUBLIC_SERVER_URL}`)
        })
    })
}

start();