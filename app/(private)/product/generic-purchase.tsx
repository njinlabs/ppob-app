import { ProductModel } from "@/api/model/product";
import { getProduct } from "@/api/product";
import DataList from "@/components/DataList";
import TextInput from "@/components/TextInput";
import { colors } from "@/constants/Colors";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useQuery } from "@tanstack/react-query";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { FlatList, View } from "react-native";

export default function GenericPurchase() {
  const param = useLocalSearchParams<{
    id: string;
    name: string;
    customerNumberLabel: string;
  }>();
  const navigation = useNavigation();
  const router = useRouter();

  const productQuery = useQuery({
    queryKey: [`product-brand-${param.id}`],
    queryFn: () => getProduct({ brand: param.id }),
  });

  const { control, handleSubmit } = useForm({
    defaultValues: {
      customerNumber: "",
    },
  });

  const onSelectProduct = (productId: string) =>
    handleSubmit(({ customerNumber }) => {
      router.navigate({
        pathname: "/(private)/transaction/confirmation",
        params: {
          customerNumberLabel: param.customerNumberLabel,
          customerNumber,
          productId,
        },
      });
    })();

  useEffect(() => {
    navigation.setOptions({
      title: param.name,
    });
  }, [navigation, param.name]);

  return (
    <View style={{ backgroundColor: colors.grayscale[50], flex: 1 }}>
      <View style={{ backgroundColor: colors.white }}>
        <View
          style={{
            paddingTop: 22,
            paddingBottom: 32,
            borderBottomWidth: 1,
            borderColor: colors.grayscale[200],
            paddingHorizontal: 22,
          }}
        >
          <Controller
            control={control}
            name="customerNumber"
            rules={{ required: true }}
            render={({ field: { value, onChange } }) => (
              <TextInput
                label={param.customerNumberLabel}
                value={value}
                onChangeText={onChange}
                leftAccessory={() => (
                  <AntDesign name="user" size={20} color={colors.orange[600]} />
                )}
              />
            )}
          />
        </View>
      </View>
      <FlatList
        data={
          (productQuery.isFetching
            ? Array(9).fill({})
            : productQuery.data) as ProductModel[]
        }
        keyExtractor={(_item, key) => `${key}`}
        contentContainerStyle={{
          padding: 22,
        }}
        style={{
          flex: 1,
          backgroundColor: colors.grayscale[50],
        }}
        renderItem={({ item }) => (
          <DataList
            loading={productQuery.isFetching}
            name={item.name}
            price={item.price}
            style={{ marginBottom: 16 }}
            onPress={() => onSelectProduct(item.id)}
          />
        )}
      />
    </View>
  );
}
