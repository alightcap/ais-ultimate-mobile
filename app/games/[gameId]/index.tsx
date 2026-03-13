import ScoreBoard from "@/src/components/ScoreBoard";
import { useData } from "@/src/contexts/DataContext";
import { Colors, GlobalStyles } from "@/src/styles/global";
import { getDateTimeString } from "@/src/utils/dates";
import { useLocalSearchParams, useRouter } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

export default function GameIndex() {
  const router = useRouter();
  const { games, teams, players } = useData();
  const { gameId } = useLocalSearchParams<{ gameId: string }>();

  const currentGame = games.find((g) => g.id === gameId);
  if (!currentGame)
    return <Text style={GlobalStyles.empty}>Game not found</Text>;

  const currentTeam = teams.find((t) => t.id === currentGame.teamId);
  if (!currentTeam)
    return <Text style={GlobalStyles.empty}>Team not found</Text>;

  const roster = players.filter((p) => currentTeam.playerIDs.includes(p.id));

  const { timeStamp, eventName, opponentName } = currentGame;

  return (
    <View style={GlobalStyles.container}>
      <View style={styles.rowItem}>
        <Text style={styles.scoreText}>{getDateTimeString(timeStamp)}</Text>
        <ScoreBoard game={currentGame} style={{ fontSize: 16 }} />
      </View>
      <View style={styles.rowItem}>
        <Text style={styles.itemHeadingText}>Opponent</Text>
        <Text style={styles.itemText}>{opponentName}</Text>
      </View>
      <View style={styles.rowItem}>
        <Text style={styles.itemHeadingText}>Event</Text>
        <Text>{eventName}</Text>
      </View>
      <View style={styles.rowItem}>
        <Text style={styles.itemHeadingText}>Statistics</Text>
        <Text>Nav Arrow</Text>
      </View>
      <View style={styles.rowItem}>
        <Text style={styles.itemHeadingText}>Recap</Text>
        <Text>Nav Arrow</Text>
      </View>
      <Text>Game Configuration</Text>
      <View style={styles.rowItem}>
        <Text style={styles.itemHeadingText}>Starting on</Text>
        <Text>Offense or Defence</Text>
        {/** add a toggle switch */}
      </View>
      <View style={styles.rowItem}>
        <Text style={styles.itemHeadingText}>Game To</Text>
        <Text>Odd number or Time</Text>
        {/** add a toggle switch? or decide what to do */}
      </View>
      <View style={styles.rowItem}>
        <Text style={styles.itemHeadingText}>Timeouts</Text>
        <Text>per half/floaters/taken</Text>
      </View>
      {/* <View style={styles.rowItem}>
        <Text style={styles.itemHeadingText}>Wind</Text>
        <Text>Details</Text>
        <Text>Nav Arrow</Text>
      </View> */}
    </View>
  );
}

const styles = StyleSheet.create({
  rowItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
    alignItems: "center",
    backgroundColor: Colors.surface,
  },
  itemText: {
    fontSize: 22,
  },
  scoreText: {
    fontSize: 19,
  },
  itemHeadingText: {
    fontWeight: "bold",
    fontSize: 18,
  },
  winning: {
    color: Colors.brandPrimary,
  },
  losing: {
    color: Colors.error,
  },
});
