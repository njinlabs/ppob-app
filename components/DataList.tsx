import { colors } from "@/constants/Colors";
import { forwardRef } from "react";
import { TouchableOpacity, TouchableOpacityProps, View } from "react-native";
import { NumericFormat } from "react-number-format";
import Text from "./Text";

type Props = {
  name?: string;
  price?: number;
};

export type DataListProps = Props & Omit<TouchableOpacityProps, keyof Props>;

const DataList = forwardRef<View, DataListProps>(
  ({ name, price, style, ...props }, ref) => {
    return (
      <TouchableOpacity
        {...props}
        style={[
          {
            borderWidth: 1,
            borderColor: colors.grayscale[100],
            borderRadius: 8,
            backgroundColor: colors.white,
            flexDirection: "row",
            alignItems: "stretch",
          },
          style,
        ]}
        ref={ref}
      >
        <View
          style={{
            width: "30%",
            borderRightWidth: 1,
            borderColor: colors.grayscale[100],
            paddingHorizontal: 16,
            paddingVertical: 24,
            justifyContent: "center",
          }}
        >
          <Text size="small">Harga</Text>
          <NumericFormat
            value={price}
            thousandSeparator=","
            prefix="Rp"
            displayType="text"
            renderText={(value) => (
              <Text style={{ color: colors.primary[500], marginTop: 4 }}>
                {value}
              </Text>
            )}
          />
        </View>
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            padding: 16,
            paddingVertical: 16,
          }}
        >
          <Text font="Nunito_700Bold">{name}</Text>
        </View>
      </TouchableOpacity>
    );
  }
);

export default DataList;
