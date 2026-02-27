import { StyleSheet, Text, TextInput, View } from "react-native";
import { TextInputFormRowProps } from "../lib/types";

export default function TextInputFormRow({
  title,
  item,
  setItem,
}: TextInputFormRowProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.formText}>{title}:</Text>
      <TextInput style={styles.formInput} onChangeText={setItem} value={item} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    margin: 20,
    alignItems: "center",
  },
  formText: {
    textAlign: "left",
    fontSize: 20,
    marginRight: 5,
  },
  formInput: {
    flex: 1,
    padding: 5,
    borderWidth: 2,
  },
});
