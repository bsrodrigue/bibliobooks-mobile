import { useState } from "react";
import { likeChapter, unlikeChapter } from "../../../api/chapters";
import { getPublicNovels } from "../../../api/novels";
import { notify } from "../../../lib";
import { Chapter, ReaderNovel } from "../../../types/models";

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

export function useChapter(chapter: Chapter) {
    const [isLoading, setIsLoading] = useState(false);

    const action = async (id: number, call: any) => {
        try {
            setIsLoading(true);
            await call({ chapterId: id });
        } catch (error) {
            notify.error("Erreur");
            console.error(error)
        } finally {
            setIsLoading(false);
        }
    }

    const like = async () => {
        await action(chapter.id, likeChapter);
    }

    const unlike = async () => {
        await action(chapter.id, unlikeChapter);
    }


    return { like, unlike, isLoading };
}