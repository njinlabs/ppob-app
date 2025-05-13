import { register, RegisterPayload } from "@/api/auth";
import BlockedButton from "@/components/BlockedButton";
import Text from "@/components/Text";
import TextInput from "@/components/TextInput";
import { colors } from "@/constants/Colors";
import { useAuth } from "@/stores/auth";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import { useMemo } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  View,
} from "react-native";

export default function Register() {
  const setToken = useAuth((state) => state.setToken);
  const router = useRouter();
  const height = useMemo(() => Dimensions.get("window").height, []);

  const registerMutation = useMutation({
    mutationFn: register,
    onSuccess: ({ data }) => {
      setToken(data.token, true);
      router.replace("/(private)/(tabs)");
    },
  });

  const {
    control,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm<RegisterPayload & { repeatPassword: string }>({
    defaultValues: {
      fullname: "",
      email: "",
      phone: "",
      password: "",
      repeatPassword: "",
      referredBy: "",
    },
  });

  const onSubmit = handleSubmit(
    ({ repeatPassword: _repeatPassword, referredBy, phone, ...data }) =>
      registerMutation.mutate({
        ...data,
        phone: `62${phone}`,
        referredBy: referredBy || undefined,
      })
  );

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <ScrollView style={{ flex: 1, backgroundColor: colors.white }}>
        <View
          style={{
            padding: 24,
            paddingTop: 16,
            position: "relative",
          }}
        >
          <View
            style={{
              height,
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              backgroundColor: colors.primary[500],
            }}
          />
          <Text
            font="Nunito_800ExtraBold"
            size="extraLarge"
            style={{
              color: colors.white,
            }}
          >
            Buat Akun
          </Text>
          <Text
            style={{
              color: colors.grayscale[100],
              marginTop: 8,
            }}
          >
            Silahkan isi data dibawah ini untuk membuat akun
          </Text>
        </View>
        <View style={{ padding: 24 }}>
          <Controller
            control={control}
            name="fullname"
            rules={{
              required: "Tidak boleh kosong",
            }}
            render={({ field: { value, onChange } }) => (
              <TextInput
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
            name="repeatPassword"
            rules={{
              required: "Tidak boleh kosong",
              validate: (value) =>
                value === watch("password") || "Ulangi password dengan benar",
            }}
            render={({ field: { value, onChange } }) => (
              <TextInput
                label="Ulangi Password"
                containerStyle={{ marginBottom: 16 }}
                value={value}
                onChangeText={onChange}
                error={errors.repeatPassword?.message}
                secureTextEntry
              />
            )}
          />
          <Controller
            control={control}
            name="referredBy"
            render={({ field: { value, onChange } }) => (
              <TextInput
                label="Kode Referral (opsional)"
                containerStyle={{ marginBottom: 32 }}
                value={value}
                onChangeText={onChange}
                autoCapitalize="characters"
                error={errors.referredBy?.message}
              />
            )}
          />
        </View>
      </ScrollView>
      <View style={{ padding: 24, backgroundColor: colors.white }}>
        <BlockedButton loading={registerMutation.isPending} onPress={onSubmit}>
          DAFTAR
        </BlockedButton>
      </View>
    </KeyboardAvoidingView>
  );
}
