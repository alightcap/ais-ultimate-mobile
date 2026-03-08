import Ionicons from "@expo/vector-icons/Ionicons";
import { StyleSheet, Text, View } from "react-native";

export default function NavCard({ title }: { title: string }) {
  return (
    <View style={styles.rowItem}>
      <Text style={styles.titleText}>{title}</Text>
      <Ionicons name="chevron-forward" size={20} color="black" />
    </View>
  );
}

const styles = StyleSheet.create({
  rowItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 8,
    marginTop: 2,
    backgroundColor: "skyblue",
    alignItems: "center",
    minHeight: 44,
    borderRadius: 10,
  },
  titleText: {
    fontSize: 20,
    maxWidth: "90%",
  },
});
