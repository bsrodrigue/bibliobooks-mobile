import { useState } from "react";
import { getUserProfile } from "../../../api/auth";
import { getPublicChaptersFromNovel, getPublicNovels, getUserNovels } from "../../../api/novels";
import { ReaderNovel } from "../../../types/models";

export function useLatestNovels() {
    const [latestNovels, setLatestNovels] = useState<Array<ReaderNovel>>([]);
    const [isLoading, setIsLoading] = useState(false);

    const getLatestNovels = async () => {
        try {
            setIsLoading(true);
            const novels = await getPublicNovels();
            const readerNovels: Array<ReaderNovel> = [];

            for (const novel of novels) {
                const chapters = await getPublicChaptersFromNovel({ novelId: novel.id });
                if (chapters.length !== 0) {
                    const author = await getUserProfile({ userId: novel.authorId });
                    const authorNovels = await getUserNovels({ userId: novel.authorId });
                    author && readerNovels.push({ ...novel, chapters, author: author.userProfile, authorNovels });
                }

            }

            setLatestNovels(readerNovels);
        } catch (error) {

        } finally {
            setIsLoading(false);
        }

    }

    return { getLatestNovels, latestNovels, isLoading }
}