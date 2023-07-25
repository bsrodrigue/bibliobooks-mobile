import { addDoc, collection, deleteDoc, updateDoc } from "firebase/firestore";
import { config } from "../../config";
import { db } from "../../config/firebase";
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

export async function updateEntity(reference, entity) {
    const updatedAt = new Date().toISOString();
    await updateDoc(reference, {
        updatedAt,
        ...entity
    });
}

export async function deleteEntity(reference) {
    await deleteDoc(reference);
}

export async function uploadFile(file: File) {
    return "";
}