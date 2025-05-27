import { colors } from "@/constants/Colors";
import { FC, forwardRef, useEffect } from "react";
import {
  TextStyle,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
  ViewStyle,
} from "react-native";
import Animated, {
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from "react-native-reanimated";
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
  rightAccesorry?: FC;
  loading?: boolean;
  placeholderWidth?: number;
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
      loading,
      placeholderWidth = 86,
      rightAccesorry: RightAccessory,
      ...props
    },
    ref
  ) => {
    const opacity = useSharedValue<number>(0.3);

    useEffect(() => {
      if (loading) {
        opacity.value = withRepeat(
          withSequence(
            withTiming(0.1, {
              duration: 750,
            }),
            withTiming(0.3, {
              duration: 750,
            })
          ),
          -1
        );
      }
    }, [loading]);

    if (loading)
      return (
        <Animated.View
          style={[
            {
              width: placeholderWidth,
              flexDirection: "row",
              height: 36,
              alignItems: "center",
              justifyContent: "center",
              paddingHorizontal: 14,
              backgroundColor: colors.grayscale[800],
              opacity,
            },
            styles[appearance].wrapperStyle.base,
            style,
          ]}
        />
      );

    return (
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
          <View style={{ marginRight: children ? 6 : 0 }}>
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
        {RightAccessory && (
          <View style={{ marginLeft: children ? 6 : 0 }}>
            <RightAccessory />
          </View>
        )}
      </TouchableOpacity>
    );
  }
);

export default MiniButton;
