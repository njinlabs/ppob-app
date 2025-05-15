import ActionBar from "@/components/ActionBar";
import { Stack } from "expo-router";

export default function MembershipLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: "Membership",
          header: ({ navigation, options }) => (
            <ActionBar
              title={options.title}
              back={navigation.canGoBack() ? navigation.goBack : undefined}
            />
          ),
        }}
      />
    </Stack>
  );
}
