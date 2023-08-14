import { useEffect, useState } from "react";
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

function chapterIsLikedByUser(chapter: Chapter, userId: number) {
    return chapter?.likes?.some((like) => like.ownerId === userId);
}

export function useChapter(chapter: Chapter, userId: number, setChapters: React.Dispatch<React.SetStateAction<(Chapter & {
    reads: any[];
    likes: any[];
    comments: any[];
})[]>>) {
    const [isLoading, setIsLoading] = useState(false);
    const [isLiked, setIsLiked] = useState(chapterIsLikedByUser(chapter, userId));
    const [likesCount, setLikesCount] = useState(chapter?.likes?.length || 0);

    useEffect(() => {
        setIsLiked(chapterIsLikedByUser(chapter, userId));
        setLikesCount(chapter?.likes?.length || 0);
    }, [chapter]);

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
        setIsLiked(true);
        setLikesCount(likesCount + 1);
        setChapters((prev) => {
            const like = { ownerId: userId };
            prev = prev.map((chap) => {
                if (chap.id === chapter.id) {
                    chap.likes.push(like);
                }
                return chap;
            })
            return prev;
        })
        notify.success("Chapitre voté!")
    }

    const unlike = async () => {
        await action(chapter.id, unlikeChapter);
        setIsLiked(false);
        setLikesCount(likesCount - 1);
        setChapters((prev) => {
            prev = prev.map((chap) => {
                if (chap.id === chapter.id) {
                    chap.likes = chap.likes.filter((like) => like.ownerId !== userId)
                }
                return chap;
            })
            return prev;
        })
        notify.success("Vote supprimé!")
    }

    const toggleLike = async () => {
        isLiked ? await unlike() : await like();
    }


    return { toggleLike, isLoading, isLiked, likesCount };
}