import Account from "@/assets/svgs/icons/account";
import Home from "@/assets/svgs/icons/home";
import Inbox from "@/assets/svgs/icons/inbox";
import Receipt from "@/assets/svgs/icons/receipt";
import ActionBar from "@/components/ActionBar";
import { colors } from "@/constants/Colors";
import { getFont } from "@/constants/Fonts";
import { Tabs } from "expo-router";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarStyle: {
          backgroundColor: colors.white,
          height: 86,
          paddingTop: 6,
        },
        tabBarInactiveTintColor: colors.grayscale[400],
        tabBarActiveTintColor: colors.primary[500],
        tabBarLabelStyle: {
          fontFamily: getFont("Nunito_400Regular"),
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          headerShown: false,
          tabBarIcon: ({ color }) => <Home size={20} fill={color} />,
        }}
      />
      <Tabs.Screen
        name="history"
        options={{
          header: ({ options }) => <ActionBar title={options.title} />,
          title: "Riwayat Pembelian",
          tabBarLabel: "History",
          tabBarIcon: ({ color }) => <Receipt size={20} fill={color} />,
        }}
      />
      <Tabs.Screen
        name="notification"
        options={{
          header: ({ options }) => <ActionBar title={options.title} />,
          title: "Notifikasi",
          tabBarIcon: ({ color }) => <Inbox size={20} fill={color} />,
        }}
      />
      <Tabs.Screen
        name="account"
        options={{
          title: "Akun",
          headerShown: false,
          tabBarIcon: ({ color }) => <Account size={20} fill={color} />,
        }}
      />
    </Tabs>
  );
}
