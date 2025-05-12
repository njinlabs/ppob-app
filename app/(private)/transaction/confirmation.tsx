import { getProductById } from "@/api/product";
import { makePurchase } from "@/api/purchase";
import BlockedButton from "@/components/BlockedButton";
import InfoList from "@/components/InfoList";
import Text from "@/components/Text";
import { colors } from "@/constants/Colors";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useLocalSearchParams } from "expo-router/build/hooks";
import { ScrollView, View } from "react-native";
import { NumericFormat } from "react-number-format";

export default function Confirmation() {
  const queryClient = useQueryClient();
  const param = useLocalSearchParams<{
    productId: string;
    customerNumber: string;
  }>();

  const productQuery = useQuery({
    queryKey: ["product"],
    queryFn: () => getProductById(param.productId),
  });

  const purchaseMutation = useMutation({
    mutationFn: makePurchase,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["wallet", "purchaseHistories"],
      });
    },
  });

  const onSubmit = () => {
    purchaseMutation.mutate({
      productId: param.productId,
      customerNumber: param.customerNumber,
    });
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.grayscale[50] }}>
      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
        <View
          style={{
            paddingTop: 22,
            paddingHorizontal: 22,
            flexDirection: "column",
          }}
        >
          <Text
            font="Nunito_700Bold"
            size="regular"
            style={{ marginBottom: 16 }}
          >
            Rincian Pembelian
          </Text>

          <View
            style={{
              borderRadius: 12,
              backgroundColor: colors.white,
              borderWidth: 1,
              borderColor: colors.grayscale[100],
            }}
          >
            <InfoList
              style={{ justifyContent: "space-between" }}
              title="Kategori"
              divider
            >
              {productQuery.data?.category?.name}
            </InfoList>
            <InfoList
              style={{ justifyContent: "space-between" }}
              title="Brand"
              divider
            >
              {productQuery.data?.brand?.name}
            </InfoList>
            <InfoList
              style={{ justifyContent: "space-between" }}
              title="Produk"
              divider
            >
              {productQuery.data?.name}
            </InfoList>
            <InfoList
              style={{ justifyContent: "space-between" }}
              title="No. Tujuan"
            >
              {param.customerNumber}
            </InfoList>
          </View>

          <Text
            font="Nunito_700Bold"
            size="regular"
            style={{ marginTop: 24, marginBottom: 16 }}
          >
            Rincian Pembayaran
          </Text>

          <View
            style={{
              borderRadius: 12,
              backgroundColor: colors.white,
              borderWidth: 1,
              borderColor: colors.grayscale[100],
            }}
          >
            <NumericFormat
              value={productQuery.data?.price}
              thousandSeparator=","
              prefix="Rp"
              displayType="text"
              renderText={(value) => (
                <InfoList title="Harga" divider>
                  {value}
                </InfoList>
              )}
            />
            <NumericFormat
              value={productQuery.data?.price}
              thousandSeparator=","
              prefix="Rp"
              displayType="text"
              renderText={(value) => <InfoList title="Total">{value}</InfoList>}
            />
          </View>
        </View>
      </ScrollView>

      {/* Tombol selalu di bawah layar */}
      <View
        style={{
          paddingVertical: 24,
          paddingHorizontal: 22,
        }}
      >
        <BlockedButton
          onPress={() => onSubmit()}
          style={{ backgroundColor: colors.primary[600] }}
        >
          BAYAR
        </BlockedButton>
      </View>
    </View>
  );
}
