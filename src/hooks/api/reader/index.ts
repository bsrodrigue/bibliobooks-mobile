import { useEffect, useState } from "react";
import { likeChapter, readChapter, unlikeChapter } from "../../../api/chapters";
import { getPublicNovels } from "../../../api/novels";
import { notify } from "../../../lib";
import { useSession } from "../../../providers";
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

//TODO: This is a terrible approach, it seems you'll need to reconsider your state management strategy, maybe try zustand
export function useChapter(chapter: Chapter, setChapters: React.Dispatch<React.SetStateAction<(Chapter & {
    likes: any[];
    comments: any[];
})[]>>) {
    const { session: { profile: { id: userId } } } = useSession();
    const [isLoading, setIsLoading] = useState(false);
    const [isLiked, setIsLiked] = useState(false);
    const [likesCount, setLikesCount] = useState(0);
    const [readsCount, setReadsCount] = useState(0);

    //TODO: Caching to avoid checking read status each time
    const read = async () => {
        try {
            const result = await readChapter(chapter.id);
            if (result.status === "new_read") {
                setReadsCount(readsCount + 1);
            } else {
                setReadsCount(chapter?.reads?.length ?? 0);
            }
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        setIsLiked(chapterIsLikedByUser(chapter, userId));
        setLikesCount(chapter?.likes?.length ?? 0);
        read();
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


    return { toggleLike, isLoading, isLiked, likesCount, readsCount };
}