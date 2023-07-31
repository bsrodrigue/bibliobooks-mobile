import { createContext } from "react";
import { Chapter, WorkshopNovel } from "../../types/models";

type WorkshopContextType = {
    workshopNovels: Array<WorkshopNovel>;
    isLoading?: boolean;
    fetchWorkshopNovels: () => void;
    addWorkshopNovel: (workshopNovel: WorkshopNovel) => void;
    removeWorkshopNovel: (id: string) => void;
    updateWorkshopNovels: (workshopNovels: Array<WorkshopNovel>) => void;
    updateWorkshopNovel: (id: string, payload: Partial<WorkshopNovel>) => void;
    updateWorkshopChapter: (novel: WorkshopNovel, chapterId: string, payload: Partial<Chapter>) => void;
}

const WorkshopContext = createContext<WorkshopContextType | null>(null);

export default WorkshopContext;