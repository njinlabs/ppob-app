import { colors } from "@/constants/Colors";
import { Moment } from "moment";
import { forwardRef, useEffect } from "react";
import { TouchableOpacity, TouchableOpacityProps, View } from "react-native";
import Animated, {
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from "react-native-reanimated";
import { NumericFormat } from "react-number-format";
import Text from "./Text";

type Status = "PENDING" | "SUCCEED" | "FAILED";

type Props = {
  title?: string;
  subtitle?: string;
  total?: number;
  status?: Status;
  date?: Moment;
  loading?: boolean;
};

const statusColors: Record<Status, { background: string; color: string }> = {
  FAILED: { color: colors.danger[600], background: colors.danger[100] },
  SUCCEED: { color: colors.success[600], background: colors.success[100] },
  PENDING: { color: colors.warning[700], background: colors.warning[200] },
};

export type PurchaseListProps = Props &
  Omit<TouchableOpacityProps, keyof Props>;

const PurchaseList = forwardRef<View, PurchaseListProps>(
  (
    {
      style,
      title,
      subtitle,
      total,
      status,
      date,
      disabled,
      loading,
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

    return (
      <TouchableOpacity
        {...props}
        style={[
          {
            borderRadius: 12,
            borderWidth: 1,
            borderColor: colors.grayscale[100],
            backgroundColor: colors.white,
          },
          style,
        ]}
        disabled={loading || disabled}
        ref={ref}
      >
        <View style={{ padding: 16, flexDirection: "row" }}>
          <Animated.View
            style={{
              width: 48,
              height: 48,
              borderWidth: loading ? 0 : 1,
              borderColor: colors.grayscale[100],
              borderRadius: 6,
              opacity: loading ? opacity : 1,
              backgroundColor: loading ? colors.grayscale[800] : undefined,
            }}
          ></Animated.View>
          <View style={{ flex: 1, paddingHorizontal: 12, alignSelf: "center" }}>
            <Text
              font="Roboto_700Bold"
              placeholderWidth={148}
              loading={loading}
            >
              {title}
            </Text>
            <Text
              style={{ color: colors.grayscale[700], marginTop: 6 }}
              placeholderWidth={96}
              loading={loading}
            >
              {subtitle}
            </Text>
          </View>
          <NumericFormat
            value={total}
            thousandSeparator=","
            displayType="text"
            prefix="Rp"
            renderText={(value) => (
              <Text
                style={{ color: colors.orange[600], marginTop: 4 }}
                placeholderWidth={72}
                loading={loading}
              >
                {value}
              </Text>
            )}
          />
        </View>
        <View
          style={{
            paddingVertical: 12,
            paddingHorizontal: 16,
            borderTopWidth: 1,
            borderColor: colors.grayscale[100],
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Text
            style={{ color: colors.grayscale[600] }}
            placeholderWidth={52}
            loading={loading}
          >
            {date?.format("HH:mm")}
          </Text>
          <Text
            size="small"
            style={{
              color: statusColors[status || "PENDING"].color,
              marginLeft: "auto",
              backgroundColor: loading
                ? undefined
                : statusColors[status || "PENDING"].background,
              padding: 2,
              paddingHorizontal: loading ? 0 : 6,
              borderRadius: 2,
            }}
            placeholderWidth={86}
            loading={loading}
          >
            {status === "SUCCEED"
              ? "Berhasil"
              : status === "FAILED"
              ? "Gagal"
              : "Menunggu"}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }
);

export default PurchaseList;
