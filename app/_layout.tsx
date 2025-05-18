import ActionBar from "@/components/ActionBar";
import { fonts } from "@/constants/Fonts";
import { useAuth } from "@/stores/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useFonts } from "expo-font";
import { SplashScreen, Stack } from "expo-router";
import moment from "moment";
import "moment/locale/id";
import { useEffect, useState } from "react";
import "react-native-reanimated";

moment.locale("id");
SplashScreen.preventAutoHideAsync();

const queryClient = new QueryClient();

export default function RootLayout() {
  const [loaded] = useFonts(fonts);
  const [mounted, setMounted] = useState(false);
  const token = useAuth((state) => state.token);
  const setToken = useAuth((state) => state.setToken);

  useEffect(() => {
    if (mounted) return;
    if (token) setMounted(true);

    (async () => {
      const token = await AsyncStorage.getItem("token");
      if (token) setToken(token);
      setMounted(true);
    })();
  }, [mounted]);

  useEffect(() => {
    if (mounted) SplashScreen.hideAsync();
  }, [mounted]);

  useEffect(() => {
    if (mounted) {
      setMounted(false);
    }
  }, [token]);

  if (!loaded || !mounted) {
    return null;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <Stack>
        <Stack.Protected guard={Boolean(token)}>
          <Stack.Screen name="(private)" options={{ headerShown: false }} />
        </Stack.Protected>
        <Stack.Screen
          name="auth"
          options={{
            title: "Auth",
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="coming-soon"
          options={{
            title: "Tunggu Dulu Ya!",
            header: ({ navigation, options }) => (
              <ActionBar
                title={options.title}
                back={navigation.canGoBack() ? navigation.goBack : undefined}
              />
            ),
          }}
        />
      </Stack>
    </QueryClientProvider>
  );
}
