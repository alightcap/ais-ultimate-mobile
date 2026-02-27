import AntDesign from "@expo/vector-icons/AntDesign";
import { Text, View } from "react-native";
import { Team } from "../lib/types";

export default function TeamListRow({ teamName, id }: Team) {
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 10,
        margin: 5,
        backgroundColor: "skyblue",
      }}
    >
      <Text style={{ fontSize: 20 }}>{teamName}</Text>
      <Text style={{ fontSize: 20 }}>
        <AntDesign name="right" size={24} color="black" />
      </Text>
    </View>
  );
}
