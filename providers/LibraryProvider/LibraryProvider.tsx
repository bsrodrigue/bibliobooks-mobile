import { ReactNode, useEffect, useState } from "react";
import { getEntityById } from "../../api/base";
import { getLibrary, getReaderNovelFromNovel } from "../../api/novels";
import { notify } from "../../lib";
import { LibraryNovel, Novel } from "../../types/models";
import { useSession } from "../SessionProvider";
import SessionContext from "./LibraryContext";

type LibraryProviderProps = {
    children?: ReactNode;
}


export default function LibraryProvider({ children }: LibraryProviderProps) {
    const [isLoading, setIsLoading] = useState(false);
    const [novelIdentifiers, setNovelIdentifiers] = useState<Array<string>>([])
    const { session: { userProfile: { userId } } } = useSession();
    const [libraryNovels, setLibraryNovels] = useState<Array<LibraryNovel>>([]);

    const fetchLibraryNovels = async () => {
        try {
            setIsLoading(true);
            const library = await getLibrary({ userId });
            setNovelIdentifiers(library.novels);

            const fetchNovelsTasks: Array<Promise<Novel>> = [];

            for (const novelId of library.novels) {
                fetchNovelsTasks.push(
                    getEntityById<Novel>(novelId, "novel")
                );
            }

            const novels = await Promise.all(fetchNovelsTasks);

            const fetchNovelChaptersTasks = [];
            for (const novel of novels) {
                fetchNovelChaptersTasks.push(getReaderNovelFromNovel(novel));
            }
            const result = await Promise.all(fetchNovelChaptersTasks);
            setLibraryNovels(result)
        } catch (error) {
            notify.error("Erreur survenue en chargeant vos histoires");
        } finally {
            setIsLoading(false);
        }
    }

    const addLibraryNovel = (workshopNovel: LibraryNovel) => {
        setLibraryNovels((prev) => [...prev, workshopNovel]);
        addNovelIdentifier(workshopNovel.id);
    }
    const updateLibraryNovels = (workshopNovels: Array<LibraryNovel>) => {
        setLibraryNovels(workshopNovels);
    }
    const removeLibraryNovel = (id: string) => {
        setLibraryNovels((prev) => prev.filter((novel) => novel.id !== id));
        removeNovelIdentifier(id);
    }

    const addNovelIdentifier = (id: string) => {
        setNovelIdentifiers((prev) => [...prev, id]);
    }

    const removeNovelIdentifier = (id: string) => {
        setNovelIdentifiers((prev) => prev.filter((identifier) => identifier !== id));
    }

    useEffect(() => {
        fetchLibraryNovels();
    }, []);

    return (
        <SessionContext.Provider
            value={{
                libraryNovels,
                isLoading,
                fetchLibraryNovels,
                addLibraryNovel,
                removeLibraryNovel,
                updateLibraryNovels,
                novelIdentifiers,
                addNovelIdentifier,
                removeNovelIdentifier
            }}>
            {children}
        </SessionContext.Provider>
    )
}