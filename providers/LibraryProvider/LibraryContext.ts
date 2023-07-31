import { createContext } from "react";
import { LibraryNovel } from "../../types/models";

type LibraryContextType = {
    libraryNovels: Array<LibraryNovel>;
    isLoading?: boolean;
    fetchLibraryNovels: () => void;
    addLibraryNovel: (workshopNovel: LibraryNovel) => void;
    removeLibraryNovel: (id: string) => void;
    updateLibraryNovels: (workshopNovels: Array<LibraryNovel>) => void;
    novelIdentifiers: Array<string>;
    addNovelIdentifier: (id: string) => void;
    removeNovelIdentifier: (id: string) => void;
}

const LibraryContext = createContext<LibraryContextType | null>(null);

export default LibraryContext;