import Illustration from "@/assets/svgs/empty";
import { Dimensions, View } from "react-native";
import Text from "./Text";

export default function Empty({
  title,
  text,
}: {
  title?: string;
  text?: string;
}) {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Illustration width={Dimensions.get("screen").width * 0.6} />
      <Text
        font="Nunito_800ExtraBold"
        size="extraLarge"
        style={{ marginTop: 16 }}
      >
        {title}
      </Text>
      <Text>{text}</Text>
    </View>
  );
}
