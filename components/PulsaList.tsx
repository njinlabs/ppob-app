import { colors } from "@/constants/Colors";
import { forwardRef } from "react";
import { TouchableOpacity, TouchableOpacityProps, View } from "react-native";
import { NumericFormat } from "react-number-format";
import Text from "./Text";

type Props = {
  value?: number;
  price?: number;
  loading?: boolean;
};

export type PulsaListProps = Props & Omit<TouchableOpacityProps, keyof Props>;

const PulsaList = forwardRef<View, PulsaListProps>(
  ({ value, price, style, loading, disabled, ...props }, ref) => {
    return (
      <TouchableOpacity
        {...props}
        style={[
          {
            borderWidth: 1,
            borderColor: colors.grayscale[100],
            borderRadius: 8,
            backgroundColor: colors.white,
            padding: 16,
          },
          style,
        ]}
        disabled={loading || disabled}
        ref={ref}
      >
        <NumericFormat
          value={value}
          thousandSeparator=","
          displayType="text"
          renderText={(value) => (
            <Text
              font="Nunito_700Bold"
              size="large"
              loading={loading}
              placeholderWidth={72}
            >
              {value}
            </Text>
          )}
        />
        <Text
          style={{ marginTop: 12 }}
          size="small"
          loading={loading}
          placeholderWidth={38}
        >
          Harga
        </Text>
        <NumericFormat
          value={price}
          thousandSeparator=","
          prefix="Rp"
          displayType="text"
          renderText={(value) => (
            <Text
              style={{ color: colors.primary[500], marginTop: 4 }}
              loading={loading}
              placeholderWidth={48}
            >
              {value}
            </Text>
          )}
        />
      </TouchableOpacity>
    );
  }
);

export default PulsaList;
