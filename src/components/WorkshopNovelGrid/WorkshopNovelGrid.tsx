import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useState } from "react";
import { Action, RootStackParamList } from "../../types";
import { WorkshopNovel } from "../../types/models";
import { ActionBottomSheet } from "../ActionBottomSheet";
import { NovelGrid } from "../NovelGrid";

type WorkshopNovelGridProps = {
    actions: Action[];
    novels: Array<WorkshopNovel>;
    onLastItemPress?: () => void;
    navigation: NativeStackNavigationProp<RootStackParamList, "NovelWorkshop", undefined>;
    refreshing?: boolean;
    onRefresh?: () => void;
    confirm?: boolean;
    onConfirm?: () => Promise<void>;
    loading?: boolean;
    onBackdropPress?: () => void;
};

export default function WorkshopNovelGrid({
    actions, novels, navigation,
    onLastItemPress, refreshing, onRefresh,
    confirm, onConfirm, loading, onBackdropPress
}: WorkshopNovelGridProps) {
    const [actionsIsVisible, setActionsIsVisible] = useState(false);
    const [currentNovel, setCurrentNovel] = useState(null);

    return (
        <>
            <NovelGrid
                refreshing={refreshing}
                onRefresh={onRefresh}
                novels={novels}
                onLastItemPress={onLastItemPress}
                onNovelPress={(novel: WorkshopNovel) => {
                    navigation.navigate("ChapterWorkshop", { novelId: novel.id });
                }}
                onNovelLongPress={(novel) => {
                    setCurrentNovel(novel);
                    setActionsIsVisible(true);
                }}
            />
            <ActionBottomSheet
                confirm={confirm}
                onConfirm={async () => {
                    await onConfirm?.();
                    setActionsIsVisible(false);
                }}
                loading={loading}
                item={currentNovel}
                actions={actions}
                onActionFinished={() => setActionsIsVisible(false)}
                isVisible={actionsIsVisible}
                onBackdropPress={() => {
                    onBackdropPress?.();
                    setCurrentNovel(null)
                    setActionsIsVisible(false)
                }
                } />
        </>
    )
}