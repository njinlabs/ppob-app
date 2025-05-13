import { colors } from "@/constants/Colors";
import { forwardRef } from "react";
import { TouchableOpacity, TouchableOpacityProps, View } from "react-native";
import { NumericFormat } from "react-number-format";
import Text from "./Text";

type Props = {
  name?: string;
  price?: number;
  loading?: boolean;
};

export type DataListProps = Props & Omit<TouchableOpacityProps, keyof Props>;

const DataList = forwardRef<View, DataListProps>(
  ({ name, price, style, loading, disabled, ...props }, ref) => {
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
        disabled={loading || disabled}
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
          <Text size="small" loading={loading} placeholderWidth={36}>
            Harga
          </Text>
          <NumericFormat
            value={price}
            thousandSeparator=","
            prefix="Rp"
            displayType="text"
            renderText={(value) => (
              <Text
                loading={loading}
                placeholderWidth={52}
                style={{ color: colors.primary[500], marginTop: 4 }}
              >
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
          <Text
            font="Nunito_700Bold"
            loading={loading}
            placeholderWidth={160}
            placeholderColumn={2}
          >
            {name}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }
);

export default DataList;
