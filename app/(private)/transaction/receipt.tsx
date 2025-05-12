import { getPurchaseById } from "@/api/purchase";
import Logo from "@/assets/svgs/logo";
import Dashed from "@/assets/svgs/receipt-dashed";
import InfoList from "@/components/InfoList";
import MiniButton from "@/components/MiniButton";
import Text from "@/components/Text";
import { colors } from "@/constants/Colors";
import { AntDesign } from "@expo/vector-icons";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useLocalSearchParams } from "expo-router";
import moment from "moment";
import { useEffect } from "react";
import {
  Dimensions,
  RefreshControl,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import { NumericFormat } from "react-number-format";

export default function Receipt() {
  const param = useLocalSearchParams<{ id: string }>();
  const queryClient = useQueryClient();

  const purchaseQuery = useQuery({
    queryKey: ["purchaseDetail"],
    queryFn: () => getPurchaseById(param.id),
  });

  useEffect(() => {
    if (purchaseQuery.data) {
      queryClient.invalidateQueries({ queryKey: ["purchaseDetail"] });
    }
  }, [param.id]);

  return (
    <View style={{ flex: 1, backgroundColor: colors.grayscale[50] }}>
      <View
        style={{
          position: "absolute",
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
          height: 130,
          backgroundColor: colors.primary[500],
        }}
      ></View>

      <ScrollView
        style={{ flex: 1, paddingHorizontal: 22 }}
        refreshControl={
          <RefreshControl
            refreshing={purchaseQuery.isRefetching}
            onRefresh={() => purchaseQuery.refetch()}
          />
        }
      >
        <View style={styles.card}>
          <View style={{ alignItems: "center", paddingTop: 22 }}>
            <Logo color="original" width={133} />
            <Text
              font="Nunito_800ExtraBold"
              size="extraLarge"
              style={{ paddingTop: 25 }}
            >
              Transaksi{" "}
              {purchaseQuery.data?.status === "SUCCESS"
                ? "Berhasil"
                : purchaseQuery.data?.status === "FAILED"
                ? "Gagal"
                : "Tertunda"}
            </Text>
            <Text font="Roboto_400Regular">
              {moment(purchaseQuery.data?.createdAt).format(
                "DD MMMM YYYY HH:mm"
              )}
            </Text>
            <NumericFormat
              value={purchaseQuery.data?.price}
              prefix="Rp"
              thousandSeparator=","
              displayType="text"
              renderText={(value) => (
                <Text
                  font="Roboto_800ExtraBold"
                  size="extraLarge"
                  style={{ paddingVertical: 20 }}
                >
                  {value}
                </Text>
              )}
            />
          </View>

          <View style={{ alignItems: "center" }}>
            <Dashed
              width={Dimensions.get("screen").width - 40}
              color={colors.grayscale[50]}
            />
          </View>

          <View
            style={{
              marginTop: 22,
              width: "100%",
              paddingHorizontal: 6,
            }}
          >
            <InfoList style={{ paddingVertical: 8 }} title="Produk">
              {purchaseQuery.data?.name}
            </InfoList>
            <InfoList style={{ paddingVertical: 8 }} title="No. Invoice">
              {purchaseQuery.data?.invoiceNumber}
            </InfoList>
            <InfoList style={{ paddingVertical: 8 }} title="SN">
              {purchaseQuery.data?.details.serialNumber}
            </InfoList>
            <InfoList style={{ paddingVertical: 8 }} title="No. Tujuan">
              {purchaseQuery.data?.customerNumber}
            </InfoList>
          </View>

          <View
            style={{
              marginTop: 24,
              padding: 16,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              gap: 16,
              borderTopWidth: 1,
              borderColor: colors.grayscale[100],
            }}
          >
            <MiniButton
              leftAccesorry={() => (
                <AntDesign name="sharealt" color={colors.primary[500]} />
              )}
              appearance="rounded-outlined"
            >
              Bagikan
            </MiniButton>
            <MiniButton
              leftAccesorry={() => (
                <AntDesign name="printer" color={colors.primary[500]} />
              )}
              appearance="rounded-outlined"
            >
              Cetak
            </MiniButton>
            <MiniButton
              leftAccesorry={() => (
                <AntDesign name="customerservice" color={colors.primary[500]} />
              )}
              appearance="rounded-outlined"
            >
              Bantuan
            </MiniButton>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "white",
    borderRadius: 12,
  },
});
