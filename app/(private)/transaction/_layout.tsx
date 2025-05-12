import ActionBar from "@/components/ActionBar";
import { Stack } from "expo-router";

export default function TransactionLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="confirmation"
        options={{
          title: "Konfirmasi Pembelian",
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
