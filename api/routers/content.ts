import { z } from "zod";
import { createRouter, publicQuery } from "../middleware";
import { getDb } from "../queries/connection";
import { articles, articleCategories, testimonials, faqs } from "@db/schema";
import { eq, desc, asc } from "drizzle-orm";

export const articlesRouter = createRouter({
  list: publicQuery.query(async () => {
    const db = getDb();
    return db
      .select()
      .from(articles)
      .where(eq(articles.status, "Published"))
      .orderBy(desc(articles.publishedAt));
  }),

  getBySlug: publicQuery
    .input(z.object({ slug: z.string() }))
    .query(async ({ input }) => {
      const db = getDb();
      const [result] = await db.select().from(articles).where(eq(articles.slug, input.slug));
      return result || null;
    }),

  create: publicQuery
    .input(
      z.object({
        title: z.string().min(1),
        slug: z.string().min(1),
        excerpt: z.string().optional(),
        content: z.string().optional(),
        categoryId: z.number().optional(),
        status: z.enum(["Draft", "Published", "Scheduled"]).default("Draft"),
      })
    )
    .mutation(async ({ input }) => {
      const db = getDb();
      await db.insert(articles).values(input);
      return { success: true };
    }),
});

export const categoriesRouter = createRouter({
  list: publicQuery.query(async () => {
    const db = getDb();
    return db.select().from(articleCategories).orderBy(asc(articleCategories.name));
  }),
});

export const testimonialsRouter = createRouter({
  list: publicQuery.query(async () => {
    const db = getDb();
    return db
      .select()
      .from(testimonials)
      .where(eq(testimonials.isPublished, true))
      .orderBy(asc(testimonials.displayOrder));
  }),

  create: publicQuery
    .input(
      z.object({
        quote: z.string().min(1),
        educationLevel: z.string().optional(),
        field: z.string().optional(),
        serviceType: z.string().optional(),
        isAnonymous: z.boolean().default(true),
        isPublished: z.boolean().default(false),
      })
    )
    .mutation(async ({ input }) => {
      const db = getDb();
      await db.insert(testimonials).values(input);
      return { success: true };
    }),
});

export const faqRouter = createRouter({
  list: publicQuery.query(async () => {
    const db = getDb();
    return db
      .select()
      .from(faqs)
      .where(eq(faqs.isActive, true))
      .orderBy(asc(faqs.displayOrder));
  }),

  create: publicQuery
    .input(
      z.object({
        question: z.string().min(1),
        answer: z.string().min(1),
        category: z.string().optional(),
      })
    )
    .mutation(async ({ input }) => {
      const db = getDb();
      await db.insert(faqs).values(input);
      return { success: true };
    }),
});
