import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { FAB, Icon } from "@rneui/base";
import { Avatar, useTheme } from "@rneui/themed";
import { Formik } from "formik";
import { useState } from "react";
import { View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import * as Yup from "yup";
import { updateUserProfile } from "../../api/auth";
import useCall from "../../api/useCall";
import { AccountView, Button, RadioInputGroup, TextInput } from "../../components";
import { config } from "../../config";
import { useImagePicker } from "../../hooks";
import { useSession } from "../../providers";
import { useWorkshop } from "../../providers/WorkshopProvider";
import { RootStackParamList } from "../../types";
import { UserProfile } from "../../types/auth";

const accountSchema = Yup.object().shape({
    firstName: Yup.string().required("Champ requis"),
    lastName: Yup.string().required("Champ requis"),
    username: Yup.string().required("Champ requis"),
    gender: Yup.string().required("Champ requis"),
    bio: Yup.string().optional(),
});

type AccountScreenProps = NativeStackScreenProps<RootStackParamList, 'Account'>;

export default function AccountScreen({ navigation, route: { params } }: AccountScreenProps) {
    const { theme: { colors: { black } } } = useTheme();
    const [isEditMode, setIsEditMode] = useState(false);
    const { workshopNovels } = useWorkshop();
    const { session, updateSession } = useSession();
    const { profile } = session;
    profile.creations = workshopNovels;
    const { username, firstName, lastName, bio, avatarUrl, gender } = profile;
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
                    <AccountView user={profile} />
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
                                source={(imgUri || avatarUrl) ? { uri: imgUri || avatarUrl } : null}
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