import type { ExpressContext } from '../server.ts';
import { initTRPC } from '@trpc/server';
import { cache } from 'react';

export const createTRPCContext = cache(async () => {
    /**
     * @see: https://trpc.io/docs/server/context
     */
    return { userId: 'user_123' };
});

export type Context = Awaited<ReturnType<typeof createTRPCContext>>;

const t = initTRPC.context<ExpressContext>().create({
    /**
     * @see https://trpc.io/docs/server/data-transformers
     */
    // transformer: superjson,
});

t.procedure.use((opts) => {
    opts.ctx;
    return opts.next();
})

// Base router and procedure helpers
export const createTRPCRouter = t.router;
export const createCallerFactory = t.createCallerFactory;
export const baseProcedure = t.procedure;