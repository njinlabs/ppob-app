import PurchaseList from "@/components/PurchaseList";
import Text from "@/components/Text";
import { colors } from "@/constants/Colors";
import { ScrollView, View } from "react-native";

export default function History() {
  return (
    <ScrollView style={{ flex: 1, backgroundColor: colors.grayscale[50] }}>
      <View
        style={{
          paddingVertical: 12,
          paddingHorizontal: 22,
          backgroundColor: colors.grayscale[100],
        }}
      >
        <Text style={{ color: colors.primary[700] }}>19 Maret 2025</Text>
      </View>
      <View style={{ paddingHorizontal: 22, marginTop: 12 }}>
        <PurchaseList
          title="Telkomsel 5,000"
          subtitle="081271762774"
          total={4800}
        />
      </View>
      <View style={{ paddingHorizontal: 22, marginTop: 12 }}>
        <PurchaseList
          title="Telkomsel 5,000"
          subtitle="081271762774"
          total={4800}
        />
      </View>
      <View style={{ paddingHorizontal: 22, marginTop: 12 }}>
        <PurchaseList
          title="Telkomsel 5,000"
          subtitle="081271762774"
          total={4800}
        />
      </View>
    </ScrollView>
  );
}
