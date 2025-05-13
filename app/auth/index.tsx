import { login, LoginPayload } from "@/api/auth";
import Logo from "@/assets/svgs/logo";
import WelcomeIllustration from "@/assets/svgs/welcome-illustration";
import BlockedButton from "@/components/BlockedButton";
import Dialog, { DialogRef } from "@/components/Dialog";
import Text from "@/components/Text";
import TextInput from "@/components/TextInput";
import { colors } from "@/constants/Colors";
import { getFont } from "@/constants/Fonts";
import { useAuth } from "@/stores/auth";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { Link } from "expo-router";
import { useMemo, useRef } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  View,
} from "react-native";

export default function WelcomeScreen() {
  const dialogRef = useRef<DialogRef>(null);
  const setToken = useAuth((state) => state.setToken);

  const loginMutation = useMutation({
    mutationFn: login,
    onSuccess: ({ data }) => setToken(data.token, true),
    onError: (e) => {
      if ((e as AxiosError).response?.status === 401) {
        dialogRef.current?.show();
      }
    },
  });
  const { control, handleSubmit } = useForm<LoginPayload>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const width = useMemo(() => Dimensions.get("window").width, []);
  const height = useMemo(() => Dimensions.get("window").height, []);

  const onSubmit = handleSubmit(({ email, ...data }) =>
    loginMutation.mutate({ ...data, email: email.replace(/^0/, "62") })
  );

  return (
    <>
      <View style={{ flex: 1, backgroundColor: colors.white }}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={{
            backgroundColor: colors.white,
            flex: 1,
            justifyContent: "flex-end",
          }}
        >
          <View
            style={{
              height: 409,
              backgroundColor: colors.primary[600],
              justifyContent: "flex-end",
              position: "absolute",
              top: 0,
              right: 0,
              left: 0,
            }}
          >
            <View
              style={{
                paddingTop: (StatusBar.currentHeight || 56) + 32,
                paddingBottom: 32,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Logo width={0.5 * width} />
            </View>
            <View
              style={{
                backgroundColor: colors.primary[500],
                justifyContent: "flex-end",
                alignItems: "center",
                borderTopLeftRadius: width / 2,
                borderTopRightRadius: width / 2,
                flex: 1,
              }}
            >
              <WelcomeIllustration width={0.6 * width} />
            </View>
          </View>
          <View
            style={{
              height: height - 409 - 112,
              backgroundColor: colors.white,
              padding: 24,
              paddingTop: 32,
            }}
          >
            <Controller
              control={control}
              name="email"
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <TextInput
                  placeholder="Email / No. HP"
                  value={value}
                  onChangeText={onChange}
                  leftAccessory={() => (
                    <MaterialCommunityIcons
                      name="email-outline"
                      size={20}
                      color={colors.grayscale[700]}
                    />
                  )}
                  containerStyle={{ marginBottom: 16 }}
                />
              )}
            />
            <Controller
              control={control}
              name="password"
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <TextInput
                  secureTextEntry
                  placeholder="Password"
                  value={value}
                  onChangeText={onChange}
                  leftAccessory={() => (
                    <MaterialCommunityIcons
                      name="lock-outline"
                      size={20}
                      color={colors.grayscale[700]}
                    />
                  )}
                  containerStyle={{ marginBottom: 32 }}
                />
              )}
            />
            <BlockedButton onPress={onSubmit} loading={loginMutation.isPending}>
              MASUK
            </BlockedButton>
          </View>
        </KeyboardAvoidingView>
        <View
          style={{
            height: 112,
            padding: 24,
            paddingBottom: 40,
            paddingTop: 0,
            justifyContent: "flex-end",
          }}
        >
          <Text style={{ textAlign: "center" }}>
            Belum punya akun?{" "}
            <Link
              href="/auth/register"
              style={{
                color: colors.primary[600],
                fontFamily: getFont("Roboto_500Medium"),
              }}
            >
              Daftar
            </Link>
          </Text>
        </View>
      </View>
      <Dialog
        ref={dialogRef}
        title="Gagal"
        icon="danger"
        text="Email atau password kamu salah"
      />
    </>
  );
}
