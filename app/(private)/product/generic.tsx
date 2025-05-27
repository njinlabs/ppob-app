import { BrandModel } from "@/api/model/brand";
import { UploadModel } from "@/api/model/upload";
import { getProduct } from "@/api/product";
import MenuList from "@/components/MenuList";
import { TextInputProps } from "@/components/TextInput";
import { colors } from "@/constants/Colors";
import { getCustomerNumberLabel } from "@/constants/CustomerNumberLabel";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useQuery } from "@tanstack/react-query";
import { Image } from "expo-image";
import { Link, useLocalSearchParams } from "expo-router";
import { useEffect } from "react";
import { FlatList, View } from "react-native";

type BrandList = BrandModel & {
  form: {
    label: string;
    inputType?: TextInputProps["keyboardType"];
  };
  image?: UploadModel | null;
};

export default function Generic() {
  const param = useLocalSearchParams<{
    id: string;
    name: string;
  }>();
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
          ? (Array(8).fill({}) as BrandList[])
          : productQuery.data?.reduce((carry: BrandList[], item) => {
              if (item.brand && !carry.find((el) => el.id === item.brandId)) {
                carry.push({
                  ...item.brand,
                  form: getCustomerNumberLabel(
                    item.brand.name,
                    item.category?.name || ""
                  ),
                });
              }

              return carry;
            }, [] as BrandList[])
      }
      keyExtractor={(_, index) => `${index}`}
      renderItem={({ item }) => (
        <Link
          href={{
            pathname: `/(private)/product/generic-purchase`,
            params: {
              id: item.id,
              name: item.name,
              label: item.form?.label,
              inputType: item.form?.inputType || "phone-pad",
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
                  backgroundColor: colors.grayscale[50],
                  borderRadius: 4,
                  borderWidth: 1,
                  borderColor: colors.grayscale[100],
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {item.image?.url ? (
                  <Image
                    source={{ uri: item.image.url }}
                    style={{
                      width: "80%",
                      height: "80%",
                    }}
                    contentFit="contain"
                  />
                ) : (
                  <Feather name="box" size={24} color={colors.orange[300]} />
                )}
              </View>
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
