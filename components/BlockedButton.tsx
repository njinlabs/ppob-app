import { colors } from "@/constants/Colors";
import { getFont } from "@/constants/Fonts";
import { forwardRef } from "react";
import {
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
} from "react-native";

type Props = {
  children?: string;
};

export type BlockedButtonProps = Props &
  Omit<TouchableOpacityProps, keyof Props>;

const BlockedButton = forwardRef<View, BlockedButtonProps>(
  ({ children, style, ...props }, ref) => {
    return (
      <TouchableOpacity
        {...props}
        ref={ref}
        style={[
          {
            height: 48,
            borderRadius: 12,
            backgroundColor: colors.primary[500],
            paddingHorizontal: 16,
            justifyContent: "center",
            alignItems: "center",
          },
          style,
        ]}
      >
        <Text
          style={{
            fontFamily: getFont("Nunito_700Bold"),
            color: colors.white,
            fontSize: 14,
          }}
        >
          {children}
        </Text>
      </TouchableOpacity>
    );
  }
);

export default BlockedButton;
