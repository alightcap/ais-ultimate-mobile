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
    <Pressable
      style={({ pressed }) => [
        styles.button,
        pressed && styles.buttonPressed,
        style,
      ]}
      onPress={onPress}
    >
      {({ pressed }) => (
        <Text style={[styles.buttonText, pressed && styles.buttenTextPressed]}>
          {label}
        </Text>
      )}
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
    elevation: 3,
  },
  buttonPressed: {
    transform: [{ scale: 0.98 }],
    elevation: 1,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    fontWeight: 600,
  },
  buttenTextPressed: {
    color: "#ccc",
  },
});
