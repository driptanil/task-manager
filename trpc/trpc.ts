import getCurrentUser from "@/auth/getCurrentUser";
import { TRPCError, initTRPC, BuildProcedure } from "@trpc/server";
/**
 * Initialization of tRPC backend
 * Should be done only once per backend!
 */
const t = initTRPC.create();
/**
 * Export reusable router and procedure helpers
 * that can be used throughout the router
 */

const middleware = t.middleware(async (opts) => {
  // const { getUser } = getKindeServerSession();

  const user = await getCurrentUser();

  if (!user) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }

  return opts.next({
    // ctx stands for context
    ctx: {
      userId: user.id,
      user,
    },
  });
  //   call the next functions i.e. the api routes after the middleware
});

const isAuth = middleware;

export const router = t.router;
export const publicProcedure = t.procedure;
export const privateProcedure = t.procedure.use(isAuth);

/**
 * `public Procedure` is a public API endpoint
 */
