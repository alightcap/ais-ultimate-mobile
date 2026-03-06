import { Href, Link } from "expo-router";
import { Pressable, StyleSheet, Text } from "react-native";

export default function NewButton({
  route,
  title,
}: {
  route: Href;
  title: string;
}) {
  return (
    <Link href={route} asChild>
      <Pressable style={styles.newButton}>
        <Text style={styles.buttonText}>{title}</Text>
      </Pressable>
    </Link>
  );
}

const styles = StyleSheet.create({
  buttonText: {
    fontSize: 18,
    textAlign: "center",
  },
  newButton: {
    textAlign: "center",
    fontSize: 18,
    backgroundColor: "skyblue",
    margin: 20,
    padding: 20,
    borderRadius: 30,
  },
});
