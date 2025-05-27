import Empty from "@/components/Empty";
import { colors } from "@/constants/Colors";
import { View } from "react-native";

export default function Notification() {
  return (
    <View style={{ flex: 1, backgroundColor: colors.grayscale[50] }}>
      <Empty title="Belum Ada Notifikasi" />
    </View>
  );
}
