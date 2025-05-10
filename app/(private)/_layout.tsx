import { checkToken } from "@/api/auth";
import { client } from "@/api/client";
import { useAuth } from "@/stores/auth";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { Stack } from "expo-router";
import { useEffect } from "react";

export default function Private() {
  const token = useAuth((state) => state.token);
  const setUser = useAuth((state) => state.setUser);
  const revoke = useAuth((state) => state.revoke);

  const userQuery = useQuery({
    queryKey: ["user"],
    queryFn: () => checkToken(token!),
  });

  useEffect(() => {
    if (userQuery.data) {
      setUser(userQuery.data.data);
      client.defaults.headers.common.Authorization = `Bearer ${token}`;
    }
  }, [userQuery.data]);

  useEffect(() => {
    if (userQuery.error) {
      if ((userQuery.error as AxiosError).response?.status === 401) {
        revoke();
      }
    }
  }, [userQuery.error]);

  useEffect(() => {
    if (!token) {
      client.defaults.headers.common.Authorization = undefined;
    }
  }, [token]);

  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="transaction" options={{ headerShown: false }} />
    </Stack>
  );
}
