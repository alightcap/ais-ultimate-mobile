import Ionicons from "@expo/vector-icons/Ionicons";
import { StyleSheet, Text, View } from "react-native";
import { useData } from "../contexts/DataContext";
import { Colors } from "../styles/global";

export default function RosterPlayerCard({ playerId }: { playerId: string }) {
  const { players } = useData();

  const player = players.find((p) => p.id === playerId);
  if (!player) return null;

  return (
    <View style={styles.container}>
      <Ionicons
        name={player.active ? "shirt" : "shirt-outline"}
        size={20}
        color={Colors.brandPrimary}
      />
      <Text
        style={[styles.nameText, !player.active && styles.inactiveNameText]}
      >
        {player.name}
      </Text>
      <Text
        style={[styles.nameText, !player.active && styles.inactiveNameText]}
      >
        ({player.number})
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    // paddingHorizontal: 10,
  },
  nameText: {
    fontSize: 20,
    marginLeft: 15,
  },
  inactiveNameText: {
    color: Colors.textMuted,
  },
});
