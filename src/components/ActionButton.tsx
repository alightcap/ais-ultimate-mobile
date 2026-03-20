import { Pressable, StyleSheet, Text } from "react-native";
import { Colors } from "../styles/global";

export default function ActionButton({ label }: { label: string }) {
  return (
    <Pressable style={styles.button}>
      <Text style={styles.buttonText}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.brandPrimary,
    borderRadius: 5,
    flex: 1,
    justifyContent: "center",
    margin: 2,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    fontWeight: 600,
  },
});
