import {
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  ViewStyle,
} from "react-native";
import { Colors } from "../styles/global";

export default function Button({
  title,
  onPress,
  viewStyle,
  textStyle,
  size = "big",
}: {
  title: string;
  onPress: () => void;
  viewStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>; // NOTE: allows for arrays of styles
  size?: "medium" | "big";
}) {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.button,
        size === "big" ? styles.buttonBig : styles.buttonMedium,
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
  button: {
    alignItems: "center",
    borderRadius: 30,
    justifyContent: "center",
    backgroundColor: Colors.brandAccent,
    elevation: 3,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  buttonBig: {
    height: 55,
  },
  buttonMedium: {
    height: 40,
  },
  buttonPressed: {
    backgroundColor: Colors.buttonPress,
    transform: [{ scale: 0.98 }],
    elevation: 1,
  },
  buttonText: {
    fontSize: 18,
    textAlign: "center",
  },
});
