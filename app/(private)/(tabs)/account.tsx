import { logout } from "@/api/auth";
import BlockedButton from "@/components/BlockedButton";
import Dialog, { DialogRef } from "@/components/Dialog";
import MenuList from "@/components/MenuList";
import Text from "@/components/Text";
import { colors } from "@/constants/Colors";
import { useAuth } from "@/stores/auth";
import { AntDesign, Octicons } from "@expo/vector-icons";
import { useMutation } from "@tanstack/react-query";
import { Link } from "expo-router";
import { useRef } from "react";
import {
  Dimensions,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  View,
} from "react-native";

export default function Account() {
  const logoutDialog = useRef<DialogRef>(null);
  const user = useAuth((state) => state.user);
  const revoke = useAuth((state) => state.revoke);

  const logoutMutation = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      revoke();
    },
  });

  return (
    <>
      <ScrollView
        style={{ flex: 1, backgroundColor: colors.grayscale[50] }}
        showsVerticalScrollIndicator={false}
      >
        <View
          style={{
            paddingTop: (StatusBar.currentHeight || 48) + 24,
            position: "relative",
            paddingHorizontal: 22,
            paddingBottom: 28,
          }}
        >
          <View
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              height: Dimensions.get("screen").height,
              backgroundColor: colors.primary[500],
            }}
          />
          <View
            style={{
              flexDirection: "row",
            }}
          >
            <View style={{ flex: 1 }}>
              <Text
                font="Nunito_800ExtraBold"
                size="large"
                style={{ color: colors.white }}
              >
                {user?.fullname}
              </Text>
              <Text style={{ color: colors.grayscale[100] }}>
                {user?.phone}
              </Text>
            </View>
            <View
              style={{
                width: 64,
                height: 64,
                borderRadius: 64 / 2,
                backgroundColor: colors.white,
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                shadowRadius: 4,
                shadowOpacity: 0.4,
                shadowColor: colors.primary[800],
                justifyContent: "center",
                alignItems: "center",
                elevation: 2,
              }}
            >
              <Octicons name="person" size={24} color={colors.primary[700]} />
            </View>
          </View>
          <View style={{ flexDirection: "row" }}>
            <Link href="/(private)/membership" asChild>
              <TouchableOpacity
                style={{
                  backgroundColor: colors.white,
                  paddingVertical: 10,
                  paddingHorizontal: 16,
                  borderRadius: 20,
                  flexDirection: "row",
                  alignItems: "center",
                  marginLeft: -2,
                }}
              >
                <Octicons
                  name="credit-card"
                  size={14}
                  style={{ marginRight: 8 }}
                  color={colors.orange[600]}
                />
                <Text size="small" style={{ color: colors.orange[800] }}>
                  Lihat Membership
                </Text>
              </TouchableOpacity>
            </Link>
          </View>
        </View>
        <View
          style={{ paddingHorizontal: 22, paddingTop: 22, paddingBottom: 16 }}
        >
          <Text size="medium" font="Nunito_800ExtraBold">
            Akun & Keamanan
          </Text>
        </View>
        <View
          style={{
            marginHorizontal: 20,
            borderRadius: 12,
            backgroundColor: colors.white,
            borderWidth: 1,
            borderColor: colors.grayscale[100],
          }}
        >
          <MenuList
            leftAccessory={() => (
              <AntDesign name="edit" size={20} color={colors.primary[300]} />
            )}
            divider
          >
            Edit Profile
          </MenuList>
          <MenuList
            leftAccessory={() => (
              <AntDesign name="lock" size={20} color={colors.primary[300]} />
            )}
            divider
          >
            Ganti Password
          </MenuList>
          <MenuList
            leftAccessory={() => (
              <AntDesign
                name="addusergroup"
                size={20}
                color={colors.primary[300]}
              />
            )}
            divider
          >
            Referral Program
          </MenuList>
          <MenuList
            leftAccessory={() => (
              <AntDesign name="gift" size={20} color={colors.primary[300]} />
            )}
            divider
          >
            Poin & Reward
          </MenuList>
          <MenuList
            leftAccessory={() => (
              <AntDesign name="barcode" size={20} color={colors.primary[300]} />
            )}
          >
            Voucher Saya
          </MenuList>
        </View>
        <View
          style={{ paddingHorizontal: 22, paddingTop: 22, paddingBottom: 16 }}
        >
          <Text size="medium" font="Nunito_800ExtraBold">
            Umum
          </Text>
        </View>
        <View
          style={{
            marginHorizontal: 20,
            borderRadius: 12,
            backgroundColor: colors.white,
            borderWidth: 1,
            borderColor: colors.grayscale[100],
          }}
        >
          <MenuList
            leftAccessory={() => (
              <AntDesign
                name="filetext1"
                size={20}
                color={colors.primary[300]}
              />
            )}
            divider
          >
            Ketentuan Layanan
          </MenuList>
          <MenuList
            leftAccessory={() => (
              <AntDesign name="Safety" size={20} color={colors.primary[300]} />
            )}
            divider
          >
            Kebijakan Privasi
          </MenuList>
          <MenuList
            leftAccessory={() => (
              <AntDesign
                name="customerservice"
                size={20}
                color={colors.primary[300]}
              />
            )}
          >
            Customer Care
          </MenuList>
        </View>
        <BlockedButton
          onPress={() => logoutDialog.current?.show()}
          style={{ margin: 22, backgroundColor: colors.danger[500] }}
        >
          Sign Out
        </BlockedButton>
      </ScrollView>
      <Dialog
        icon="danger"
        ref={logoutDialog}
        title="Kamu yakin?"
        text="Kamu akan keluar dari akun ini"
        confirmText="Ya, lanjutkan"
        loading={logoutMutation.isPending}
        onConfirm={() => logoutMutation.mutate()}
      />
    </>
  );
}
