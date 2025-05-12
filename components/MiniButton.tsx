import { colors } from "@/constants/Colors";
import { FC, forwardRef } from "react";
import {
  TextStyle,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
  ViewStyle,
} from "react-native";
import Text from "./Text";

const coloring = ["primary"] as const;
const appearance = ["rounded", "rounded-outlined"] as const;

const styles: Record<
  (typeof appearance)[number],
  {
    wrapperStyle: {
      base: ViewStyle;
      coloring: Record<(typeof coloring)[number], ViewStyle>;
    };
    textStyle: {
      base: TextStyle;
      coloring: Record<(typeof coloring)[number], TextStyle>;
    };
  }
> = {
  rounded: {
    wrapperStyle: {
      base: {
        borderRadius: 36 / 2,
      },
      coloring: {
        primary: {
          backgroundColor: colors.primary[500],
        },
      },
    },
    textStyle: {
      base: {},
      coloring: {
        primary: {
          color: colors.white,
        },
      },
    },
  },
  "rounded-outlined": {
    wrapperStyle: {
      base: {
        borderRadius: 36 / 2,
        borderWidth: 1,
      },
      coloring: {
        primary: {
          borderColor: colors.primary[500],
        },
      },
    },
    textStyle: {
      base: {},
      coloring: {
        primary: {
          color: colors.primary[500],
        },
      },
    },
  },
};

type Props = {
  children?: string;
  appearance?: (typeof appearance)[number];
  color?: (typeof coloring)[number];
  leftAccesorry?: FC;
};

export type MiniButtonProps = Props & Omit<TouchableOpacityProps, keyof Props>;

const MiniButton = forwardRef<View, MiniButtonProps>(
  (
    {
      leftAccesorry: LeftAccessory,
      children,
      color = "primary",
      appearance = "rounded",
      style,
      ...props
    },
    ref
  ) => (
    <TouchableOpacity
      {...props}
      style={[
        {
          flexDirection: "row",
          height: 36,
          alignItems: "center",
          justifyContent: "center",
          paddingHorizontal: 14,
        },
        styles[appearance].wrapperStyle.base,
        styles[appearance].wrapperStyle.coloring[color],
        style,
      ]}
      ref={ref}
    >
      {LeftAccessory && (
        <View style={{ marginRight: 6 }}>
          <LeftAccessory />
        </View>
      )}
      <Text
        font="Nunito_600SemiBold"
        size="small"
        style={styles[appearance].textStyle.coloring[color]}
      >
        {children}
      </Text>
    </TouchableOpacity>
  )
);

export default MiniButton;
