import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useState } from "react";
import { Action, RootStackParamList } from "../../types";
import { Novel } from "../../types/models";
import { ActionBottomSheet } from "../ActionBottomSheet";
import { NovelGrid } from "../NovelGrid";

type WorkshopNovelGridProps = {
    actions: Action[];
    novels: Array<Novel>;
    onLastItemPress?: () => void;
    navigation: NativeStackNavigationProp<RootStackParamList, "NovelWorkshop", undefined>;
};

export default function WorkshopNovelGrid({ actions, novels, navigation, onLastItemPress }: WorkshopNovelGridProps) {
    const [actionsIsVisible, setActionsIsVisible] = useState(false);
    const [currentNovel, setCurrentNovel] = useState(null);

    return (
        <>
            <NovelGrid
                novels={novels}
                onLastItemPress={onLastItemPress}
                onNovelPress={() => {
                    navigation.navigate("ChapterWorkshop");
                }}
                onNovelLongPress={(novel) => {
                    setCurrentNovel(novel);
                    setActionsIsVisible(true);
                }}
            />
            <ActionBottomSheet novel={currentNovel} actions={actions} isVisible={actionsIsVisible} onBackdropPress={() => setActionsIsVisible(false)} />
        </>
    )
}