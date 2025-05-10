import Logo from "@/assets/svgs/logo";
import { colors } from "@/constants/Colors";
import { Link } from "expo-router";
import { useMemo } from "react";
import { Dimensions, SafeAreaView, View } from "react-native";

export default function Home() {
  const width = useMemo(() => Dimensions.get("screen").width, []);

  return (
    <SafeAreaView>
      <View
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          backgroundColor: colors.primary[500],
          height: 290,
        }}
      />
      <View style={{ padding: 24 }}>
        <Logo width={0.3 * width} />
      </View>
      <Link href="/transaction/pulsa-and-data">Pulsa</Link>
    </SafeAreaView>
  );
}
