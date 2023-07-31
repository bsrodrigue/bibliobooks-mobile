import { useEffect, useState } from "react";
import { getUserProfile } from "../../../api/auth";
import { getCommentsByChapter, getLikesByChapter, getReadsByChapter } from "../../../api/chapters";
import { getNovelChapters, getPublicChaptersFromNovel, getPublicNovels, getUserNovels } from "../../../api/novels";
import { notify } from "../../../lib";
import { ReaderNovel } from "../../../types/models";

type UseLatestNovelsProps = {
    omitMatureNovels?: boolean;
}

export function useLatestNovels({ omitMatureNovels }: UseLatestNovelsProps) {
    const [latestNovels, setLatestNovels] = useState<Array<ReaderNovel>>([]);
    const [isLoading, setIsLoading] = useState(false);

    const getLatestNovels = async () => {
        try {
            setIsLoading(true);
            let novels = await getPublicNovels();
            if (omitMatureNovels!) {
                novels = novels.filter((novel) => !novel.isMature);
            }
            const readerNovels: Array<ReaderNovel> = [];

            for (const novel of novels) {
                const chapters = await getPublicChaptersFromNovel({ novelId: novel.id });
                if (chapters.length !== 0) {
                    const author = await getUserProfile({ userId: novel.ownerId });
                    const authorNovels = await getUserNovels({ userId: novel.ownerId });
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

type UseNovelStatsProps = {
    novelId: string;
}

export function useNovelStats({ novelId }: UseNovelStatsProps) {
    const [reads, setReads] = useState(0);
    const [likes, setLikes] = useState(0);
    const [comments, setComments] = useState(0);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetch = async () => {
            try {
                setIsLoading(true);
                const chapters = await getNovelChapters(novelId);
                if (!chapters.length) return;

                let readsCount = 0;
                let likesCount = 0;
                let commentsCount = 0;

                for (const chapter of chapters) {
                    const chapterId = chapter.id;

                    const tasks: Array<Promise<any>> = [];
                    tasks.push(getReadsByChapter({ chapterId }))
                    tasks.push(getLikesByChapter({ chapterId }))
                    tasks.push(getCommentsByChapter({ chapterId }))

                    const [r, l, c] = await Promise.all(tasks);
                    readsCount += r.length;
                    likesCount += l.length;
                    commentsCount += c.length;
                }

                setReads(readsCount)
                setLikes(likesCount)
                setComments(commentsCount)
            } catch (error) {
                notify.error("Une erreur est survenue lors du chargements des statistiques")
            } finally {
                setIsLoading(false);
            }

        }

        novelId && fetch();
    }, [novelId]);


    return { reads, likes, comments, isLoading }

}