import { useData } from "@/src/contexts/DataContext";
import { GlobalStyles } from "@/src/styles/global";
import { useLocalSearchParams } from "expo-router";
import { StyleSheet, Switch, Text, View } from "react-native";

export default function PlayerIndex() {
  const { playerId } = useLocalSearchParams();
  const { players, togglePlayerAvailability } = useData();
  const player = players.find((p) => p.id === playerId);

  if (!player) return <Text> Player not found</Text>;

  return (
    <View style={GlobalStyles.container}>
      <View style={styles.rowContainer}>
        <Text style={styles.displayText}>Number: </Text>
        <Text style={styles.displayText}>{player.number}</Text>
      </View>
      <View style={styles.rowContainer}>
        <Text style={styles.displayText}>Playing: </Text>
        <Switch
          onValueChange={() => togglePlayerAvailability(player.id)}
          value={player.active}
        />
      </View>
      {/* TODO add an edit button */}
      {/* TODO add toggle for status */}
      {/* TODO add delete button */}
    </View>
  );
}

const styles = StyleSheet.create({
  displayText: {
    fontSize: 20,
  },
  rowContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 5,
    marginLeft: 15,
    marginRight: 15,
  },
});
