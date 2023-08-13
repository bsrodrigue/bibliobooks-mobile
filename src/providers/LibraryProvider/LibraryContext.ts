import { createContext } from "react";
import { Library, LibraryNovel } from "../../types/models";

type LibraryContextType = {
    library: Library;
    isLoading?: boolean;
    addLibraryNovel: (novel: LibraryNovel) => void;
    removeLibraryNovel: (novelId: number) => void;
    updateLibraryNovels: (novels: Array<LibraryNovel>) => void;
    fetchLibraryNovels: () => void;
}

const LibraryContext = createContext<LibraryContextType | null>(null);

export default LibraryContext;