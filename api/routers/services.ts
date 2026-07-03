import { z } from "zod";
import { createRouter, publicQuery } from "../middleware";
import { getDb } from "../queries/connection";
import { services } from "@db/schema";
import { eq, asc } from "drizzle-orm";

export const servicesRouter = createRouter({
  list: publicQuery.query(async () => {
    const db = getDb();
    return db.select().from(services).where(eq(services.isActive, true)).orderBy(asc(services.displayOrder));
  }),

  getBySlug: publicQuery
    .input(z.object({ slug: z.string() }))
    .query(async ({ input }) => {
      const db = getDb();
      const [result] = await db.select().from(services).where(eq(services.slug, input.slug));
      return result || null;
    }),

  create: publicQuery
    .input(
      z.object({
        title: z.string().min(1),
        slug: z.string().min(1),
        shortDescription: z.string().optional(),
        fullDescription: z.string().optional(),
        icon: z.string().optional(),
        displayOrder: z.number().default(0),
      })
    )
    .mutation(async ({ input }) => {
      const db = getDb();
      await db.insert(services).values(input);
      return { success: true };
    }),
});
