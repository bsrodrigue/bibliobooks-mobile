import { DocumentData, DocumentReference, addDoc, collection, deleteDoc, getDocs, query, updateDoc, where } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { config } from "../../config";
import { db, storage } from "../../config/firebase";
import { Entity, FireBaseEntityDocMap } from "../../types/models";

const firebaseEntityDocMap: FireBaseEntityDocMap = {
    "novel": {
        root: "novels",
    },

    "chapter": {
        root: "chapters",
    },

    "user_profile": {
        root: "user_profiles",
    }
}

export function getColRefFromDocMap(entityType: Entity) {
    const { root } = firebaseEntityDocMap[entityType];
    return collection(db, root);
}

export async function uploadUserFile(userId: string, path: string, file: Blob | File) {
    const fileRef = ref(storage, `files/users/${userId}/${path}`);
    const result = await uploadBytes(fileRef, file);
    const downloadUrl = await getDownloadURL(result.ref);
    return downloadUrl;
}

export async function createEntity<T extends object>(entity: T, type: Entity) {
    const createdAt = new Date().toISOString();
    const createdEntity =
    {
        id: config.defaultIdGenerator.generateId(),
        createdAt,
        updatedAt: createdAt,
        ...entity
    }
    await addDoc(getColRefFromDocMap(type), createdEntity);
    return createdEntity;
}

export async function createAuthoredEntity<T extends object>(userId: string, entity: T, type: Entity) {
    return createEntity({ authorId: userId, ...entity }, type);
}

export async function updateEntity<T>(reference: DocumentReference<DocumentData, DocumentData>, entity: Partial<T>) {
    const updatedAt = new Date().toISOString();
    await updateDoc(reference, {
        updatedAt,
        ...entity
    });
}

export async function deleteEntity(reference) {
    // Maybe consider adding additional checks
    await deleteDoc(reference);
}

export async function deleteEntityById(id: string, type: Entity) {
    const ref = await getEntityRefById({ id, type })
    await deleteEntity(ref);
}

export async function uploadFile(file: File) {
    return "";
}

export type GetEntitiesByUser = {
    userId: string;
    type: Entity;
}

export async function getEntitiesByUser<T>({ userId, type }: GetEntitiesByUser): Promise<Array<T>> {
    const modelRef = getColRefFromDocMap(type);
    const q = query(modelRef, where("authorId", "==", userId));
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

export type GetEntitiesByStatus = {
    type: Entity;
}

export async function getPublicEntities<T>({ type }: GetEntitiesByStatus): Promise<Array<T>> {
    const modelRef = getColRefFromDocMap(type);
    const q = query(modelRef, where("status", "==", "published"));
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

export type GetEntityByIdInput = {
    id: string;
    type: Entity;
}

export async function getEntityById<T>({ id, type }: GetEntityByIdInput): Promise<T> {
    const modelRef = getColRefFromDocMap(type);

    const q = query(modelRef, where("id", "==", id));
    const qs = await getDocs(q);

    if (qs.empty) {
        return null;
    }

    return qs.docs[0].data() as T;
}

export type GetEntityRefByIdInput = {
    id: string;
    type: Entity;
}

export async function getEntityRefById({ id, type }: GetEntityRefByIdInput) {
    const modelRef = getColRefFromDocMap(type);

    const q = query(modelRef, where("id", "==", id));
    const qs = await getDocs(q);

    if (qs.empty) {
        return null;
    }

    return qs.docs[0].ref;
}