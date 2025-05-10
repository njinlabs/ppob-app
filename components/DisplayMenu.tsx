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
    width: 64,
    height: 64,
    borderRadius: 64 / 2,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default DisplayMenu;
