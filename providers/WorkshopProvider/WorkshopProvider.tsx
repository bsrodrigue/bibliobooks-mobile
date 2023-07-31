import { ReactNode, useEffect, useState } from "react";
import { getNovelChapters, getUserNovels } from "../../api/novels";
import { notify } from "../../lib";
import { Chapter, Novel, WorkshopNovel } from "../../types/models";
import { useSession } from "../SessionProvider";
import SessionContext from "./WorkshopContext";

type WorkshopProviderProps = {
    children?: ReactNode;
}

export async function getWorkshopNovelFromNovel(novel: Novel): Promise<WorkshopNovel> {
    const chapters = await getNovelChapters(novel.id);
    return { ...novel, chapters };
}

export default function WorkshopProvider({ children }: WorkshopProviderProps) {
    const [isLoading, setIsLoading] = useState(false);
    const { session: { userProfile: { userId } } } = useSession();
    const [workshopNovels, setWorkshopNovels] = useState<Array<WorkshopNovel>>([]);

    const fetchWorkshopNovels = async () => {
        try {
            setIsLoading(true);
            const novels = await getUserNovels({ userId });
            const tasks = [];
            for (const novel of novels) {
                tasks.push(getWorkshopNovelFromNovel(novel));
            }
            const result = await Promise.all(tasks);
            setWorkshopNovels(result)
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
    const removeWorkshopNovel = (id: string) => {
        setWorkshopNovels((prev) => prev.filter((novel) => novel.id !== id));
    }

    const updateWorkshopNovel = (id: string, payload: Partial<WorkshopNovel>) => {
        setWorkshopNovels((prev) => prev.map((novel) => {
            if (novel.id === id) {
                novel = { ...novel, ...payload };
            }
            return novel;
        }));
    }

    const updateWorkshopChapter = (novel: WorkshopNovel, chapterId: string, payload: Partial<Chapter>) => {
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