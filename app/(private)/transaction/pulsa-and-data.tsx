import { getBrandByPhone, getProduct } from "@/api/product";
import DataList from "@/components/DataList";
import PulsaList from "@/components/PulsaList";
import Tab from "@/components/Tab";
import TextInput from "@/components/TextInput";
import { colors } from "@/constants/Colors";
import { AntDesign } from "@expo/vector-icons";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Dimensions, FlatList, View } from "react-native";

export default function PulsaAndData() {
  const queryClient = useQueryClient();
  const [tab, setTab] = useState<"Pulsa" | "Paket Data">("Pulsa");

  const { watch, control } = useForm({
    defaultValues: {
      phone: "",
    },
  });

  const productQuery = useQuery({
    queryKey: ["products"],
    queryFn: () => {
      if (!getBrandMutation.data?.id) {
        return [];
      }
      return getProduct({ brand: getBrandMutation.data?.id });
    },
  });

  const getBrandMutation = useMutation({
    mutationFn: getBrandByPhone,
    onError: (e) => console.log(e),
  });

  useEffect(() => {
    if (watch("phone").length >= 8 && !getBrandMutation.data) {
      getBrandMutation.mutate(watch("phone"));
    } else if (watch("phone").length < 8 && getBrandMutation.data) {
      console.log("CLEARING");
      getBrandMutation.reset();
    }
  }, [watch("phone")]);

  useEffect(() => {
    queryClient.invalidateQueries({ queryKey: ["products"] });
  }, [getBrandMutation.data]);

  return (
    <View style={{ backgroundColor: colors.grayscale[50], flex: 1 }}>
      <View style={{ backgroundColor: colors.white }}>
        <View
          style={{ paddingTop: 22, paddingBottom: 16, paddingHorizontal: 22 }}
        >
          <Controller
            control={control}
            name="phone"
            rules={{ required: true }}
            render={({ field: { value, onChange } }) => (
              <TextInput
                label="Nomor Ponsel"
                placeholder="Contoh: 08127176XXXX"
                value={value}
                onChangeText={onChange}
                leftAccessory={() => (
                  <AntDesign
                    name="contacts"
                    size={20}
                    color={colors.orange[600]}
                  />
                )}
              />
            )}
          />
        </View>
        <Tab options={["Pulsa", "Paket Data"]} value={tab} onChange={setTab} />
      </View>
      <View style={{ flex: 1, position: "relative" }}>
        <FlatList
          data={productQuery.data?.filter((item) =>
            item.category?.name.includes("Pulsa")
          )}
          keyExtractor={(_item, key) => `${key}`}
          contentContainerStyle={{
            padding: 22,
          }}
          numColumns={2}
          columnWrapperStyle={{
            justifyContent: "space-between",
            marginBottom: 16,
          }}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: colors.grayscale[50],
            zIndex: tab === "Pulsa" ? 1 : 0,
          }}
          renderItem={({ item }) => (
            <PulsaList
              value={Number(item.name.split(" ").pop()?.replace(/\D/g, ""))}
              price={item.price}
              style={{ width: Dimensions.get("screen").width / 2 - 8 - 22 }}
            />
          )}
        />
        <FlatList
          data={productQuery.data?.filter((item) =>
            item.category?.name.includes("Data")
          )}
          keyExtractor={(_item, key) => `${key}`}
          contentContainerStyle={{
            padding: 22,
          }}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: colors.grayscale[50],
            zIndex: tab === "Paket Data" ? 1 : 0,
          }}
          renderItem={({ item }) => (
            <DataList
              name={item.name}
              price={item.price}
              style={{ marginBottom: 16 }}
            />
          )}
        />
      </View>
    </View>
  );
}
