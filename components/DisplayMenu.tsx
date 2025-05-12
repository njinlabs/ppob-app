import { FC, forwardRef } from "react";
import {
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
} from "react-native";
import Text from "./Text";

type Props = {
  icon: FC;
  title: string;
  color?: string;
};

export type DisplayMenuProps = Props & Omit<TouchableOpacityProps, keyof Props>;

const DisplayMenu = forwardRef<View, DisplayMenuProps>(
  ({ title, icon: Icon, style, color: backgroundColor, ...props }, ref) => (
    <TouchableOpacity
      {...props}
      style={[styles.itemContainer, style]}
      ref={ref}
    >
      <View style={[{ backgroundColor }, styles.item]}>
        <Icon />
        <View
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            borderWidth: 1,
            borderRadius: 58 / 2,
            opacity: 0.1,
          }}
        ></View>
      </View>
      <Text size="small" style={{ marginTop: 8 }}>
        {title}
      </Text>
    </TouchableOpacity>
  )
);

const styles = StyleSheet.create({
  itemContainer: {
    width: (Dimensions.get("screen").width - 44) / 4,
    alignItems: "center",
  },
  item: {
    width: 58,
    height: 58,
    borderRadius: 64 / 2,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
});

export default DisplayMenu;
