import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { FAB, Icon } from "@rneui/base";
import { Avatar, useTheme } from "@rneui/themed";
import { Formik } from "formik";
import { useState } from "react";
import { Text, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import * as Yup from "yup";
import { updateUserProfile } from "../../api/auth";
import useCall from "../../api/useCall";
import { Button, RadioInputGroup, TextInput } from "../../components";
import { useImagePicker } from "../../hooks";
import { useSession } from "../../providers";
import { RootStackParamList } from "../../types";
import { UserProfile } from "../../types/auth";
import { config } from "../../config";
import { useWorkshop } from "../../providers/WorkshopProvider";

const accountSchema = Yup.object().shape({
    firstName: Yup.string().required("Champ requis"),
    lastName: Yup.string().required("Champ requis"),
    username: Yup.string().required("Champ requis"),
    gender: Yup.string().required("Champ requis"),
    bio: Yup.string().required("Champ requis"),
});

type AccountScreenProps = NativeStackScreenProps<RootStackParamList, 'Account'>;

export default function AccountScreen({ navigation, route: { params } }: AccountScreenProps) {
    const { theme: { colors: { greyOutline, black } } } = useTheme();
    const [isEditMode, setIsEditMode] = useState(false);
    const { workshopNovels } = useWorkshop();
    const { session, updateSession } = useSession();
    const { profile: { username, firstName, lastName, bio, avatarUrl, gender } } = session;
    const { call, isLoading } = useCall(updateUserProfile, {
        onSuccess(profile: UserProfile) {
            updateSession({ profile });
            toggleEditMode();
        },
    })
    const { imgUri, pickImage } = useImagePicker();
    const toggleEditMode = () => setIsEditMode(!isEditMode);

    return (
        <View style={{ flex: 1, backgroundColor: black, justifyContent: "space-between" }}>
            {
                !isEditMode && (
                    <FAB style={{ zIndex: 2 }} color={black} onPress={toggleEditMode} placement="right" >
                        <Icon name="pen" type="font-awesome-5" color="white" />
                    </FAB>
                )
            }
            {
                !isEditMode ? (
                    <View style={{ position: "relative", flex: 1 }}>
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
                                containerStyle={{ backgroundColor: greyOutline, padding: 2 }}
                                source={{ uri: avatarUrl }}
                            />
                            <View style={{ flexDirection: "row", justifyContent: "center", marginTop: 5, gap: 15 }}>
                                <Text style={{ fontFamily: "Quicksand-700", fontSize: 25 }}>{firstName}</Text>
                                <Text style={{ fontFamily: "Quicksand-700", fontSize: 25 }}>{lastName}</Text>
                                <View style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
                                    <Icon type="font-awesome-5" name={gender === "MALE" ? "male" : "female"} />
                                    <Text style={{ opacity: 0.5, fontStyle: "italic" }}>{gender === "MALE" ? "Homme" : "Femme"}</Text>
                                </View>
                            </View>
                            <View style={{ alignItems: "center" }}>
                                <Text style={{ fontFamily: "Quicksand-500", fontSize: 14 }}>{username}</Text>
                            </View>
                        </View>
                        <View style={{ flex: 1 }}>
                            <View style={{ flex: 0.3, marginVertical: 5, paddingHorizontal: 15 }}>
                                <View style={{ flexDirection: "row", justifyContent: "space-around", paddingVertical: 10 }}>
                                    <View style={{ alignItems: "center" }}>
                                        <Text style={{ color: "white", fontFamily: "Quicksand-700", fontSize: 25 }}>{workshopNovels?.length || 0}</Text>
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


                            </View>
                            <View style={{ flex: 0.7, backgroundColor: "white", paddingHorizontal: 15 }}>
                                <Text style={{ marginVertical: 15, textAlign: "center", fontFamily: "Quicksand-500" }}>BIO</Text>
                                <Text style={{ textAlign: "left", fontFamily: "Quicksand-500" }}>{bio}</Text>
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
                                containerStyle={{ backgroundColor: black, position: "absolute", zIndex: 1, right: "30%" }}
                            />
                            <Avatar
                                size={120}
                                rounded
                                containerStyle={{ backgroundColor: black, marginBottom: 10, padding: 2, }}
                                source={{ uri: imgUri || avatarUrl }}
                            />
                        </View>
                        <KeyboardAwareScrollView>
                            <Formik
                                validationSchema={accountSchema}
                                onSubmit={async (values) => {
                                    let avatarImg = null;
                                    if (imgUri) {
                                        const result = await fetch(imgUri);
                                        avatarImg = await result.blob();
                                    }
                                    call({ profile: values, avatarImg });
                                }}
                                initialValues={{
                                    firstName,
                                    lastName,
                                    username,
                                    bio,
                                    gender,
                                }}
                            >
                                {({ errors, values, handleSubmit, handleChange }) => (
                                    <>
                                        <View>
                                            <RadioInputGroup
                                                errorMessage={errors.gender}
                                                value={values.gender}
                                                label="Votre genre"
                                                name="gender"
                                                options={config.genderOptions}
                                                onChange={(gender) => handleChange("gender")(gender)}
                                            />
                                            <TextInput errorMessage={errors.firstName} label="Nom de famille" onChangeText={handleChange("firstName")} value={values.firstName} />
                                            <TextInput errorMessage={errors.lastName} label="Prénom" onChangeText={handleChange("lastName")} value={values.lastName} />
                                            <TextInput errorMessage={errors.username} label="Nom d'utilisateur" onChangeText={handleChange("username")} value={values.username} />

                                            <TextInput errorMessage={errors.bio} multiline numberOfLines={5} label="Bio" onChangeText={handleChange("bio")} value={values.bio} />
                                            <Button loading={isLoading} onPress={handleSubmit}>Confirmer</Button>
                                        </View>
                                    </>

                                )}
                            </Formik>
                        </KeyboardAwareScrollView>
                    </View>
                )
            }
        </View>
    )
}