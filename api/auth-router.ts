import * as cookie from "cookie";
import { Session } from "@contracts/constants";
import { getSessionCookieOptions } from "./lib/cookies";
import { createRouter, authedQuery, publicQuery } from "./middleware";
import { signSessionToken } from "./kimi/session";
import { upsertUser } from "./queries/users";

export const authRouter = createRouter({
  me: authedQuery.query((opts) => opts.ctx.user),
  logout: authedQuery.mutation(async ({ ctx }) => {
    const opts = getSessionCookieOptions(ctx.req.headers);
    ctx.resHeaders.append(
      "set-cookie",
      cookie.serialize(Session.cookieName, "", {
        httpOnly: opts.httpOnly,
        path: opts.path,
        sameSite: opts.sameSite?.toLowerCase() as "lax" | "none",
        secure: opts.secure,
        maxAge: 0,
      }),
    );
    return { success: true };
  }),
  
  // Demo login for testing
  demoLogin: publicQuery.mutation(async ({ ctx }) => {
    const demoUser = {
      unionId: "demo_user_" + Date.now(),
      name: "Admin Demo",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=demo",
      role: "admin" as const,
    };

    // Create demo user in database
    await upsertUser(demoUser);

    // Sign session token
    const token = await signSessionToken({
      unionId: demoUser.unionId,
      clientId: "demo-client",
    });

    // Set cookie
    const opts = getSessionCookieOptions(ctx.req.headers);
    ctx.resHeaders.append(
      "set-cookie",
      cookie.serialize(Session.cookieName, token, {
        httpOnly: opts.httpOnly,
        path: opts.path,
        sameSite: opts.sameSite?.toLowerCase() as "lax" | "none",
        secure: opts.secure,
        maxAge: Session.maxAgeMs / 1000,
      }),
    );

    return { 
      success: true,
      user: demoUser,
    };
  }),
});
