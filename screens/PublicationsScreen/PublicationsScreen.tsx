import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { BottomSheet, Card, Icon } from "@rneui/base";
import { useTheme } from "@rneui/themed";
import { useRef, useState } from "react";
import { Dimensions, FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { NovelGrid } from "../../components";
import { novels } from "../../mock";
import { Novel, RootStackParamList } from "../../types";

const data: Novel[] = [
    ...novels, { last: true },
]

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
        paddingVertical: 10,
        justifyContent: "center",
        alignItems: "center",
    },
});

type PublicationsScreenProps = NativeStackScreenProps<RootStackParamList, 'Publications'>;

const actions = [
    {
        icon: "eye",
        title: "Publier",
        onPress: () => { },
    }, {
        icon: "archive",
        title: "Archiver",
        onPress: () => { },
    }, {
        icon: "trash",
        title: "Supprimer",
        onPress: () => { },
    }, {
        icon: "list",
        title: "Chapitres",
        onPress: () => { },
    }, {
        icon: "pen",
        title: "Editer",
        onPress: () => { },
    },
];

export default function PublicationsScreen({ navigation }: PublicationsScreenProps) {
    const columns = useRef(3);
    const { theme: { colors: { greyOutline } } } = useTheme();
    const [actionsIsVisible, setActionsIsVisible] = useState(false);
    const [currentNovel, setCurrentNovel] = useState(null);
    const { width: screenWidth } = Dimensions.get("screen");
    const width = (screenWidth - 100) / 3;

    return (
        <View style={styles.container}>
            <NovelGrid
                novels={data}
                onNovelPress={(novel) => { }}
                onNovelLongPress={(novel) => {
                    setCurrentNovel(novel);
                    setActionsIsVisible(true);
                }} onLastItemPress={() => { }} />
            <BottomSheet onBackdropPress={() => setActionsIsVisible(false)} isVisible={actionsIsVisible}>
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
        </View>
    )
}