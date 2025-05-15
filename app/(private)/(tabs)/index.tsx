import React from "react";

import Entypo from "@expo/vector-icons/Entypo";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

import { getWallet } from "@/api/wallet";
import Logo from "@/assets/svgs/logo";
import DisplayMenu from "@/components/DisplayMenu";
import MiniButton from "@/components/MiniButton";
import Text from "@/components/Text";
import { colors } from "@/constants/Colors";
import { paymentMenuList } from "@/constants/PaymentMenuList";
import { useAuth } from "@/stores/auth";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Link, useFocusEffect } from "expo-router";
import {
  Dimensions,
  FlatList,
  Image,
  RefreshControl,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import PagerView from "react-native-pager-view";
import { NumericFormat } from "react-number-format";

export default function Dashboard() {
  const user = useAuth((state) => state.user);
  const queryClient = useQueryClient();
  const walletQuery = useQuery({
    queryKey: ["wallet"],
    queryFn: () => getWallet(),
  });

  const images = [
    "https://placehold.co/600x400/png",
    "https://placehold.co/600x400/png",
    "https://placehold.co/600x400/png",
  ];

  useFocusEffect(() => {
    queryClient.invalidateQueries({
      queryKey: ["wallet", "user"],
    });
  });

  return (
    <View style={{ flex: 1, backgroundColor: colors.white }}>
      <View
        style={{
          paddingTop: (StatusBar.currentHeight || 48) + 16,
          paddingHorizontal: 22,
          position: "relative",
        }}
      >
        <View
          style={{
            position: "absolute",
            top: 0,
            bottom: 48,
            left: 0,
            right: 0,
            backgroundColor: colors.primary[500],
          }}
        ></View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            paddingHorizontal: 4,
            marginBottom: 24,
          }}
        >
          <Logo width={0.3 * Dimensions.get("screen").width} />

          <Link href="/(private)/membership" asChild>
            <TouchableOpacity style={styles.box}>
              <Text
                font="Nunito_800ExtraBold"
                size="small"
                style={{
                  color: colors.primary[600],
                }}
              >
                {user?.membership?.name || "Non Member"}
              </Text>
              <Entypo
                name="chevron-right"
                size={16}
                color={colors.primary[600]}
              />
            </TouchableOpacity>
          </Link>
        </View>
        <View style={styles.card}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 8,
            }}
          >
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 5 }}
            >
              <MaterialIcons
                name="account-balance-wallet"
                size={20}
                color={colors.primary[600]}
              />
              <Text font="Nunito_600SemiBold" size="regular">
                Wallet
              </Text>
            </View>

            <View
              style={{
                paddingVertical: 6,
                paddingHorizontal: 14,
                backgroundColor: colors.grayscale[100],
                borderRadius: 30 / 2,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text
                font="Nunito_600SemiBold"
                size="small"
                style={{ color: colors.primary[600] }}
              >
                1000 Poin
              </Text>
            </View>
          </View>
          <NumericFormat
            value={walletQuery.data?.balance}
            displayType="text"
            thousandSeparator=","
            prefix="Rp"
            renderText={(value) => (
              <Text
                size="large"
                font="Roboto_800ExtraBold"
                style={{ marginBottom: 16 }}
                loading={walletQuery.isLoading}
                placeholderWidth={160}
              >
                {value}
              </Text>
            )}
          />
          <View style={{ flexDirection: "row" }}>
            <MiniButton
              style={{ marginRight: 8 }}
              leftAccesorry={() => (
                <MaterialIcons
                  name="credit-card"
                  size={16}
                  color={colors.white}
                />
              )}
              loading={walletQuery.isLoading}
              placeholderWidth={96}
            >
              Deposit
            </MiniButton>
            <MiniButton
              leftAccesorry={() => (
                <MaterialIcons
                  name="receipt-long"
                  size={16}
                  color={colors.white}
                />
              )}
              loading={walletQuery.isLoading}
              placeholderWidth={96}
            >
              Mutasi
            </MiniButton>
          </View>
        </View>
      </View>
      <FlatList
        data={paymentMenuList}
        renderItem={({ item: { title, icon: Icon, color } }) => (
          <Link href="/(private)/product/pulsa-and-data" asChild>
            <DisplayMenu
              color={color}
              title={title}
              icon={() => <Icon size={40} />}
            />
          </Link>
        )}
        refreshControl={
          <RefreshControl
            refreshing={walletQuery.isRefetching}
            onRefresh={() =>
              queryClient.invalidateQueries({
                queryKey: ["wallet"],
              })
            }
            tintColor={colors.primary[200]}
          />
        }
        style={{ flex: 1 }}
        keyExtractor={(_, key) => `${key}`}
        ListHeaderComponent={
          <View>
            <PagerView style={styles.pager} initialPage={0}>
              {images.map((uri, index) => (
                <View style={styles.page} key={index.toString()}>
                  <Image source={{ uri }} style={styles.image} />
                </View>
              ))}
            </PagerView>
            <Text
              font="Nunito_800ExtraBold"
              size="large"
              style={{ marginBottom: 20 }}
            >
              Payment List
            </Text>
          </View>
        }
        columnWrapperStyle={{ marginBottom: 28 }}
        contentContainerStyle={{ paddingHorizontal: 22, paddingBottom: 36 }}
        numColumns={4} // Menampilkan 4 kolom per baris
      />
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.primary[100],
    borderRadius: 30 / 2,
    paddingVertical: 6,
    paddingHorizontal: 14,
  },
  card: {
    backgroundColor: colors.white,
    borderRadius: 12,

    // Shadow untuk iOS
    shadowColor: "#000", // Warna shadow
    shadowOffset: { width: 0, height: 4 }, // Posisi shadow
    shadowOpacity: 0.1, // Kekuatan shadow
    shadowRadius: 8, // Jarak shadow

    // Shadow untuk Android
    elevation: 5, // Ukuran shadow di Android

    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  pager: {
    height: 124 + 48,
    marginVertical: 24,
  },
  page: {
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: Dimensions.get("screen").width - 44,
    aspectRatio: 314 / 124,
    resizeMode: "cover",
    borderRadius: 12,
  },
});
