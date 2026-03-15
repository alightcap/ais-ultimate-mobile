import { Pressable, StyleSheet, Text } from "react-native";
import { Colors } from "../styles/global";

export default function MedButton({
  onPress,
  title,
}: {
  onPress: () => void;
  title: string;
}) {
  return (
    <Pressable
      style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}
      onPress={onPress}
    >
      {({ pressed }) => (
        <Text style={[styles.buttonText, pressed && { opacity: 0.7 }]}>
          {title}
        </Text>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  buttonText: {
    fontSize: 18,
    textAlign: "center",
  },
  button: {
    backgroundColor: Colors.surface,
    margin: 8,
    padding: 8,
    borderRadius: 30,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  buttonPressed: {
    backgroundColor: Colors.buttonPress,
    transform: [{ scale: 0.98 }],
    elevation: 1,
  },
});
