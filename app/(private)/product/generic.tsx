import { BrandModel } from "@/api/model/brand";
import { getProduct } from "@/api/product";
import MenuList from "@/components/MenuList";
import { colors } from "@/constants/Colors";
import { useNavigation } from "@react-navigation/native";
import { useQuery } from "@tanstack/react-query";
import { Link, useLocalSearchParams } from "expo-router";
import { useEffect } from "react";
import { FlatList, View } from "react-native";

export default function Generic() {
  const param = useLocalSearchParams<{ id: string; name: string }>();
  const navigation = useNavigation();

  const productQuery = useQuery({
    queryKey: [`generic-product-${param.id}`],
    queryFn: () => getProduct({ category: param.id }),
  });

  useEffect(() => {
    navigation.setOptions({
      title: param.name,
    });
  }, [navigation, param.name]);

  return (
    <FlatList
      style={{ flex: 1, backgroundColor: colors.white }}
      contentContainerStyle={{ paddingBottom: 36 }}
      data={
        productQuery.isLoading
          ? (Array(8).fill({}) as BrandModel[])
          : productQuery.data?.reduce((carry: BrandModel[], item) => {
              if (item.brand && !carry.find((el) => el.id === item.brandId)) {
                carry.push(item.brand);
              }

              return carry;
            }, [] as BrandModel[])
      }
      keyExtractor={(_, index) => `${index}`}
      renderItem={({ item }) => (
        <Link
          href={{
            pathname: `/(private)/product/generic-purchase`,
            params: {
              id: item.id,
              name: item.name,
              customerNumberLabel: "ID Akun",
            },
          }}
          asChild
        >
          <MenuList
            leftAccessory={() => (
              <View
                style={{
                  width: 36,
                  height: 36,
                  backgroundColor: colors.grayscale[300],
                }}
              />
            )}
            loading={productQuery.isLoading}
            divider
          >
            {item.name}
          </MenuList>
        </Link>
      )}
    />
  );
}
