import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { BottomSheet, Card, Icon } from "@rneui/base";
import { useTheme } from "@rneui/themed";
import { useRef, useState } from "react";
import { Dimensions, FlatList, Text, TouchableOpacity } from "react-native";
import { Action, Novel, RootStackParamList } from "../../types";
import { NovelGrid } from "../NovelGrid";

type WorkshopNovelGridProps = {
    actions: Action[];
    novels: Novel[];
    onLastItemPress?: () => void;
    navigation: NativeStackNavigationProp<RootStackParamList, "Publications", undefined>;
};

export default function WorkshopNovelGrid({ actions, novels, navigation, onLastItemPress }: WorkshopNovelGridProps) {
    const [actionsIsVisible, setActionsIsVisible] = useState(false);
    const [currentNovel, setCurrentNovel] = useState(null);
    const columns = useRef(3);
    const { theme: { colors: { greyOutline } } } = useTheme();
    const { width: screenWidth } = Dimensions.get("screen");
    const width = (screenWidth - 100) / 3;

    return (
        <>
            <NovelGrid
                novels={novels}
                onLastItemPress={() => { }}
                onNovelPress={() => {
                    navigation.navigate("WorkshopChapters");
                }}
                onNovelLongPress={(novel) => {
                    setCurrentNovel(novel);
                    setActionsIsVisible(true);
                }}
            />
            <BottomSheet
                onBackdropPress={() => setActionsIsVisible(false)}
                isVisible={actionsIsVisible}>
                <Card containerStyle={{
                    margin: 0,
                    borderTopStartRadius: 25,
                    borderTopEndRadius: 25,
                    flex: 1,
                    paddingHorizontal: 10,
                    justifyContent: "center",
                    alignItems: "center",
                }}>
                    <FlatList
                        numColumns={columns.current}
                        columnWrapperStyle={{ gap: 15 }}
                        data={actions} renderItem={({ index, item: { title, icon, onPress } }) => (
                            <TouchableOpacity
                                onPress={onPress}
                                style={{
                                    borderWidth: 1,
                                    borderColor: greyOutline,
                                    borderRadius: 10,
                                    width,
                                    height: width,
                                    justifyContent: "center",
                                    alignItems: "center",
                                    marginVertical: 10
                                }}>
                                <Icon name={icon} type="font-awesome-5" />
                                <Text style={{ fontFamily: "Quicksand-700" }}>{title}</Text>
                            </TouchableOpacity>
                        )} />
                </Card>
            </BottomSheet>
        </>
    )
}