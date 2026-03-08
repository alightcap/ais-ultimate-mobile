import Ionicons from "@expo/vector-icons/Ionicons";
import { useRouter } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Team } from "../lib/types";

export default function TeamCard({ team }: { team: Team }) {
  const router = useRouter();

  return (
    <Pressable onPress={() => router.push(`/team/${team.id}`)}>
      <View style={styles.rowItem}>
        <Text style={styles.nameText}>{team.name}</Text>
        <Ionicons name="chevron-forward" size={20} color="black" />
      </View>
    </Pressable>
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
  nameText: {
    fontSize: 20,
    maxWidth: "90%",
  },
});
