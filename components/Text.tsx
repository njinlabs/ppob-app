import { colors } from "@/constants/Colors";
import { fonts } from "@/constants/Fonts";
import { TextProps as Base, Text as Typo } from "react-native";

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
};

export type TextProps = Props & Omit<Base, keyof Props>;

export default function Text({
  children,
  font = "Roboto_400Regular",
  size = "regular",
  style,
  ...props
}: TextProps) {
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
