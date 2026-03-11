import { Pressable, StyleSheet, Text } from "react-native";

export default function BigButton({
  onPress,
  title,
}: {
  onPress: () => void;
  title: string;
}) {
  return (
    <Pressable style={styles.button} onPress={onPress}>
      <Text style={styles.buttonText}>{title}</Text>
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
  },
});
