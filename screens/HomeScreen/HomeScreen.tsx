import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useTheme } from "@rneui/themed";
import { useEffect, useState } from "react";
import { RefreshControl, ScrollView, StyleSheet } from "react-native";
import { getNovel, getReaderNovelFromNovel, getUserActivities } from "../../api/novels";
import useCall from "../../api/useCall";
import { LatestReadCard, RecommendationCarousel, StoryRecommendation } from "../../components";
import { notify } from "../../lib";
import { mom } from "../../lib/moment";
import { useSession } from "../../providers";
import { RootStackParamList } from "../../types";
import { Activity, ReaderNovel } from "../../types/models";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
        marginTop: 10
    },
});

const description = "Il s’agit d’une histoire vraiment et franchement historique. Rien de plus vrai que l’histoire de l’histoire de vos meilleures histoires historiques. J’avais juste la flemme d’utiliser un lorem ipsum, ironique..."

const novels = [
    {
        title: "La grande aventure - Tome 1",
        description,
        chapterCount: 26,
        imgSrc: require("../../assets/images/dragon.jpg"),
    }, {
        title: "La grande aventure - Tome 2",
        description,
        chapterCount: 26,
        imgSrc: require("../../assets/images/lizard.jpg"),
    }, {
        title: "La grande aventure - Tome 3",
        description,
        chapterCount: 26,
        imgSrc: require("../../assets/images/traditional.jpg"),
    }, {
        title: "La grande aventure - Tome 4",
        description,
        chapterCount: 26,
        imgSrc: require("../../assets/images/action.jpg"),
    }, {
        title: "La grande aventure - Tome 5",
        description,
        chapterCount: 26,
        imgSrc: require("../../assets/images/fantasy.jpg"),
    },
];

const novel = {
    title: "Le légendaire chevalier africain par le mestre gims",
    description: "Ce livre vaut vraiment la peine d’etre lu, je vous le promet, vous devez le lire, il est merveilleux, il vous fait croire en Dieu plus que qui d’autre. Je vous jure que c’est vrai. Ce livre vaut vraiment la peine d’etre lu, je vous le promet, vous devez le lire, il est merveilleux, il vous fait croire en Dieu plus que qui d’autre...",
    mature: true,
    genre: "Fantasy",
    author: "LeMestre_Gims",
    chapterCount: 35,
    imgSrc: require("../../assets/images/noice_butt.jpg")
};

type HomeScreenProps = NativeStackScreenProps<RootStackParamList, 'Home'>;

export default function HomeScreen({ navigation }: HomeScreenProps) {
    const { theme: { colors: { primary } } } = useTheme();
    const [latestRead, setLatestRead] = useState<ReaderNovel>(null);
    const [latestActivity, setLatestActivity] = useState<Activity>(null);
    const [loading, setLoading] = useState(false);
    const { session: { userProfile: { userId, birthdate } } } = useSession();
    const { call: callGetUserActivities, isLoading: isGetUserActivitiesLoading } = useCall(getUserActivities, {
        async onSuccess(activities) {
            if (activities.length) {
                try {
                    setLoading(true);
                    const latestActivity = activities[activities.length - 1];
                    setLatestActivity(latestActivity);
                    const novel = await getNovel({ novelId: latestActivity.entityId });
                    const readerNovel = await getReaderNovelFromNovel(novel);
                    readerNovel && setLatestRead(readerNovel);
                } catch (error) {
                    notify.error(error?.message || "Une erreur est survenue...");
                } finally {
                    setLoading(false);
                }
            }
        },
    });

    const refreshing = isGetUserActivitiesLoading || loading;

    useEffect(() => {
        callGetUserActivities({ userId });
    }, []);

    return (
        <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={() => {
            callGetUserActivities({ userId })
        }} />} style={styles.container}>
            {
                latestRead &&
                <LatestReadCard
                    title="Dernière lecture"
                    time={mom(latestActivity.createdAt).fromNow()}
                    novel={latestRead}
                    onResume={(novel) => {
                        const result = novel.chapters.filter((chapter) => chapter.id === latestActivity.options?.chapterId)
                        result.length && navigation.navigate("Reader", { novel, chapter: result[0] });
                    }}
                />}

            <StoryRecommendation
                title="Le jardin des plaisirs"
                subtitle="Laissez-vous charmer par les rondeurs de Sophia"
                novel={novel}
                onPress={() => {
                    // navigation.navigate("NovelDetails", {  });
                }}
            />
            <RecommendationCarousel title="Les histoires les plus populaires" novels={novels} />
            <StoryRecommendation
                title="Les totems des anciens"
                subtitle="Renouez avec vos racines"
                novel={{ title: "", description: "", mature: false, chapterCount: 35, imgSrc: require("../../assets/images/traditional.jpg") }} />
        </ScrollView >
    )
}