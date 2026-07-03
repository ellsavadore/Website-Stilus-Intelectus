import { z } from "zod";
import { createRouter, publicQuery, protectedQuery } from "../middleware";
import { getFirebaseDb } from "../lib/firebase";
import { Timestamp } from "firebase-admin/firestore";

function generateTicketNumber(): string {
  const year = new Date().getFullYear();
  const random = Math.floor(100000 + Math.random() * 900000);
  return `SI-${year}-${random}`;
}

export const consultationRouter = createRouter({
  submit: publicQuery
    .input(
      z.object({
        fullName: z.string().min(1),
        email: z.string().email(),
        phone: z.string().optional(),
        educationLevel: z.enum(["S1", "S2", "S3", "Lainnya"]),
        fieldOfStudy: z.string().optional(),
        institution: z.string().optional(),
        serviceId: z.number().optional(),
        researchStage: z.enum([
          "Perumusan Masalah",
          "Tinjauan Literatur",
          "Pengumpulan Data",
          "Analisis Data",
          "Penyusunan Naskah",
          "Revisi",
          "Publikasi",
        ]).optional(),
        researchTopic: z.string().optional(),
        researchMethod: z.string().optional(),
        software: z.string().optional(),
        deadline: z.string().optional(),
        problemDescription: z.string().optional(),
        preferredContact: z.enum(["WhatsApp", "Email", "Video Call"]).optional(),
        privacyAgreed: z.boolean().optional(),
        ethicsAgreed: z.boolean().optional(),
      })
    )
    .mutation(async ({ input }) => {
      const db = getFirebaseDb();
      const ticketNumber = generateTicketNumber();
      
      await db.collection("consultations").add({
        ticketNumber,
        fullName: input.fullName,
        email: input.email,
        phone: input.phone || null,
        educationLevel: input.educationLevel,
        fieldOfStudy: input.fieldOfStudy || null,
        institution: input.institution || null,
        serviceId: input.serviceId || null,
        researchStage: input.researchStage || null,
        researchTopic: input.researchTopic || null,
        researchMethod: input.researchMethod || null,
        software: input.software || null,
        deadline: input.deadline || null,
        problemDescription: input.problemDescription || null,
        preferredContact: input.preferredContact || "Email",
        privacyAgreed: input.privacyAgreed || false,
        ethicsAgreed: input.ethicsAgreed || false,
        status: "Baru",
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now(),
      });

      return { success: true, ticketNumber };
    }),

  list: protectedQuery.query(async ({ ctx }) => {
    const db = getFirebaseDb();
    // Only admin can list all consultations
    if (ctx.user?.role !== "admin") {
      throw new Error("Unauthorized");
    }
    const snapshot = await db.collection("consultations").orderBy("createdAt", "desc").get();
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt?.toDate(),
      updatedAt: doc.data().updatedAt?.toDate(),
    }));
  }),

  getById: protectedQuery
    .input(z.object({ id: z.string() }))
    .query(async ({ input, ctx }) => {
      const db = getFirebaseDb();
      // Only admin can get consultation details
      if (ctx.user?.role !== "admin") {
        throw new Error("Unauthorized");
      }
      const doc = await db.collection("consultations").doc(input.id).get();
      if (!doc.exists) return null;
      return {
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data()?.createdAt?.toDate(),
        updatedAt: doc.data()?.updatedAt?.toDate(),
      };
    }),

  updateStatus: protectedQuery
    .input(
      z.object({
        id: z.string(),
        status: z.enum([
          "Baru",
          "Sedang Ditinjau",
          "Menunggu Dokumen",
          "Dijadwalkan",
          "Dalam Pendampingan",
          "Menunggu Tanggapan Klien",
          "Selesai",
          "Dibatalkan",
          "Diarsipkan",
        ]),
        notes: z.string().optional(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const db = getFirebaseDb();
      // Only admin can update status
      if (ctx.user?.role !== "admin") {
        throw new Error("Unauthorized");
      }
      
      const consultationRef = db.collection("consultations").doc(input.id);
      const doc = await consultationRef.get();
      
      if (!doc.exists) {
        throw new Error("Consultation not found");
      }

      await consultationRef.update({
        status: input.status,
        updatedAt: Timestamp.now(),
      });

      // Add status history
      if (doc.data()?.status !== input.status) {
        await db.collection("consultation_history").add({
          consultationId: input.id,
          oldStatus: doc.data()?.status,
          newStatus: input.status,
          notes: input.notes || null,
          changedBy: ctx.user?.id,
          changedAt: Timestamp.now(),
        });
      }

      return { success: true };
    }),

  stats: protectedQuery.query(async ({ ctx }) => {
    const db = getFirebaseDb();
    // Only admin can view stats
    if (ctx.user?.role !== "admin") {
      throw new Error("Unauthorized");
    }
    
    const snapshot = await db.collection("consultations").get();
    const docs = snapshot.docs.map(d => d.data());
    
    return {
      total: docs.length,
      baru: docs.filter(d => d.status === "Baru").length,
      active: docs.filter(d => ["Dalam Pendampingan", "Dijadwalkan", "Sedang Ditinjau"].includes(d.status)).length,
      completed: docs.filter(d => d.status === "Selesai").length,
      waiting: docs.filter(d => d.status === "Menunggu Tanggapan Klien").length,
    };
  }),

  addNote: protectedQuery
    .input(
      z.object({
        consultationId: z.string(),
        content: z.string(),
        visibility: z.enum(["Internal", "Klien"]).default("Internal"),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const db = getFirebaseDb();
      // Only admin can add notes
      if (ctx.user?.role !== "admin") {
        throw new Error("Unauthorized");
      }
      
      await db.collection("consultation_notes").add({
        consultationId: input.consultationId,
        content: input.content,
        visibility: input.visibility,
        authorId: ctx.user?.id,
        createdAt: Timestamp.now(),
      });
      return { success: true };
    }),

  getNotes: publicQuery
    .input(z.object({ consultationId: z.number() }))
    .query(async ({ input }) => {
      const db = getDb();
      return db
        .select()
        .from(consultationNotes)
        .where(eq(consultationNotes.consultationId, input.consultationId))
        .orderBy(desc(consultationNotes.createdAt));
    }),
});
