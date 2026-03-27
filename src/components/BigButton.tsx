import { Pressable, StyleSheet, Text, View } from "react-native";
import { Colors } from "../styles/global";

export default function BigButton({
  onPress,
  title,
}: {
  onPress: () => void;
  title: string;
}) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Pressable
        style={({ pressed }) => [
          styles.button,
          pressed && styles.buttonPressed,
        ]}
        onPress={onPress}
      >
        {({ pressed }) => (
          <Text style={[styles.buttonText, pressed && { opacity: 0.7 }]}>
            {title}
          </Text>
        )}
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonText: {
    fontSize: 18,
    textAlign: "center",
  },
  button: {
    backgroundColor: Colors.surface,
    justifyContent: "center",
    height: 55,
    width: "90%",
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
