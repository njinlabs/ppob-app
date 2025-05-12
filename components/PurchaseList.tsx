import { colors } from "@/constants/Colors";
import { Moment } from "moment";
import { forwardRef } from "react";
import { TouchableOpacity, TouchableOpacityProps, View } from "react-native";
import { NumericFormat } from "react-number-format";
import Text from "./Text";

type Status = "PENDING" | "SUCCEED" | "FAILED";

type Props = {
  title?: string;
  subtitle?: string;
  total?: number;
  status?: Status;
  date?: Moment;
};

const statusColors: Record<Status, { background: string; color: string }> = {
  FAILED: { color: colors.danger[600], background: colors.danger[100] },
  SUCCEED: { color: colors.success[600], background: colors.success[100] },
  PENDING: { color: colors.warning[700], background: colors.warning[200] },
};

export type PurchaseListProps = Props &
  Omit<TouchableOpacityProps, keyof Props>;

const PurchaseList = forwardRef<View, PurchaseListProps>(
  ({ style, title, subtitle, total, status, date, ...props }, ref) => {
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
        ref={ref}
      >
        <View style={{ padding: 16, flexDirection: "row" }}>
          <View
            style={{
              width: 48,
              height: 48,
              borderWidth: 1,
              borderColor: colors.grayscale[100],
              borderRadius: 6,
            }}
          ></View>
          <View style={{ flex: 1, paddingHorizontal: 12, alignSelf: "center" }}>
            <Text font="Roboto_700Bold">{title}</Text>
            <Text style={{ color: colors.grayscale[700], marginTop: 6 }}>
              {subtitle}
            </Text>
          </View>
          <NumericFormat
            value={total}
            thousandSeparator=","
            displayType="text"
            prefix="Rp"
            renderText={(value) => (
              <Text style={{ color: colors.orange[600], marginTop: 4 }}>
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
          <Text style={{ color: colors.grayscale[600] }}>
            {date?.format("HH:mm")}
          </Text>
          <Text
            size="small"
            style={{
              color: statusColors[status || "PENDING"].color,
              marginLeft: "auto",
              backgroundColor: statusColors[status || "PENDING"].background,
              padding: 2,
              paddingHorizontal: 6,
              borderRadius: 2,
            }}
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
