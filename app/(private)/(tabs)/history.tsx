import { PurchaseModel } from "@/api/model/purchase";
import { purchaseHistory } from "@/api/purchase";
import PurchaseList from "@/components/PurchaseList";
import Text from "@/components/Text";
import { colors } from "@/constants/Colors";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Link } from "expo-router";
import moment from "moment";
import { FlatList, RefreshControl, View } from "react-native";

export default function History() {
  const queryClient = useQueryClient();
  const historiesQuery = useQuery({
    queryKey: ["purchaseHistories"],
    queryFn: () => purchaseHistory(),
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
      }, [] as (PurchaseModel & { showDate: boolean })[])}
      refreshControl={
        <RefreshControl
          refreshing={historiesQuery.isRefetching}
          onRefresh={() =>
            queryClient.invalidateQueries({
              queryKey: ["purchaseHistories"],
            })
          }
          tintColor={colors.primary[200]}
        />
      }
      style={{
        flex: 1,
        backgroundColor: colors.grayscale[50],
      }}
      contentContainerStyle={{ paddingBottom: 24 }}
      keyExtractor={(_, index) => `${index}`}
      renderItem={({ item }) => {
        const date = moment(item.createdAt);
        return (
          <>
            {item.showDate && (
              <View
                style={{
                  paddingVertical: 12,
                  paddingHorizontal: 22,
                  backgroundColor: colors.grayscale[100],
                }}
              >
                <Text loading={!item.id} style={{ color: colors.primary[700] }}>
                  {date.format("DD MMMM YYYY")}
                </Text>
              </View>
            )}
            <View style={{ paddingHorizontal: 22, marginTop: 12 }}>
              <Link
                href={{
                  pathname: "/(private)/transaction/receipt",
                  params: { id: item.id },
                }}
                asChild
              >
                <PurchaseList
                  title={item.name}
                  subtitle={item.customerNumber}
                  total={item.total}
                  date={date}
                  loading={!item.id}
                  status={item.status}
                />
              </Link>
            </View>
          </>
        );
      }}
    />
  );
}
