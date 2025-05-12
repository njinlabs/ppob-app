import { colors } from "@/constants/Colors";
import { fonts } from "@/constants/Fonts";
import { useEffect } from "react";
import {
  TextProps as Base,
  Dimensions,
  Text as Typo,
  View,
  ViewStyle,
} from "react-native";
import Animated, {
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from "react-native-reanimated";

export const sizing = {
  extraSmall: 10,
  small: 12,
  regular: 14,
  medium: 16,
  large: 18,
  extraLarge: 20,
};

type Props = {
  font?: keyof typeof fonts;
  size?: keyof typeof sizing;
  loading?: boolean;
  placeholderWidth?: number;
  placeholderColumn?: number;
};

export type TextProps = Props & Omit<Base, keyof Props>;

export default function Text({
  children,
  font = "Roboto_400Regular",
  size = "regular",
  style,
  loading,
  placeholderWidth = Dimensions.get("screen").width / 2,
  placeholderColumn = 1,
  ...props
}: TextProps) {
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
      <View style={style as ViewStyle}>
        {Array(placeholderColumn)
          .fill(null)
          .map((_, index) => (
            <Animated.View
              key={index}
              style={[
                {
                  height: sizing[size] + 2,
                  backgroundColor: colors.grayscale[800],
                  opacity,
                  width:
                    index === placeholderColumn - 1 && index > 0
                      ? placeholderWidth / 2
                      : placeholderWidth,
                  borderRadius: 4,
                  marginVertical: 2,
                },
              ]}
            />
          ))}
      </View>
    );

  return (
    <Typo
      {...props}
      style={[
        {
          fontFamily: font,
          fontSize: sizing[size],
          color: colors.grayscale[800],
        },
        style,
      ]}
    >
      {children}
    </Typo>
  );
}
