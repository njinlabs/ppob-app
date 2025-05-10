import { colors } from "@/constants/Colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { StatusBar, TouchableOpacity, View } from "react-native";
import Text from "./Text";

export default function ActionBar({
  title,
  back,
  translucent,
}: {
  title?: string;
  back?: () => void;
  translucent?: boolean;
}) {
  return (
    <View
      style={[
        {
          paddingTop: StatusBar.currentHeight || 48,
        },
        translucent
          ? {
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
            }
          : { backgroundColor: colors.primary[500] },
      ]}
    >
      <View
        style={{
          height: 64,
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        {back && (
          <View
            style={{
              flex: 1,
              height: "100%",
              justifyContent: "center",
            }}
          >
            <TouchableOpacity
              style={{
                paddingLeft: 22,
                paddingRight: 16,
                height: "100%",
                justifyContent: "center",
              }}
              onPress={() => back()}
            >
              <MaterialCommunityIcons
                name="arrow-left"
                size={24}
                style={{ color: colors.white }}
              />
            </TouchableOpacity>
          </View>
        )}
        <View>
          <Text
            font="Nunito_800ExtraBold"
            size="large"
            style={{ color: colors.white, paddingHorizontal: 22 }}
          >
            {title}
          </Text>
        </View>
        <View style={{ flex: 1, height: "100%" }}></View>
      </View>
    </View>
  );
}
