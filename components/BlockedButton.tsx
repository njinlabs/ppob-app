import { colors } from "@/constants/Colors";
import { forwardRef } from "react";
import { TouchableOpacity, TouchableOpacityProps, View } from "react-native";
import Text from "./Text";

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
          font="Nunito_700Bold"
          style={{
            color: colors.white,
          }}
        >
          {children}
        </Text>
      </TouchableOpacity>
    );
  }
);

export default BlockedButton;
