import Logo from "@/assets/svgs/logo";
import Text from "@/components/Text";
import { colors } from "@/constants/Colors";
import Entypo from '@expo/vector-icons/Entypo';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Dimensions, StatusBar, StyleSheet, TouchableOpacity, View } from "react-native";

export default function eReceipt() {
  return (
    <View style={{ flex: 1, backgroundColor: colors.grayscale[50] }}>
      <View style={{
          paddingTop: (StatusBar.currentHeight || 48) + 16,
          paddingHorizontal: 22,
          position: "relative"
      }}
      >
        <View
            style={{
                position: "absolute",
                top: 0,
                bottom: 0,
                left: 0,
                right: 0,
                height: 130,
                backgroundColor: colors.primary[500]
            }}
        >
        </View>

        <View style={styles.card}>
            <Logo width={0.3 * Dimensions.get("screen").width} />
            <Text
              font="Nunito_900Black"
              size="extraLarge"
              style={{ paddingTop: 25 }}
            >
                Transaksi Berhasil
            </Text>
            <Text
              font="Nunito_500Medium"
              size="medium"
            >
                09 Mei 2025 13:00
            </Text>
            <Text
              font="Nunito_900Black"
              size="extraLarge"
              style={{ paddingVertical: 20 }}
            >
              Rp24,700
            </Text>

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: "white",
              }}
              >
              <View
                style={{
                  width: 20,
                  height: 40,
                  borderTopRightRadius: 20,
                  borderBottomRightRadius: 20,
                  backgroundColor: colors.grayscale[50],
                  elevation: 0,
                }}
              />

              <View
                style={{
                  flex: 1,
                  borderBottomWidth: 1,
                  borderBottomColor: '#ccc',
                  borderStyle: 'dashed',
                }}
              />

              <View
                style={{
                  width: 20,
                  height: 40,
                  borderTopLeftRadius: 20,
                  borderBottomLeftRadius: 20,
                  backgroundColor: colors.grayscale[50],
                  elevation: 0,
                }}
              />
            </View>

          <View
           style={{
            marginTop: 20,
            width: "100%"
           }}
          >
            <View
              style={{
                alignItems: "center",
                flexDirection: 'row',
                justifyContent: "space-between",
                paddingHorizontal: 25,
                paddingVertical: 7,
              }}
            >
              <Text
                font="Nunito_400Regular"
                size="large"
              >
                Produk
              </Text>
              <Text
                font="Nunito_400Regular"
                size="large"
              >
                Telkomsel Pulsa 25,000
              </Text>
            </View>

            <View
              style={{
                alignItems: "center",
                flexDirection: 'row',
                justifyContent: "space-between",
                paddingHorizontal: 25,
                paddingVertical: 7,
              }}
            >
              <Text
                font="Nunito_400Regular"
                size="large"
              >
                No. Invoice
              </Text>
              <Text
                font="Nunito_400Regular"
                size="large"
              >
                PUR/250509/000001
              </Text>
            </View>

            <View
              style={{
                alignItems: "center",
                flexDirection: 'row',
                justifyContent: "space-between",
                paddingHorizontal: 25,
                paddingVertical: 7,
              }}
            >
              <Text
                font="Nunito_400Regular"
                size="large"
              >
                SN
              </Text>
              <Text
                font="Nunito_400Regular"
                size="large"
              >
                0983029380978378783
              </Text>
            </View>

            <View
              style={{
                alignItems: "center",
                flexDirection: 'row',
                justifyContent: "space-between",
                paddingHorizontal: 25,
                paddingVertical: 7,
              }}
            >
              <Text
                font="Nunito_400Regular"
                size="large"
              >
                No. Tujuan
              </Text>
              <Text
                font="Nunito_400Regular"
                size="large"
              >
                +6281271762774
              </Text>
            </View>
          </View>

          <View
           style={{
            marginTop: 10,
            padding: 10,
            width: "100%",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            gap: 35
           }}
          >
            <TouchableOpacity
              style={{
                borderRadius: 25,
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                gap: 10,
                height: 40,
                width: 120,
                borderColor: colors.primary[500],
                borderWidth: 1
              }}
            >
              <Entypo name="share" size={24} color={colors.primary[500]} />
              <Text
                font="Nunito_600SemiBold"
                size="medium"
                style={{ color: colors.primary[500] }}
              >
                Bagikan
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                borderRadius: 25,
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                gap: 10,
                height: 40,
                width: 120,
                borderColor: colors.primary[500],
                borderWidth: 1
              }}
            >
              <MaterialIcons name="local-print-shop" size={24} color={colors.primary[500]} />
              <Text
                font="Nunito_600SemiBold"
                size="medium"
                style={{ color: colors.primary[500] }}
              >
                Cetak
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
    card: {
        alignItems: "center",
        flexDirection: "column",
        position: "absolute",
        paddingTop: 25,
        top: 5,
        bottom: 0,
        left: 22,
        right: 22,
        height: Dimensions.get("screen").height / 2,
        backgroundColor: "white",
        borderRadius: 15,
    }
})