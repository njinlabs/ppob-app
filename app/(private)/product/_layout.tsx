import ActionBar from "@/components/ActionBar";
import { Stack } from "expo-router";

export default function ProductLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="pulsa-and-data"
        options={{
          title: "Pulsa & Paket Data",
          header: ({ navigation, options }) => (
            <ActionBar
              title={options.title}
              back={navigation.canGoBack() ? navigation.goBack : undefined}
            />
          ),
        }}
      />
      <Stack.Screen
        name="generic"
        options={{
          header: ({ navigation, options }) => (
            <ActionBar
              title={options.title}
              back={navigation.canGoBack() ? navigation.goBack : undefined}
            />
          ),
        }}
      />
      <Stack.Screen
        name="generic-purchase"
        options={{
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
