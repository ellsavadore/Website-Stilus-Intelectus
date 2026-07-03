import { authRouter } from "./auth-router";
import { createRouter, publicQuery } from "./middleware";
import { consultationRouter } from "./routers/consultation";
import { servicesRouter } from "./routers/services";
import { articlesRouter, categoriesRouter, testimonialsRouter, faqRouter } from "./routers/content";
import { adminRouter } from "./routers/admin";

export const appRouter = createRouter({
  ping: publicQuery.query(() => ({ ok: true, ts: Date.now() })),
  auth: authRouter,
  consultation: consultationRouter,
  services: servicesRouter,
  articles: articlesRouter,
  categories: categoriesRouter,
  testimonials: testimonialsRouter,
  faq: faqRouter,
  admin: adminRouter,
});

export type AppRouter = typeof appRouter;
