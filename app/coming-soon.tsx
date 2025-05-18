import Illustration from "@/assets/svgs/coming-soon";
import Text from "@/components/Text";
import { colors } from "@/constants/Colors";
import { Dimensions, View } from "react-native";

export default function ComingSoon() {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.white,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Illustration width={Dimensions.get("screen").width * 0.8} />
      <Text
        font="Nunito_800ExtraBold"
        size="extraLarge"
        style={{ marginTop: 16 }}
      >
        Coming Soon
      </Text>
      <Text>Menu atau fitur ini akan segera hadir.</Text>
    </View>
  );
}
