import {
  mysqlTable,
  mysqlEnum,
  serial,
  varchar,
  text,
  timestamp,
  bigint,
  int,
  boolean,
  json,
} from "drizzle-orm/mysql-core";

// ─── Users & Auth ───────────────────────────────────────────────
export const users = mysqlTable("users", {
  id: serial("id").primaryKey(),
  unionId: varchar("unionId", { length: 255 }).notNull().unique(),
  name: varchar("name", { length: 255 }),
  email: varchar("email", { length: 320 }),
  avatar: text("avatar"),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull().$onUpdate(() => new Date()),
  lastSignInAt: timestamp("lastSignInAt").defaultNow().notNull(),
});

export const roles = mysqlTable("roles", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 50 }).notNull().unique(),
  description: text("description"),
  permissions: json("permissions").$type<string[]>(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

// ─── Services ────────────────────────────────────────────────────
export const services = mysqlTable("services", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  slug: varchar("slug", { length: 255 }).notNull().unique(),
  shortDescription: text("shortDescription"),
  fullDescription: text("fullDescription"),
  icon: varchar("icon", { length: 50 }),
  isActive: boolean("isActive").default(true),
  displayOrder: int("displayOrder").default(0),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull().$onUpdate(() => new Date()),
});

// ─── Consultation Requests ───────────────────────────────────────
export const consultationRequests = mysqlTable("consultation_requests", {
  id: serial("id").primaryKey(),
  ticketNumber: varchar("ticketNumber", { length: 20 }).notNull().unique(),
  userId: bigint("userId", { mode: "number", unsigned: true }),
  fullName: varchar("fullName", { length: 255 }).notNull(),
  email: varchar("email", { length: 320 }).notNull(),
  phone: varchar("phone", { length: 20 }),
  educationLevel: mysqlEnum("educationLevel", ["S1", "S2", "S3", "Lainnya"]).notNull(),
  fieldOfStudy: varchar("fieldOfStudy", { length: 255 }),
  institution: varchar("institution", { length: 255 }),
  serviceId: bigint("serviceId", { mode: "number", unsigned: true }),
  researchStage: mysqlEnum("researchStage", [
    "Perumusan Masalah",
    "Tinjauan Literatur",
    "Pengumpulan Data",
    "Analisis Data",
    "Penyusunan Naskah",
    "Revisi",
    "Publikasi",
  ]),
  researchTopic: text("researchTopic"),
  researchMethod: varchar("researchMethod", { length: 100 }),
  software: varchar("software", { length: 100 }),
  deadline: varchar("deadline", { length: 50 }),
  problemDescription: text("problemDescription"),
  preferredContact: mysqlEnum("preferredContact", ["WhatsApp", "Email", "Video Call"]).default("WhatsApp"),
  status: mysqlEnum("status", [
    "Baru",
    "Sedang Ditinjau",
    "Menunggu Dokumen",
    "Dijadwalkan",
    "Dalam Pendampingan",
    "Menunggu Tanggapan Klien",
    "Selesai",
    "Dibatalkan",
    "Diarsipkan",
  ]).default("Baru").notNull(),
  assignedConsultantId: bigint("assignedConsultantId", { mode: "number", unsigned: true }),
  privacyAgreed: boolean("privacyAgreed").default(false),
  ethicsAgreed: boolean("ethicsAgreed").default(false),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull().$onUpdate(() => new Date()),
});

