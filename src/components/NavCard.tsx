import Ionicons from "@expo/vector-icons/Ionicons";
import { Href, useRouter } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Colors } from "../styles/global";

export default function NavCard({
  title,
  route,
}: {
  title: string;
  route: Href;
}) {
  const router = useRouter();
  return (
    <Pressable onPress={() => router.push(route)}>
      <View style={styles.rowItem}>
        <Text style={styles.titleText}>{title}</Text>
        <Ionicons name="chevron-forward" size={20} color="black" />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  rowItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    alignItems: "center",
    backgroundColor: Colors.brandAccent,
  },
  titleText: {
    fontSize: 20,
    maxWidth: "90%",
  },
});
