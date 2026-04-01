import { Colors } from "@/src/styles/global";
import { Picker } from "@react-native-picker/picker";
import { StyleSheet, View } from "react-native";

export default function HardCapPicker({
  value,
  onValueChange,
}: {
  value: number;
  onValueChange: (value: number) => void;
}) {
  const minutes = Array.from({ length: 13 }, (_, i) => 5 * i + 60);

  return (
    <View style={styles.container}>
      <Picker
        selectedValue={value}
        onValueChange={(itemValue) => onValueChange(itemValue)}
        style={styles.picker}
        itemStyle={styles.itemStyle}
      >
        {minutes.map((min) => (
          <Picker.Item key={min} label={`${min} mins`} value={min} />
        ))}
      </Picker>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.surface,
    width: "100%",
    justifyContent: "center",
  },
  picker: { width: "100%" },
  itemStyle: {
    fontSize: 20,
    color: Colors.text,
    height: 120,
  },
});
