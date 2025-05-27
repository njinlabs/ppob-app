import { colors } from "@/constants/Colors";
import { Octicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { View } from "react-native";
import { ViewProps } from "react-native-svg/lib/typescript/fabric/utils";

const sizing = {
  regular: 32,
  medium: 64,
  large: 120,
} as const;

type Props = {
  size?: keyof typeof sizing;
  url?: string | null;
};

export type AvatarProps = Props & Omit<ViewProps, keyof Props>;

export default function Avatar({
  style,
  url,
  size = "regular",
  ...props
}: AvatarProps) {
  return (
    <View
      {...props}
      style={[
        {
          width: sizing[size],
          height: sizing[size],
          borderRadius: sizing[size] / 2,
          backgroundColor: colors.white,
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowRadius: 4,
          shadowOpacity: 0.4,
          shadowColor: colors.primary[800],
          justifyContent: "center",
          alignItems: "center",
          elevation: 2,
        },
        style,
      ]}
    >
      {url ? (
        <Image
          source={{ uri: url }}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            borderRadius: sizing[size] / 2,
          }}
          transition={1000}
        />
      ) : (
        <Octicons
          name="person"
          size={Math.ceil(sizing[size] * 0.375)}
          color={colors.primary[700]}
        />
      )}
    </View>
  );
}
