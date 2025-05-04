import { SplashScreen, Tabs } from "expo-router";
import { useEffect } from "react";

export default function TabLayout() {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <Tabs>
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
        }}
      />
    </Tabs>
  );
}
