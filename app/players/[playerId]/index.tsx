import EditButton from "@/src/components/EditButton";
import { useData } from "@/src/contexts/DataContext";
import { Colors, GlobalStyles } from "@/src/styles/global";
import { Stack, useLocalSearchParams } from "expo-router";
import { StyleSheet, Switch, Text, View } from "react-native";

export default function PlayerIndex() {
  const { playerId } = useLocalSearchParams<{ playerId: string }>();
  const { players, togglePlayerAvailability } = useData();
  const player = players.find((p) => p.id === playerId);

  if (!player) return <Text> Player not found</Text>;

  return (
    <View style={GlobalStyles.container}>
      <Stack.Screen
        options={{
          headerRight: () => (
            <EditButton
              route={{
                pathname: "/players/[playerId]/editPlayer",
                params: { playerId: playerId },
              }}
            />
          ),
        }}
      />
      <Text style={GlobalStyles.headingText}>{player.name}</Text>
      <View style={styles.rowContainer}>
        <Text style={styles.displayText}>Number: </Text>
        <Text style={styles.displayText}>{player.number}</Text>
      </View>
      <View style={styles.rowContainer}>
        <Text style={styles.displayText}>Playing: </Text>
        <Switch
          onValueChange={() => togglePlayerAvailability(player.id)}
          value={player.active}
          trackColor={{ true: Colors.brandAccent }}
        />
      </View>
      {/* TODO add an edit button */}
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
