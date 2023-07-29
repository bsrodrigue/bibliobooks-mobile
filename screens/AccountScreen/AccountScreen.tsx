import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { FAB, Icon } from "@rneui/base";
import { Avatar, useTheme } from "@rneui/themed";
import { Formik } from "formik";
import { useState } from "react";
import { Text, View } from "react-native";
import * as Yup from "yup";
import { updateUserProfile } from "../../api/auth";
import useCall from "../../api/useCall";
import { Button, TextInput } from "../../components";
import { useImagePicker } from "../../hooks";
import { useSession } from "../../providers";
import { RootStackParamList } from "../../types";

const accountSchema = Yup.object().shape({
    firstName: Yup.string().required("Champ requis"),
    lastName: Yup.string().required("Champ requis"),
    pseudo: Yup.string().required("Champ requis"),
    bio: Yup.string().required("Champ requis"),
});

type AccountScreenProps = NativeStackScreenProps<RootStackParamList, 'Account'>;

export default function AccountScreen({ navigation, route: { params } }: AccountScreenProps) {
    const { theme: { colors: { primary, greyOutline, black } } } = useTheme();
    const [isEditMode, setIsEditMode] = useState(false);
    const { session, updateSession } = useSession();
    const { userProfile: { pseudo, firstName, lastName, bio, avatarUrl, gender } } = session;
    const { call, isLoading } = useCall(updateUserProfile, {
        async onSuccess(result) {
            await updateSession({ userProfile: { ...session.userProfile, ...result } });
            toggleEditMode();
        },
    })
    const { imgUri, pickImage } = useImagePicker();
    const toggleEditMode = () => setIsEditMode(!isEditMode);

    return (
        <View style={{ flex: 1, backgroundColor: primary, justifyContent: "space-between" }}>
            {
                !isEditMode && (
                    <FAB color="white" onPress={toggleEditMode} placement="right" >
                        <Icon name="pen" type="font-awesome-5" />
                    </FAB>
                )
            }
            {
                !isEditMode ? (
                    <View style={{ position: "relative" }}>
                        <View
                            style={{
                                alignItems: "center",
                                borderBottomLeftRadius: 25,
                                borderBottomRightRadius: 25,
                                backgroundColor: "white",
                                gap: 5, paddingBottom: 15
                            }}>
                            <Avatar
                                size={120}
                                rounded
                                containerStyle={{ backgroundColor: primary, padding: 2 }}
                                source={{ uri: avatarUrl }}
                            />
                            <View style={{ flexDirection: "row", justifyContent: "center", marginTop: 5, gap: 15 }}>
                                <Text style={{ fontFamily: "Quicksand-700", fontSize: 25 }}>{firstName}</Text>
                                <Text style={{ fontFamily: "Quicksand-700", fontSize: 25 }}>{lastName}</Text>
                            </View>
                            <View style={{ alignItems: "center" }}>
                                <View style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
                                    <Icon type="font-awesome-5" name={gender === "male" ? "male" : "female"} />
                                    <Text style={{ opacity: 0.5, fontStyle: "italic" }}>{gender === "male" ? "Homme" : "Femme"}</Text>
                                </View>
                                <Text style={{ fontFamily: "Quicksand-600", fontSize: 20 }}>{pseudo}</Text>
                            </View>
                        </View>
                        <View>
                            <View style={{ marginVertical: 5, paddingHorizontal: 15 }}>

                                <View style={{ flexDirection: "row", justifyContent: "space-around", paddingVertical: 10 }}>
                                    <View style={{ alignItems: "center" }}>
                                        <Text style={{ color: "white", fontFamily: "Quicksand-700", fontSize: 25 }}>12</Text>
                                        <Text style={{
                                            color: "white", fontFamily: "Quicksand-600",
                                            textTransform: "uppercase", fontSize: 15, opacity: 0.8
                                        }}>Oeuvres</Text>
                                    </View>
                                    <View style={{ alignItems: "center" }}>
                                        <Text style={{ color: "white", fontFamily: "Quicksand-700", fontSize: 25 }}>0</Text>
                                        <Text style={{
                                            color: "white", fontFamily: "Quicksand-600",
                                            textTransform: "uppercase", fontSize: 15, opacity: 0.8
                                        }}>Followers</Text>
                                    </View>
                                    <View style={{ alignItems: "center" }}>
                                        <Text style={{ color: "white", fontFamily: "Quicksand-700", fontSize: 25 }}>0</Text>
                                        <Text style={{
                                            color: "white", fontFamily: "Quicksand-600",
                                            textTransform: "uppercase", fontSize: 15, opacity: 0.8
                                        }}>Follows</Text>
                                    </View>
                                </View>

                                <View>
                                    <Text style={{ marginVertical: 15, color: "white", textAlign: "center", fontFamily: "Quicksand-500" }}>BIO</Text>
                                    <View style={{ backgroundColor: "white", borderRadius: 5, padding: 15, }}>
                                        <Text style={{ textAlign: "left", fontFamily: "Quicksand-500" }}>{bio}</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>
                ) : (
                    <View style={{ flex: 1, justifyContent: "space-between", backgroundColor: "white", paddingHorizontal: 15 }}>
                        <View style={{ alignItems: "center", position: "relative" }}>
                            <Avatar
                                size={40}
                                rounded
                                onPress={() => pickImage()}
                                icon={{ name: "pencil", type: "font-awesome" }}
                                containerStyle={{ backgroundColor: greyOutline, position: "absolute", zIndex: 1, right: "25%" }}
                            />
                            <Avatar
                                size={120}
                                rounded
                                containerStyle={{ backgroundColor: primary, marginBottom: 10, padding: 5, }}
                                source={{ uri: imgUri || avatarUrl }}
                            />
                        </View>
                        <View>
                            <Formik
                                validationSchema={accountSchema}
                                onSubmit={async (values) => {
                                    let avatarImg = null;
                                    if (imgUri) {
                                        const result = await fetch(imgUri);
                                        avatarImg = await result.blob();
                                    }
                                    await call({ userId: session.userProfile.userId, profile: { ...values }, avatarImg });
                                }}
                                initialValues={{
                                    firstName,
                                    lastName,
                                    pseudo,
                                    bio,
                                }}
                            >
                                {({ errors, values, handleSubmit, handleChange }) => (
                                    <>
                                        <View>
                                            <TextInput errorMessage={errors.firstName} label="Nom de famille" onChangeText={handleChange("firstName")} value={values.firstName} />
                                            <TextInput errorMessage={errors.lastName} label="Prénom" onChangeText={handleChange("lastName")} value={values.lastName} />
                                            <TextInput errorMessage={errors.pseudo} label="Pseudo" onChangeText={handleChange("pseudo")} value={values.pseudo} />

                                            <TextInput errorMessage={errors.bio} multiline numberOfLines={5} label="Bio" onChangeText={handleChange("bio")} value={values.bio} />
                                            <Button loading={isLoading} onPress={handleSubmit}>Confirmer</Button>
                                        </View>
                                    </>

                                )}
                            </Formik>
                        </View>
                    </View>
                )
            }
        </View>
    )
}