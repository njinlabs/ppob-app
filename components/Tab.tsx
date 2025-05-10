import { colors } from "@/constants/Colors";
import { TouchableOpacity, View } from "react-native";
import Text from "./Text";

export type TabProps<List extends string = any> = {
  options: Array<List>;
  onChange?: (value: List) => void;
  value?: List;
};

export default function Tab({ options, onChange = () => {}, value }: TabProps) {
  return (
    <View style={{ flexDirection: "row", alignItems: "flex-end" }}>
      {options.map((item, key) => (
        <TouchableOpacity
          key={`${key}`}
          style={{
            flex: 1,
            height: 48,
            justifyContent: "center",
            alignItems: "center",
            borderBottomWidth: 2,
            borderColor:
              value === item ? colors.primary[400] : colors.grayscale[100],
          }}
          onPress={() => onChange(item)}
        >
          <Text
            font="Nunito_700Bold"
            style={{
              color:
                value === item ? colors.primary[500] : colors.grayscale[500],
            }}
          >
            {item}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}