// ─── Consultation Notes ──────────────────────────────────────────
export const consultationNotes = mysqlTable("consultation_notes", {
  id: serial("id").primaryKey(),
  consultationId: bigint("consultationId", { mode: "number", unsigned: true }).notNull(),
  authorId: bigint("authorId", { mode: "number", unsigned: true }),
  content: text("content").notNull(),
  visibility: mysqlEnum("visibility", ["Internal", "Klien"]).default("Internal").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

// ─── Consultation Status History ─────────────────────────────────
export const consultationStatusHistory = mysqlTable("consultation_status_history", {
  id: serial("id").primaryKey(),
  consultationId: bigint("consultationId", { mode: "number", unsigned: true }).notNull(),
  oldStatus: varchar("oldStatus", { length: 50 }),
  newStatus: varchar("newStatus", { length: 50 }).notNull(),
  changedBy: bigint("changedBy", { mode: "number", unsigned: true }),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

// ─── Appointments ────────────────────────────────────────────────
export const appointments = mysqlTable("appointments", {
  id: serial("id").primaryKey(),
  consultationId: bigint("consultationId", { mode: "number", unsigned: true }).notNull(),
  consultantId: bigint("consultantId", { mode: "number", unsigned: true }),
  startTime: timestamp("startTime"),
  endTime: timestamp("endTime"),
  meetingUrl: text("meetingUrl"),
  location: varchar("location", { length: 255 }),
  status: mysqlEnum("status", ["Dijadwalkan", "Selesai", "Dibatalkan", "Dijadwalkan Ulang"]).default("Dijadwalkan"),
  notes: text("notes"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

// ─── Documents ───────────────────────────────────────────────────
export const documents = mysqlTable("documents", {
  id: serial("id").primaryKey(),
  consultationId: bigint("consultationId", { mode: "number", unsigned: true }),
  uploadedBy: bigint("uploadedBy", { mode: "number", unsigned: true }),
  originalName: varchar("originalName", { length: 255 }).notNull(),
  storedName: varchar("storedName", { length: 255 }).notNull(),
  mimeType: varchar("mimeType", { length: 100 }),
  size: bigint("size", { mode: "number" }),
  storagePath: text("storagePath"),
  visibility: mysqlEnum("visibility", ["Internal", "Klien"]).default("Internal"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

// ─── Articles ────────────────────────────────────────────────────
export const articles = mysqlTable("articles", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  slug: varchar("slug", { length: 255 }).notNull().unique(),
  excerpt: text("excerpt"),
  content: text("content"),
  categoryId: bigint("categoryId", { mode: "number", unsigned: true }),
  authorId: bigint("authorId", { mode: "number", unsigned: true }),
  featuredImage: text("featuredImage"),
  status: mysqlEnum("status", ["Draft", "Published", "Scheduled"]).default("Draft"),
  publishedAt: timestamp("publishedAt"),
  metaTitle: varchar("metaTitle", { length: 255 }),
  metaDescription: text("metaDescription"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull().$onUpdate(() => new Date()),
});

export const articleCategories = mysqlTable("article_categories", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 100 }).notNull(),
  slug: varchar("slug", { length: 255 }).notNull().unique(),
  description: text("description"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

// ─── Testimonials ────────────────────────────────────────────────
export const testimonials = mysqlTable("testimonials", {
  id: serial("id").primaryKey(),
  quote: text("quote").notNull(),
  educationLevel: varchar("educationLevel", { length: 50 }),
  field: varchar("field", { length: 100 }),
  serviceType: varchar("serviceType", { length: 100 }),
  isAnonymous: boolean("isAnonymous").default(true),
  isPublished: boolean("isPublished").default(false),
  displayOrder: int("displayOrder").default(0),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

// ─── FAQs ────────────────────────────────────────────────────────
export const faqs = mysqlTable("faqs", {
  id: serial("id").primaryKey(),
  question: text("question").notNull(),
  answer: text("answer").notNull(),
  category: varchar("category", { length: 100 }),
  displayOrder: int("displayOrder").default(0),
  isActive: boolean("isActive").default(true),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

// ─── Notifications ───────────────────────────────────────────────
export const notifications = mysqlTable("notifications", {
  id: serial("id").primaryKey(),
  userId: bigint("userId", { mode: "number", unsigned: true }),
  type: varchar("type", { length: 50 }),
  title: varchar("title", { length: 255 }),
  message: text("message"),
  readAt: timestamp("readAt"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

// ─── Audit Logs ──────────────────────────────────────────────────
export const auditLogs = mysqlTable("audit_logs", {
  id: serial("id").primaryKey(),
  userId: bigint("userId", { mode: "number", unsigned: true }),
  action: varchar("action", { length: 100 }).notNull(),
  entityType: varchar("entityType", { length: 50 }),
  entityId: bigint("entityId", { mode: "number" }),
  oldData: text("oldData"),
  newData: text("newData"),
  ipAddress: varchar("ipAddress", { length: 45 }),
  userAgent: text("userAgent"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

// ─── Types ───────────────────────────────────────────────────────
export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;
export type ConsultationRequest = typeof consultationRequests.$inferSelect;
export type Service = typeof services.$inferSelect;
export type Article = typeof articles.$inferSelect;
export type Testimonial = typeof testimonials.$inferSelect;
export type FAQ = typeof faqs.$inferSelect;
export type ConsultationNote = typeof consultationNotes.$inferSelect;
export type ConsultationStatusHistory = typeof consultationStatusHistory.$inferSelect;
export type Appointment = typeof appointments.$inferSelect;
export type Document = typeof documents.$inferSelect;
export type ArticleCategory = typeof articleCategories.$inferSelect;
export type Notification = typeof notifications.$inferSelect;
export type AuditLog = typeof auditLogs.$inferSelect;
