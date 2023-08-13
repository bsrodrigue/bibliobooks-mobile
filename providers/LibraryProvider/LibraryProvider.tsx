import { ReactNode, useEffect, useState } from "react";
import { getLibrary } from "../../api/novels";
import { notify } from "../../lib";
import { useAsyncStorage } from "../../lib/storage";
import { Library, LibraryNovel } from "../../types/models";
import SessionContext from "./LibraryContext";
import * as Network from "expo-network";

type LibraryProviderProps = {
    children?: ReactNode;
}

export default function LibraryProvider({ children }: LibraryProviderProps) {
    const [isLoading, setIsLoading] = useState(false);
    const [library, setLibrary] = useState<Library>(null);
    const { storeData, getData } = useAsyncStorage();

    useEffect(() => {
        library && storeData("library", library);
    }, [library]);

    const fetchLibraryNovels = async () => {
        const networkState = await Network.getNetworkStateAsync();
        if (!networkState.isInternetReachable) {
            const localLibrary = await getData("library");
            setLibrary(JSON.parse(localLibrary));
            return;
        }

        try {
            setIsLoading(true);
            const library = await getLibrary();
            setLibrary(library)
        } catch (error) {
            const localLibrary = await getData("library");
            setLibrary(JSON.parse(localLibrary));
            notify.error("Erreur survenue en chargeant vos histoires");
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    }

    const addLibraryNovel = (novel: LibraryNovel) => {
        setLibrary((prev) => {
            prev.novels.push(novel);
            return prev;
        });
    }
    const updateLibraryNovels = (novels: Array<LibraryNovel>) => {
        setLibrary((prev) => {
            prev.novels = novels;
            return prev;
        });
    }
    const removeLibraryNovel = (novelId: number) => {
        setLibrary((prev) => {
            prev.novels = prev.novels.filter((novel) => novel.id !== novelId);
            return prev;
        });
    }

    useEffect(() => {
        fetchLibraryNovels();
    }, []);

    return (
        <SessionContext.Provider
            value={{
                library,
                isLoading,
                addLibraryNovel,
                removeLibraryNovel,
                updateLibraryNovels,
                fetchLibraryNovels,
            }}>
            {children}
        </SessionContext.Provider>
    )
}