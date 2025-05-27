import { WalletLedgerModel } from "@/api/model/wallet-ledger";
import { getWalletHistory } from "@/api/wallet";
import Empty from "@/components/Empty";
import PurchaseList from "@/components/PurchaseList";
import Text from "@/components/Text";
import { colors } from "@/constants/Colors";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import moment from "moment";
import { FlatList, RefreshControl, View } from "react-native";

export default function WalletHistory() {
  const queryClient = useQueryClient();
  const historiesQuery = useQuery({
    queryKey: ["wallet-histories"],
    queryFn: () => getWalletHistory(),
  });

  return (
    <FlatList
      data={(!historiesQuery.data && historiesQuery.isLoading
        ? (Array(4).fill({}) as unknown as Required<typeof historiesQuery.data>)
        : historiesQuery.data
      )?.reduce((current, history, index) => {
        const last = current.length ? current[current.length - 1] : null;

        current.push({
          ...history,
          showDate: !(
            last &&
            moment(last.createdAt).diff(moment(history.createdAt), "days") <= 0
          ),
        });

        return current;
      }, [] as (WalletLedgerModel & { showDate: boolean })[])}
      refreshControl={
        <RefreshControl
          refreshing={historiesQuery.isRefetching}
          onRefresh={() =>
            queryClient.invalidateQueries({
              queryKey: ["purchase-histories"],
            })
          }
          tintColor={colors.primary[200]}
        />
      }
      style={{
        flex: 1,
        backgroundColor: colors.grayscale[50],
      }}
      contentContainerStyle={{
        paddingBottom: 24,
        flexGrow: historiesQuery.data?.length ? undefined : 1,
      }}
      keyExtractor={(_, index) => `${index}`}
      ListEmptyComponent={
        <Empty
          title="Belum Ada Riwayat"
          text="Kamu belum melakukan transaksi nih."
        />
      }
      renderItem={({ item, index }) => {
        const date = moment(item.createdAt);
        return (
          <>
            {item.showDate && (
              <View
                style={{
                  paddingVertical: 12,
                  paddingHorizontal: 22,
                  backgroundColor: colors.grayscale[100],
                  marginTop: index > 0 ? 16 : 0,
                }}
              >
                <Text loading={!item.id} style={{ color: colors.primary[700] }}>
                  {date.format("DD MMMM YYYY")}
                </Text>
              </View>
            )}
            <View style={{ paddingHorizontal: 22, marginTop: 12 }}>
              <PurchaseList
                title={
                  item.event?.membership
                    ? "PAKET MEMBERSHIP"
                    : item.event?.purchase
                    ? "PEMBELIAN"
                    : item.event?.topup
                    ? "TOP UP SALDO"
                    : ""
                }
                subtitle={
                  item.event?.membership
                    ? item.event.membership.name
                    : item.event?.purchase
                    ? item.event.purchase.name
                    : item.event?.topup
                    ? item.event.topup.method
                    : ""
                }
                icon={
                  item.event?.membership
                    ? "users"
                    : item.event?.purchase
                    ? "shopping-bag"
                    : item.event?.topup
                    ? "credit-card"
                    : undefined
                }
                total={item.add}
                date={date}
                loading={!item.id}
                status="SUCCESS"
                disabled
              />
            </View>
          </>
        );
      }}
    />
  );
}
