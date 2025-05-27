import { changePassword, ChangePasswordPayload } from "@/api/user";
import Dialog, { DialogRef } from "@/components/Dialog";
import MiniButton from "@/components/MiniButton";
import TextInput from "@/components/TextInput";
import { colors } from "@/constants/Colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useRouter } from "expo-router";
import { useEffect, useRef } from "react";
import { Controller, useForm } from "react-hook-form";
import { ActivityIndicator, ScrollView } from "react-native";

export default function ChangePassword() {
  const successDialogRef = useRef<DialogRef>(null);
  const errorDialogRef = useRef<DialogRef>(null);
  const navigation = useNavigation();
  const router = useRouter();
  const queryClient = useQueryClient();

  const changePasswordMutation = useMutation({
    mutationFn: changePassword,
    onSuccess: async () => {
      successDialogRef.current?.show();
    },
    onError: (e) => {
      if ((e as AxiosError).response?.status === 401) {
        errorDialogRef.current?.show();
      }
    },
  });

  const {
    control,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm<
    ChangePasswordPayload & {
      repeatNewPassword: string;
    }
  >({
    defaultValues: {
      password: "",
      newPassword: "",
    },
  });

  const onSave = handleSubmit(({ repeatNewPassword: _, ...data }) =>
    changePasswordMutation.mutate(data)
  );

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <MiniButton
          disabled={changePasswordMutation.isPending}
          style={{ backgroundColor: colors.primary[600], marginRight: -8 }}
          rightAccesorry={() =>
            changePasswordMutation.isPending ? (
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
          {changePasswordMutation.isPending ? "" : "Simpan"}
        </MiniButton>
      ),
    });
  }, [changePasswordMutation.isPending]);

  return (
    <>
      <ScrollView
        style={{ flex: 1, backgroundColor: colors.white }}
        contentContainerStyle={{ paddingHorizontal: 22, paddingVertical: 24 }}
      >
        <Controller
          control={control}
          name="password"
          rules={{
            required: "Tidak boleh kosong",
          }}
          render={({ field: { value, onChange } }) => (
            <TextInput
              label="Password"
              containerStyle={{ marginBottom: 16 }}
              value={value}
              onChangeText={onChange}
              error={errors.password?.message}
              secureTextEntry
            />
          )}
        />
        <Controller
          control={control}
          name="newPassword"
          rules={{
            required: "Tidak boleh kosong",
          }}
          render={({ field: { value, onChange } }) => (
            <TextInput
              label="Password"
              containerStyle={{ marginBottom: 16 }}
              value={value}
              onChangeText={onChange}
              error={errors.newPassword?.message}
              secureTextEntry
            />
          )}
        />
        <Controller
          control={control}
          name="repeatNewPassword"
          rules={{
            required: "Tidak boleh kosong",
            validate: (value) =>
              value === watch("newPassword") || "Ulangi password dengan benar",
          }}
          render={({ field: { value, onChange } }) => (
            <TextInput
              label="Ulangi Password"
              containerStyle={{ marginBottom: 16 }}
              value={value}
              onChangeText={onChange}
              error={errors.repeatNewPassword?.message}
              secureTextEntry
            />
          )}
        />
      </ScrollView>
      <Dialog
        ref={successDialogRef}
        title="Berhasil"
        text="Password kamu telah diperbaharui"
        icon="success"
        onClose={() => {
          queryClient
            .invalidateQueries({
              queryKey: ["user"],
            })
            .then(() => {
              router.dismissAll();
            });
        }}
      />
      <Dialog
        ref={errorDialogRef}
        title="Gagal"
        text="Password yang kamu masukkan tidak sesuai"
        icon="danger"
      />
    </>
  );
}
