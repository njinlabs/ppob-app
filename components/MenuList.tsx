import { colors } from "@/constants/Colors";
import { FC, forwardRef } from "react";
import { TouchableOpacity, TouchableOpacityProps, View } from "react-native";
import Text from "./Text";

type Props = {
  children?: string;
  leftAccessory?: FC;
  rightAccessory?: FC;
  divider?: boolean;
  loading?: boolean;
};

export type MenuListProps = Props & Omit<TouchableOpacityProps, keyof Props>;

const MenuList = forwardRef<View, MenuListProps>(
  (
    {
      children,
      leftAccessory: LeftAccessory,
      rightAccessory: RightAccessory,
      style,
      divider,
      loading,
      ...props
    },
    ref
  ) => (
    <TouchableOpacity
      {...props}
      style={[
        {
          borderBottomWidth: divider ? 1 : 0,
          borderColor: colors.grayscale[100],
          padding: 16,
          flexDirection: "row",
          alignItems: "center",
        },
        style,
      ]}
      ref={ref}
    >
      {LeftAccessory && (
        <View
          style={{
            marginRight: 16,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <LeftAccessory />
        </View>
      )}

      <Text style={{ flex: 1 }} loading={loading}>
        {children}
      </Text>

      {RightAccessory && (
        <View
          style={{
            marginLeft: 16,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <RightAccessory />
        </View>
      )}
    </TouchableOpacity>
  )
);

export default MenuList;
