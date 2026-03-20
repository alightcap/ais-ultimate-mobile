import { Pressable, StyleSheet, Text, ViewStyle } from "react-native";
import { Colors } from "../styles/global";

export default function ActionButton({
  label,
  onPress,
  style,
}: {
  label: string;
  onPress?: () => void;
  style?: ViewStyle;
}) {
  return (
    <Pressable style={[styles.button, style]} onPress={onPress}>
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
