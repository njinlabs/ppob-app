import { colors } from "@/constants/Colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { FC } from "react";
import { StatusBar, TouchableOpacity, View } from "react-native";
import Text from "./Text";

export default function ActionBar({
  title,
  back,
  translucent,
  buttons: Buttons,
}: {
  title?: string;
  back?: () => void;
  translucent?: boolean;
  buttons?: FC;
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
        <View
          style={{
            width: "20%",
            height: "100%",
            justifyContent: "center",
          }}
        >
          {back && (
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
          )}
        </View>
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Text
            font="Nunito_800ExtraBold"
            size="large"
            style={{ color: colors.white, paddingHorizontal: 22 }}
          >
            {title}
          </Text>
        </View>
        <View
          style={{
            width: "20%",
            height: "100%",
            justifyContent: "flex-end",
            alignItems: "center",
            paddingRight: 22,
            gap: 8,
            flexDirection: "row",
          }}
        >
          {Buttons && <Buttons />}
        </View>
      </View>
    </View>
  );
}
