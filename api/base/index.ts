import { DocumentData, DocumentReference, QueryCompositeFilterConstraint, QueryConstraint, QueryOrderByConstraint, addDoc, collection, deleteDoc, getDoc, getDocs, query, updateDoc, where } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { config } from "../../config";
import { db, storage } from "../../config/firebase";
import { EntityType, FireBaseEntityDocMap } from "../../types/models";

const firebaseEntityDocMap: FireBaseEntityDocMap = {
    "novel": {
        root: "novels",
    },

    "chapter": {
        root: "chapters",
    },

    "user_profile": {
        root: "user_profiles",
    },

    "reading_activity": {
        root: "reading_activities",
    },

    "like": {
        root: "likes",
    },

    "comment": {
        root: "comments",
    },

    "read": {
        root: "reads",
    },

    "library": {
        root: "libraries",
    }
}

export function getColRefFromDocMap(entityType: EntityType) {
    const { root } = firebaseEntityDocMap[entityType];
    return collection(db, root);
}

export async function uploadUserFile(path: string, file: Blob | File) {
    const fileRef = ref(storage, `files/${path}`);
    const result = await uploadBytes(fileRef, file);
    const downloadUrl = await getDownloadURL(result.ref);
    return downloadUrl;
}

export async function createEntity<T extends object>(entity: T, type: EntityType) {
    const createdAt = new Date().toISOString();
    const payload = {
        id: config.defaultIdGenerator.generateId(),
        createdAt,
        updatedAt: createdAt,
        ...entity
    }
    await addDoc(getColRefFromDocMap(type), payload);
    return payload;
}

export async function createOwnedEntity<T extends object>(userId: string, entity: T, type: EntityType) {
    return createEntity({ ownerId: userId, ...entity }, type);
}

export async function updateEntity<T>(reference: DocumentReference<DocumentData, DocumentData>, entity: Partial<T>) {
    const updatedAt = new Date().toISOString();
    await updateDoc(reference, {
        updatedAt,
        ...entity
    });
    const { data } = await getDoc(reference);
    return {
        ...data,
        ...entity,
        updatedAt
    }
}

export async function deleteEntityById(id: string, type: EntityType) {
    const ref = await getEntityRefById(id, type);
    await deleteEntity(ref);
}

export async function deleteEntity(reference: DocumentReference<DocumentData, DocumentData>) {
    await deleteDoc(reference);
}

export async function getEntitiesOwnedByUser<T>(userId: string, type: EntityType): Promise<Array<T>> {
    return await getEntitiesWhere(type, where("ownerId", "==", userId));
}

export async function getPublicEntities<T>(type: EntityType): Promise<Array<T>> {
    return await getEntitiesWhere(type, where("status", "==", "published"));
}

export async function getEntitiesWhere<T>(type: EntityType, ...queryConstraints: Array<QueryConstraint | QueryOrderByConstraint>): Promise<Array<T>> {
    const modelRef = getColRefFromDocMap(type);
    const q = query(modelRef, ...queryConstraints,);
    const qs = await getDocs(q);

    if (qs.empty) {
        return [];
    }

    const result = [];
    qs.docs.forEach((doc) => {
        result.push(doc.data());
    })

    return result;
}

export async function getEntitiesWhereOr<T>(type: EntityType, queryConstraints: QueryCompositeFilterConstraint): Promise<Array<T>> {
    const modelRef = getColRefFromDocMap(type);
    const q = query(modelRef, queryConstraints,);
    const qs = await getDocs(q);

    if (qs.empty) {
        return [];
    }

    const result = [];
    qs.docs.forEach((doc) => {
        result.push(doc.data());
    })

    return result;
}

export async function getEntityById<T>(id: string, type: EntityType): Promise<T> {
    const qs = await getEntityQuerySnapshotById(id, type);
    return qs.docs[0].data() as T;
}

export async function getEntityRefById(id: string, type: EntityType) {
    const qs = await getEntityQuerySnapshotById(id, type);
    if (qs.empty) throw new Error("Entity not found");
    return qs.docs[0].ref;
}

export async function getEntityQuerySnapshotById(id: string, type: EntityType) {
    const collectionRef = getColRefFromDocMap(type);

    const q = query(collectionRef, where("id", "==", id));
    const qs = await getDocs(q);

    if (qs.empty) {
        throw new Error("Entity not found");
    }

    return qs;
}

export async function uploadFile(file: Blob | File, path?: string) {
    const fileRef = ref(storage, `files/uploads/${path}`);
    const result = await uploadBytes(fileRef, file);
    return await getDownloadURL(result.ref);
}