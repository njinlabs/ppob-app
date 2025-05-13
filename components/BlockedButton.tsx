import { colors } from "@/constants/Colors";
import { forwardRef } from "react";
import {
  ActivityIndicator,
  TextStyle,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
  ViewStyle,
} from "react-native";
import Text from "./Text";

const coloring: Record<
  "primary" | "gray",
  {
    wrapperStyle: ViewStyle;
    textStyle: TextStyle;
  }
> = {
  primary: {
    wrapperStyle: {
      backgroundColor: colors.primary[500],
    },
    textStyle: {
      color: colors.white,
    },
  },
  gray: {
    wrapperStyle: {
      backgroundColor: colors.grayscale[200],
    },
    textStyle: {
      color: colors.grayscale[800],
    },
  },
} as const;

type Props = {
  children?: string;
  color?: keyof typeof coloring;
  loading?: boolean;
};

export type BlockedButtonProps = Props &
  Omit<TouchableOpacityProps, keyof Props>;

const BlockedButton = forwardRef<View, BlockedButtonProps>(
  (
    { children, style, loading, disabled, color = "primary", ...props },
    ref
  ) => {
    return (
      <TouchableOpacity
        {...props}
        ref={ref}
        style={[
          {
            height: 48,
            borderRadius: 12,
            paddingHorizontal: 16,
            justifyContent: "center",
            alignItems: "center",
          },
          coloring[color].wrapperStyle,
          style,
        ]}
        disabled={loading || disabled}
      >
        {loading ? (
          <ActivityIndicator
            size="small"
            color={coloring[color].textStyle.color || "#FFF"}
          />
        ) : (
          <Text font="Nunito_800ExtraBold" style={coloring[color].textStyle}>
            {children}
          </Text>
        )}
      </TouchableOpacity>
    );
  }
);

export default BlockedButton;
