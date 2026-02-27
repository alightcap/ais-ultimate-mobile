import { Text, TextInput, View } from "react-native";
import { TextInputFormRowProps } from "../lib/types";

export default function TextInputFormRow({
  title,
  item,
  setItem,
}: TextInputFormRowProps) {
  return (
    <View style={{ flexDirection: "row", margin: 20, alignItems: "center" }}>
      <Text style={{ textAlign: "left", fontSize: 20, marginRight: 5 }}>
        {title}:
      </Text>
      <TextInput
        style={{ borderWidth: 2, flex: 1, padding: 5 }}
        onChangeText={setItem}
        value={item}
      />
    </View>
  );
}
