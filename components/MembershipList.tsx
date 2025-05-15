import { colors } from "@/constants/Colors";
import { AntDesign } from "@expo/vector-icons";
import { View, ViewProps } from "react-native";
import MiniButton from "./MiniButton";
import Text from "./Text";

type Props = {
  title?: string;
  children?: string;
  onSelect?: () => void;
  loading?: boolean;
  active?: boolean;
};

export type MembershipListProps = Props & Omit<ViewProps, keyof Props>;

export default function MembershipList({
  title,
  children,
  onSelect,
  style,
  loading,
  active,
  ...props
}: MembershipListProps) {
  return (
    <View
      {...props}
      style={[
        {
          backgroundColor: colors.white,
          borderWidth: 1,
          borderColor: active ? colors.primary[200] : colors.grayscale[100],
          overflow: "hidden",
          borderRadius: 12,
        },
        style,
      ]}
    >
      <View style={{ padding: 16 }}>
        <Text
          font="Nunito_800ExtraBold"
          size="medium"
          loading={loading}
          placeholderWidth={100}
        >
          {title}
        </Text>
        <Text
          style={{ color: colors.grayscale[700], marginTop: 4 }}
          loading={loading}
          placeholderColumn={3}
          placeholderWidth={250}
        >
          {children}
        </Text>
      </View>
      {active ? (
        <View
          style={{
            padding: 16,
            borderTopWidth: 1,
            borderColor: colors.primary[200],
            backgroundColor: colors.primary[50],
          }}
        >
          <Text font="Roboto_500Medium" style={{ color: colors.primary[500] }}>
            PAKET AKTIF
          </Text>
        </View>
      ) : (
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            padding: 16,
          }}
        >
          <Text
            style={{ color: colors.primary[600] }}
            loading={loading}
            placeholderWidth={86}
          >
            Lihat Detail
          </Text>
          <MiniButton
            loading={loading}
            onPress={onSelect}
            rightAccesorry={() => (
              <AntDesign name="right" color={colors.white} />
            )}
          >
            Pilih Paket
          </MiniButton>
        </View>
      )}
    </View>
  );
}
