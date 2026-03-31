import {
  Pressable,
  StyleSheet,
  Text,
  TextStyle,
  ViewStyle,
} from "react-native";
import { Colors } from "../styles/global";

export default function BigButton({
  onPress,
  title,
  viewStyle,
  textStyle,
}: {
  onPress: () => void;
  title: string;
  viewStyle?: ViewStyle;
  textStyle?: TextStyle;
}) {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.button,
        pressed && styles.buttonPressed,
        viewStyle,
      ]}
      onPress={onPress}
    >
      {({ pressed }) => (
        <Text
          style={[styles.buttonText, pressed && { opacity: 0.7 }, textStyle]}
        >
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
    justifyContent: "center",
    height: 55,
    borderRadius: 30,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    alignItems: "center",
    borderWidth: 2,
  },
  buttonPressed: {
    backgroundColor: Colors.buttonPress,
    transform: [{ scale: 0.98 }],
    elevation: 1,
  },
});
