import AntDesign from "@expo/vector-icons/AntDesign";
import { StyleSheet, Text, View } from "react-native";
import { Team } from "../lib/types";

export default function TeamListRow({ name, id }: Team) {
  return (
    <View style={styles.container}>
      <Text style={styles.nameText}>{name}</Text>
      <AntDesign name="right" size={20} color="black" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    marginTop: 2,
    marginBottom: 2,
    marginLeft: 5,
    marginRight: 5,
    backgroundColor: "skyblue",
  },
  nameText: {
    fontSize: 20,
  },
});
