import AntDesign from "@expo/vector-icons/AntDesign";
import { StyleSheet, Text, View } from "react-native";

export default function ListRowItem({ title }: { title: string }) {
  return (
    <View style={styles.rowItem}>
      <Text style={styles.titleText}>{title}</Text>
      <AntDesign name="right" size={20} color="black" />
    </View>
  );
}

const styles = StyleSheet.create({
  rowItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    marginTop: 2,
    marginLeft: 5,
    marginRight: 5,
    backgroundColor: "skyblue",
  },
  titleText: {
    fontSize: 20,
  },
});
