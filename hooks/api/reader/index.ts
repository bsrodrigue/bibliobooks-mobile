import { useState } from "react";
import { getPublicNovels } from "../../../api/novels";
import { notify } from "../../../lib";
import { ReaderNovel } from "../../../types/models";

export function useLatestNovels() {
    const [latestNovels, setLatestNovels] = useState<Array<ReaderNovel>>([]);
    const [isLoading, setIsLoading] = useState(false);

    const getLatestNovels = async () => {
        try {
            setIsLoading(true);
            const novels: ReaderNovel[] = await getPublicNovels();
            setLatestNovels(novels);
        } catch (error) {
            notify.error("Une erreur est survenue en chargeant les histoires");
            console.error(error)
        } finally {
            setIsLoading(false);
        }

    }

    return { getLatestNovels, latestNovels, isLoading }
}