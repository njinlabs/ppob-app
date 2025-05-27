import { updateProfile, UpdateProfilePayload } from "@/api/user";
import Avatar from "@/components/Avatar";
import Dialog, { DialogRef } from "@/components/Dialog";
import MiniButton from "@/components/MiniButton";
import Text from "@/components/Text";
import TextInput from "@/components/TextInput";
import { colors } from "@/constants/Colors";
import { useAuth } from "@/stores/auth";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";
import { useEffect, useRef } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  ActivityIndicator,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  View,
} from "react-native";

export default function EditProfile() {
  const successDialogRef = useRef<DialogRef>(null);
  const user = useAuth((state) => state.user);
  const navigation = useNavigation();
  const router = useRouter();
  const queryClient = useQueryClient();

  const updateProfileMutation = useMutation({
    mutationFn: updateProfile,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["user"],
      });

      successDialogRef.current?.show();
    },
  });

  const {
    setValue,
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<UpdateProfilePayload>({
    defaultValues: {
      fullname: user?.fullname,
      avatar: user?.avatar?.url,
      email: user?.email,
      phone: user?.phone.replace(/^62/, ""),
    },
  });

  const onSave = handleSubmit((data) => {
    data.phone = `62${data.phone}`;
    updateProfileMutation.mutate(data);
  });

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.2,
      allowsMultipleSelection: false,
    });

    if (!result.canceled) {
      setValue("avatar", result.assets[0]);
    }
  };

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <MiniButton
          disabled={updateProfileMutation.isPending}
          style={{ backgroundColor: colors.primary[600], marginRight: -8 }}
          rightAccesorry={() =>
            updateProfileMutation.isPending ? (
              <ActivityIndicator size="small" color={colors.white} />
            ) : (
              <MaterialCommunityIcons
                name="send"
                color={colors.white}
                size={16}
              />
            )
          }
          onPress={onSave}
        >
          {updateProfileMutation.isPending ? "" : "Simpan"}
        </MiniButton>
      ),
    });
  }, [updateProfileMutation.isPending]);

  return (
    <>
      <ScrollView style={{ flex: 1, backgroundColor: colors.white }}>
        <View
          style={{ alignItems: "center", paddingTop: 24, position: "relative" }}
        >
          <View
            style={{
              height: Dimensions.get("screen").height,
              position: "absolute",
              bottom: "50%",
              left: 0,
              right: 0,
              backgroundColor: colors.primary[500],
            }}
          />
          <View
            style={{
              position: "relative",
            }}
          >
            <Controller
              control={control}
              name="avatar"
              render={({ field: { value } }) => (
                <Avatar
                  size="large"
                  url={
                    value
                      ? typeof value === "object"
                        ? value?.uri
                        : value
                      : null
                  }
                />
              )}
            />
            <TouchableOpacity
              onPress={() => pickImage()}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                borderRadius: 120 / 2,
                overflow: "hidden",
                justifyContent: "flex-end",
              }}
            >
              <View
                style={{
                  backgroundColor: colors.grayscale[900],
                  opacity: 0.5,
                  padding: 8,
                  paddingBottom: 16,
                }}
              >
                <Text style={{ color: colors.white, textAlign: "center" }}>
                  GANTI
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{ padding: 22, paddingTop: 36 }}>
          <Controller
            control={control}
            name="fullname"
            rules={{
              required: "Tidak boleh kosong",
            }}
            render={({ field: { value, onChange } }) => (
              <TextInput
                readOnly={updateProfileMutation.isPending}
                label="Nama Lengkap"
                containerStyle={{ marginBottom: 16 }}
                value={value}
                onChangeText={onChange}
                error={errors.fullname?.message}
              />
            )}
          />
          <Controller
            control={control}
            name="email"
            rules={{
              required: "Tidak boleh kosong",
            }}
            render={({ field: { value, onChange } }) => (
              <TextInput
                readOnly={updateProfileMutation.isPending}
                label="Email"
                containerStyle={{ marginBottom: 16 }}
                value={value}
                onChangeText={onChange}
                error={errors.email?.message}
                keyboardType="email-address"
              />
            )}
          />
          <Controller
            control={control}
            name="phone"
            rules={{
              required: "Tidak boleh kosong",
            }}
            render={({ field: { value, onChange } }) => (
              <TextInput
                readOnly={updateProfileMutation.isPending}
                keyboardType="phone-pad"
                leftAccessory={() => <Text>+62</Text>}
                label="No. HP"
                containerStyle={{ marginBottom: 16 }}
                value={value}
                onChangeText={(text) => onChange(text.replace(/^(62|0)/, ""))}
                error={errors.phone?.message}
              />
            )}
          />
        </View>
      </ScrollView>
      <Dialog
        ref={successDialogRef}
        title="Berhasil"
        text="Profile kamu telah diperbaharui"
        icon="success"
        onClose={() => {
          router.dismissAll();
        }}
      />
    </>
  );
}
