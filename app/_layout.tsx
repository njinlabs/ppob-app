import { colors } from "@/constants/Colors";
import { fonts } from "@/constants/Fonts";
import { useAuth } from "@/stores/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useFonts } from "expo-font";
import { SplashScreen, Stack } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";
import "react-native-reanimated";

SplashScreen.preventAutoHideAsync();

const queryClient = new QueryClient();

export default function RootLayout() {
  const [loaded] = useFonts(fonts);
  const [mounted, setMounted] = useState(false);
  const token = useAuth((state) => state.token);
  const setToken = useAuth((state) => state.setToken);

  useEffect(() => {
    (async () => {
      const token = await AsyncStorage.getItem("token");
      if (token) setToken(token);
      setMounted(true);
    })();
  }, []);

  useEffect(() => {
    if (mounted) {
      setMounted(false);
      const timeout = setTimeout(() => {
        setMounted(true);
      }, 2000);

      return () => {
        clearTimeout(timeout);
      };
    }
  }, [token]);

  if (!loaded || !mounted) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: colors.white,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ActivityIndicator size="large" color={colors.primary[500]} />
      </View>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <Stack>
        <Stack.Protected guard={Boolean(token)}>
          <Stack.Screen name="(tabs)" />
        </Stack.Protected>
        <Stack.Screen
          name="auth"
          options={{
            title: "Auth",
            headerShown: false,
          }}
        />
      </Stack>
    </QueryClientProvider>
  );
}
