import { colors } from "@/constants/Colors";
import { getFont } from "@/constants/Fonts";
import { FC } from "react";
import {
  TextInputProps as BaseProps,
  TextInput as Input,
  View,
  ViewStyle,
} from "react-native";
import Text, { sizing } from "./Text";

type Props = {
  leftAccessory?: FC;
  rightAccesorry?: FC;
  containerStyle?: ViewStyle;
  label?: string;
  error?: string;
};

export type TextInputProps = Props & Omit<BaseProps, keyof Props>;

export default function TextInput({
  leftAccessory: Left,
  rightAccesorry: Right,
  containerStyle,
  label,
  error,
  ...props
}: TextInputProps) {
  return (
    <View style={containerStyle}>
      {label && (
        <Text style={{ marginHorizontal: 2, marginBottom: 4 }}>{label}</Text>
      )}
      <View
        style={[
          {
            height: 48,
            borderWidth: 1,
            borderRadius: 12,
            borderColor: error ? colors.danger[500] : colors.grayscale[200],
            position: "relative",
            backgroundColor: colors.white,
          },
        ]}
      >
        {Left && (
          <View
            style={{
              width: 48,
              height: "100%",
              position: "absolute",
              top: 0,
              left: 0,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Left />
          </View>
        )}
        {Right && (
          <View
            style={{
              width: 48,
              height: "100%",
              position: "absolute",
              top: 0,
              right: 0,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Right />
          </View>
        )}
        <Input
          {...props}
          style={{
            width: "100%",
            height: "100%",
            fontFamily: getFont("Roboto_400Regular"),
            fontSize: sizing.regular,
            paddingLeft: Left ? 48 : 16,
            paddingRight: Right ? 48 : 16,
          }}
          placeholderTextColor={colors.grayscale[600]}
        />
      </View>
      {error && (
        <Text
          size="small"
          style={{
            marginHorizontal: 2,
            marginTop: 4,
            color: colors.danger[600],
          }}
        >
          {error}
        </Text>
      )}
    </View>
  );
}
