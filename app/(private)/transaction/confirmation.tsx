import { getProductById } from "@/api/product";
import { makePurchase } from "@/api/purchase";
import BlockedButton from "@/components/BlockedButton";
import Dialog, { DialogRef } from "@/components/Dialog";
import InfoList from "@/components/InfoList";
import Text from "@/components/Text";
import { colors } from "@/constants/Colors";
import { getCustomerNumberLabel } from "@/constants/CustomerNumberLabel";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useLocalSearchParams, useRouter } from "expo-router/build/hooks";
import { useRef } from "react";
import { ScrollView, View } from "react-native";
import { NumericFormat } from "react-number-format";

export default function Confirmation() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const confirmDialogRef = useRef<DialogRef>(null);
  const errorDialogRef = useRef<DialogRef>(null);

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
    onSuccess: ({ id }) => {
      queryClient
        .invalidateQueries({
          queryKey: ["wallet", "purchase-histories"],
        })
        .then(() => {
          router.dismissTo({
            pathname: "/(private)/transaction/receipt",
            params: { id },
          });
        });
    },
    onError: (e) => {
      confirmDialogRef.current?.close();
      if ((e as AxiosError).response?.status === 405) {
        errorDialogRef.current?.show();
      }
    },
  });

  const onSubmit = () => {
    purchaseMutation.mutate({
      productId: param.productId,
      customerNumber: param.customerNumber,
    });
  };

  return (
    <>
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
                loading={productQuery.isLoading}
              >
                {productQuery.data?.category?.name}
              </InfoList>
              <InfoList
                style={{ justifyContent: "space-between" }}
                title="Brand"
                divider
                loading={productQuery.isLoading}
              >
                {productQuery.data?.brand?.name}
              </InfoList>
              <InfoList
                style={{ justifyContent: "space-between" }}
                title="Produk"
                divider
                loading={productQuery.isLoading}
              >
                {productQuery.data?.name}
              </InfoList>
              <InfoList
                style={{ justifyContent: "space-between" }}
                title={
                  getCustomerNumberLabel(
                    productQuery.data?.brand?.name || "",
                    productQuery.data?.category?.name || ""
                  ).label || "No. Tujuan"
                }
                loading={productQuery.isLoading}
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
                  <InfoList
                    title="Harga"
                    divider
                    loading={productQuery.isLoading}
                  >
                    {value}
                  </InfoList>
                )}
              />
              <NumericFormat
                value={productQuery.data?.price}
                thousandSeparator=","
                prefix="Rp"
                displayType="text"
                renderText={(value) => (
                  <InfoList title="Total" loading={productQuery.isLoading}>
                    {value}
                  </InfoList>
                )}
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
            onPress={() => confirmDialogRef.current?.show()}
            style={{ backgroundColor: colors.primary[600] }}
          >
            BAYAR
          </BlockedButton>
        </View>
      </View>
      <Dialog
        ref={confirmDialogRef}
        title="Proses Pembayaran?"
        text="Kamu yakin ingin melanjutkan pembayaran"
        icon="info"
        confirmText="Ya"
        onConfirm={() => onSubmit()}
        loading={purchaseMutation.isPending}
      />
      <Dialog
        ref={errorDialogRef}
        title="Gagal"
        text="Saldo kamu tidak mencukupi"
        icon="danger"
      />
    </>
  );
}
