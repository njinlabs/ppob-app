import ActionBar from "@/components/ActionBar";
import { Stack } from "expo-router";

export default function SettingLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="edit-profile"
        options={{
          title: "Edit Profile",
          header: ({ navigation, options }) => (
            <ActionBar
              title={options.title}
              back={navigation.canGoBack() ? navigation.goBack : undefined}
              buttons={options.headerRight}
            />
          ),
        }}
      />
      <Stack.Screen
        name="change-password"
        options={{
          title: "Ganti Password",
          header: ({ navigation, options }) => (
            <ActionBar
              title={options.title}
              back={navigation.canGoBack() ? navigation.goBack : undefined}
              buttons={options.headerRight}
            />
          ),
        }}
      />
    </Stack>
  );
}
