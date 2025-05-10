import { colors } from "@/constants/Colors";
import { useMemo } from "react";
import { Dimensions, StatusBar, View, ViewProps } from "react-native";

export default function CustomActionBar({
  style,
  children,
  ...props
}: ViewProps) {
  const height = useMemo(() => Dimensions.get("screen").height, []);
  return (
    <View
      style={[
        {
          paddingTop: StatusBar.currentHeight || 48,
          position: "relative",
          overflow: "visible",
        },
      ]}
      {...props}
    >
      <View
        style={{
          height,
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          backgroundColor: colors.primary[500],
        }}
      />
      <View style={style}>{children}</View>
    </View>
  );
}
