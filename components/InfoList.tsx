import { colors } from "@/constants/Colors";
import { FC, forwardRef } from "react";
import { View, ViewProps } from "react-native";
import Text from "./Text";

type Props = {
  title?: string;
  children?: string;
  leftAccessory?: FC;
  divider?: boolean;
};

export type InfoListProps = Props & Omit<ViewProps, keyof Props>;

const InfoList = forwardRef<View, InfoListProps>(
  (
    { children, leftAccessory: LeftAccessory, title, style, divider, ...props },
    ref
  ) => (
    <View
      {...props}
      style={[
        {
          borderBottomWidth: divider ? 1 : 0,
          borderColor: colors.grayscale[100],
          padding: 16,
          flexDirection: "row",
          alignItems: "flex-start",
        },
        style,
      ]}
      ref={ref}
    >
      {LeftAccessory && (
        <View
          style={{
            marginRight: 16,
          }}
        >
          <LeftAccessory />
        </View>
      )}

      <View
        style={{
          flex: 1,
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        {title && <Text>{title}</Text>}
        {children && <Text style={{ textAlign: "right" }}>{children}</Text>}
      </View>
    </View>
  )
);

export default InfoList;
