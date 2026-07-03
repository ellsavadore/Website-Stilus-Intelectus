import { z } from "zod";
import { createRouter, adminQuery } from "../middleware";
import { getFirebaseDb } from "../lib/firebase";
import { Timestamp } from "firebase-admin/firestore";

export const adminRouter = createRouter({
  dashboard: adminQuery.query(async ({ ctx }) => {
    const db = getFirebaseDb();
    
    // Get consultation stats
    const consultationSnapshot = await db.collection("consultations").get();
    const consultations = consultationSnapshot.docs.map(d => d.data());
    
    const consultationStats = {
      total: consultations.length,
      baru: consultations.filter(c => c.status === "Baru").length,
      active: consultations.filter(c => ["Dalam Pendampingan", "Dijadwalkan", "Sedang Ditinjau"].includes(c.status)).length,
      completed: consultations.filter(c => c.status === "Selesai").length,
      waiting: consultations.filter(c => c.status === "Menunggu Tanggapan Klien").length,
    };

    // Get recent consultations
    const recentSnapshot = await db
      .collection("consultations")
      .orderBy("createdAt", "desc")
      .limit(10)
      .get();
    const recentConsultations = recentSnapshot.docs.map(d => ({
      id: d.id,
      ...d.data(),
      createdAt: d.data().createdAt?.toDate(),
      updatedAt: d.data().updatedAt?.toDate(),
    }));

    // Get service distribution
    const serviceMap: { [key: number]: number } = {};
    consultations.forEach(c => {
      if (c.serviceId) {
        serviceMap[c.serviceId] = (serviceMap[c.serviceId] || 0) + 1;
      }
    });
    const serviceDistribution = Object.entries(serviceMap).map(([serviceId, count]) => ({
      serviceId: Number(serviceId),
      count,
    }));

    // Get education distribution
    const educationMap: { [key: string]: number } = {};
    consultations.forEach(c => {
      if (c.educationLevel) {
        educationMap[c.educationLevel] = (educationMap[c.educationLevel] || 0) + 1;
      }
    });
    const educationDistribution = Object.entries(educationMap).map(([level, count]) => ({
      educationLevel: level,
      count,
    }));

    return {
      consultationStats,
      recentConsultations,
      serviceDistribution,
      educationDistribution,
    };
  }),

  recentAuditLogs: adminQuery.query(async ({ ctx }) => {
    const db = getFirebaseDb();
    const snapshot = await db
      .collection("audit_logs")
      .orderBy("createdAt", "desc")
      .limit(50)
      .get();
    
    return snapshot.docs.map(d => ({
      id: d.id,
      ...d.data(),
      createdAt: d.data().createdAt?.toDate(),
    }));
  }),

  logAudit: adminQuery
    .input(
      z.object({
        action: z.string(),
        entityType: z.string().optional(),
        entityId: z.string().optional(),
        oldData: z.string().optional(),
        newData: z.string().optional(),
        ipAddress: z.string().optional(),
        userAgent: z.string().optional(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const db = getFirebaseDb();
      await db.collection("audit_logs").add({
        userId: ctx.user?.id,
        action: input.action,
        entityType: input.entityType || null,
        entityId: input.entityId || null,
        oldData: input.oldData || null,
        newData: input.newData || null,
        ipAddress: input.ipAddress || null,
        userAgent: input.userAgent || null,
        createdAt: Timestamp.now(),
      });
      return { success: true };
    }),
});
