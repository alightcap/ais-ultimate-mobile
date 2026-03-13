import { StyleSheet, Text, TextInput, View } from "react-native";
import { TextInputFormRowProps } from "../lib/types";
import { Colors } from "../styles/global";

export default function TextInputFormRow({
  title,
  item,
  setItem,
  autoFocus = false,
  placeholderText = "",
  keyboardType = "default",
}: TextInputFormRowProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.formText}>{title}:</Text>
      <TextInput
        style={styles.formInput}
        onChangeText={setItem}
        value={item}
        autoFocus={autoFocus}
        placeholder={placeholderText}
        keyboardType={keyboardType}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: 8,
    alignItems: "center",
    backgroundColor: Colors.surface,
    justifyContent: "space-between",
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
    borderRadius: 5,
    maxWidth: "50%",
    textAlign: "right",
  },
});
