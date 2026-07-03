import { getFirebaseDb } from "../lib/firebase";
import type { InsertUser } from "@db/schema";
import { env } from "../lib/env";

const USERS_COLLECTION = "users";

export async function findUserByUnionId(unionId: string) {
  try {
    const db = getFirebaseDb();
    const snapshot = await db
      .collection(USERS_COLLECTION)
      .where("unionId", "==", unionId)
      .limit(1)
      .get();

    if (snapshot.empty) {
      return undefined;
    }

    const doc = snapshot.docs[0];
    return {
      id: doc.id,
      ...doc.data(),
    };
  } catch (error) {
    console.error("Error finding user by unionId:", error);
    throw error;
  }
}

export async function upsertUser(data: InsertUser) {
  try {
    const db = getFirebaseDb();
    const userId = data.unionId;
    if (!userId) {
      throw new Error("unionId is required");
    }

    const userRef = db.collection(USERS_COLLECTION).doc(userId);
    const snapshot = await userRef.get();

    const updateData = {
      ...data,
      lastSignInAt: new Date().toISOString(),
    };

    // Set admin role for owner
    if (!snapshot.exists && data.unionId === env.ownerUnionId) {
      updateData.role = "admin";
    }

    if (snapshot.exists) {
      await userRef.update(updateData);
    } else {
      await userRef.set(updateData);
    }

    const updated = await userRef.get();
    return {
      id: updated.id,
      ...updated.data(),
    };
  } catch (error) {
    console.error("Error upserting user:", error);
    throw error;
  }
}
