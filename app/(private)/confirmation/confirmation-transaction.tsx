import BlockedButton from "@/components/BlockedButton";
import MenuList from "@/components/MenuList";
import Text from "@/components/Text";
import { colors } from "@/constants/Colors";
import { ScrollView, StatusBar, View } from "react-native";

export default function ConfirmationTransaction() {
  return (
    <View style={{ flex: 1, backgroundColor: colors.grayscale[50] }}>
      <ScrollView 
        style={{ flex: 1 }}
        showsVerticalScrollIndicator={false}
      >
        <View
          style={{
            paddingTop: (StatusBar.currentHeight || 48),
            paddingHorizontal: 22,
            flexDirection: 'column'
          }}
        >
          <Text
            font="Nunito_800ExtraBold"
            size="medium"
            style={{ marginBottom: 20 }}
          >
            Rincian Pembelian
          </Text>

            <View
              style={{
                borderRadius: 12,
                backgroundColor: colors.white,
                borderWidth: 1,
                borderColor: colors.grayscale[100]
              }}
            >
        
            <MenuList
              style={{ justifyContent: "space-between" }}
              leftAccessory={() => (
                <Text>Kategori</Text>
              )}
              rightAccessory={() => (
                  <Text>Pulsa</Text>
              )}
              divider
            >
            </MenuList>
            <MenuList
              style={{ justifyContent: "space-between" }}
              leftAccessory={() => (
                <Text>Brand</Text>
              )}
              rightAccessory={() => (
                  <Text>Telkomsel</Text>
              )}
              divider
            >
            </MenuList>
            <MenuList
              style={{ justifyContent: "space-between" }}
              leftAccessory={() => (
                <Text>Produk</Text>
              )}
              rightAccessory={() => (
                  <Text>Telkomsel Pulsa 25,000</Text>
              )}
              divider
            >
            </MenuList>
            <MenuList
              style={{ justifyContent: "space-between" }}
              leftAccessory={() => (
                <Text>No. Tujuan</Text>
              )}
              rightAccessory={() => (
                  <Text>628127176774</Text>
              )}
            >
            </MenuList>

          </View>

          <Text
            font="Nunito_800ExtraBold"
            size="medium"
            style={{ marginTop: 20, marginBottom: 20 }}
          >
            Rincian Pembayaran
          </Text>

          <View
              style={{
                borderRadius: 12,
                backgroundColor: colors.white,
                borderWidth: 1,
                borderColor: colors.grayscale[100]
              }}
            >
            <MenuList
              style={{ justifyContent: "space-between" }}
              leftAccessory={() => (
                <Text>Harga</Text>
              )}
              rightAccessory={() => (
                  <Text>Rp24,700</Text>
              )}
              divider
            >
            </MenuList>
            <MenuList
              style={{ justifyContent: "space-between" }}
              leftAccessory={() => (
                <Text>Total</Text>
              )}
              rightAccessory={() => (
                  <Text>Rp24,700</Text>
              )}
            >
            </MenuList>
          </View>
        </View>
      </ScrollView>

      {/* Tombol selalu di bawah layar */}
      <View
        style={{
          padding: 22,
          borderTopWidth: 1,
          borderColor: colors.grayscale[50]
        }}
      >
        <BlockedButton
          style={{ backgroundColor: colors.primary[600] }}
        >
          BAYAR
        </BlockedButton>
      </View>
    </View>
  )
}