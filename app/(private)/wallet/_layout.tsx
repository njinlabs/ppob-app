import ActionBar from "@/components/ActionBar";
import { Stack } from "expo-router";

export default function WalletLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: "Mutasi Saldo",
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
