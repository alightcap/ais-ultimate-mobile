import { Pressable, StyleSheet, Text } from "react-native";

export default function BigButton({
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
    backgroundColor: "skyblue",
    margin: 20,
    padding: 20,
    borderRadius: 30,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  buttonPressed: {
    backgroundColor: "#7ec8e3",
    transform: [{ scale: 0.98 }],
    elevation: 1,
  },
});
