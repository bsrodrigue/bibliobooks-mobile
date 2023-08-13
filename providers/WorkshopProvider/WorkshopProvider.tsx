import * as Network from "expo-network";
import { ReactNode, useEffect, useState } from "react";
import { getUserNovels } from "../../api/novels";
import { notify } from "../../lib";
import { useAsyncStorage } from "../../lib/storage";
import { Chapter, WorkshopNovel } from "../../types/models";
import SessionContext from "./WorkshopContext";

type WorkshopProviderProps = {
    children?: ReactNode;
}

export default function WorkshopProvider({ children }: WorkshopProviderProps) {
    const [isLoading, setIsLoading] = useState(false);
    const [workshopNovels, setWorkshopNovels] = useState<Array<WorkshopNovel>>([]);
    const { storeData, getData } = useAsyncStorage();

    useEffect(() => {
        workshopNovels && storeData("workshop", workshopNovels);
    }, [workshopNovels]);

    const fetchWorkshopNovels = async () => {
        const networkState = await Network.getNetworkStateAsync();
        const localWorkshopNovelsJson = await getData("workshop");

        if (!networkState.isInternetReachable) {
            setWorkshopNovels(JSON.parse(localWorkshopNovelsJson));
            return;
        }

        try {
            setIsLoading(true);
            const novels = await getUserNovels();

            // Sync
            const novelsJson = JSON.stringify(novels);
            if (novelsJson !== localWorkshopNovelsJson) {
                //  TODO: Implement a sync mechanism
            }

            setWorkshopNovels(novels)
        } catch (error) {
            notify.error("Erreur survenue en chargeant vos histoires");
        } finally {
            setIsLoading(false);
        }
    }

    const addWorkshopNovel = (workshopNovel: WorkshopNovel) => {
        setWorkshopNovels((prev) => [...prev, workshopNovel]);
    }
    const updateWorkshopNovels = (workshopNovels: Array<WorkshopNovel>) => {
        setWorkshopNovels(workshopNovels);
    }
    const removeWorkshopNovel = (id: number) => {
        setWorkshopNovels((prev) => prev.filter((novel) => novel.id !== id));
    }

    const updateWorkshopNovel = (id: number, payload: Partial<WorkshopNovel>) => {
        setWorkshopNovels((prev) => prev.map((novel) => {
            if (novel.id === id) {
                novel = { ...novel, ...payload };

                novel.chapters = novel.chapters.sort((chap1, chap2) => chap1.order - chap2.order)
            }
            return novel;
        }));
    }

    const updateWorkshopChapter = (novel: WorkshopNovel, chapterId: number, payload: Partial<Chapter>) => {
        updateWorkshopNovel(novel.id, {
            chapters: novel.chapters.map((chap) => {
                if (chap.id === chapterId) {
                    chap = { ...chap, ...payload };
                }
                return chap;
            })
        });
    }

    useEffect(() => {
        fetchWorkshopNovels();
    }, []);

    return (
        <SessionContext.Provider
            value={{
                workshopNovels,
                isLoading,
                fetchWorkshopNovels,
                addWorkshopNovel,
                removeWorkshopNovel,
                updateWorkshopNovels,
                updateWorkshopNovel,
                updateWorkshopChapter
            }}>
            {children}
        </SessionContext.Provider>
    )
}