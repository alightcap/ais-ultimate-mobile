import EditButton from "@/src/components/EditButton";
import ScoreBoard from "@/src/components/ScoreBoard";
import StartOnToggle from "@/src/components/StartingOnToggle";
import { useData } from "@/src/contexts/DataContext";
import { StartingOnMode } from "@/src/lib/types";
import { Colors, GlobalStyles } from "@/src/styles/global";
import { getDateTimeString } from "@/src/utils/dates";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";

export default function GameIndex() {
  const router = useRouter();
  const { games, teams, players, updateGame } = useData();
  const { gameId } = useLocalSearchParams<{ gameId: string }>();

  const currentGame = games.find((g) => g.id === gameId);

  const currentTeam = teams.find((t) => t.id === currentGame?.teamId);

  const roster = players.filter((p) => currentTeam?.playerIDs.includes(p.id));
  const [startingOn, setStartingOn] = useState<StartingOnMode>(
    currentGame?.startingOn ?? "offense",
  );

  if (!currentGame) return <Text>Game not found</Text>;
  if (!currentTeam) return <Text>Team not found</Text>;
  const { timeStamp, eventName, opponentName } = currentGame;

  const handleStartingOnChange = async (newMode: "offense" | "defense") => {
    setStartingOn(newMode);
    await updateGame({ ...currentGame, startingOn: newMode });
  };

  return (
    <View style={GlobalStyles.container}>
      <Stack.Screen
        options={{
          headerRight: () => (
            <EditButton
              route={{
                pathname: "/games/[gameId]/editGame",
                params: { gameId: gameId },
              }}
            />
          ),
        }}
      />
      <Text style={GlobalStyles.headingText}>{currentTeam.name}</Text>
      <ScoreBoard game={currentGame} style={GlobalStyles.headingText} />
      <View style={styles.rowItem}>
        <Text style={styles.itemHeadingText}>Date</Text>
        <Text style={styles.scoreText}>{getDateTimeString(timeStamp)}</Text>
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
        <Text style={styles.itemHeadingText}>Weather</Text>
        <Text>weatherKit</Text>
      </View>
      <View style={styles.rowItem}>
        <Text style={styles.itemHeadingText}>Statistics</Text>
        <Text>Nav Arrow</Text>
      </View>
      <View style={styles.rowItem}>
        <Text style={styles.itemHeadingText}>Recap</Text>
        <Text>Nav Arrow</Text>
      </View>
      <Text style={GlobalStyles.headingText}>Configuration</Text>
      <View style={styles.rowItem}>
        <Text style={styles.itemHeadingText}>Starting on</Text>
        {/* <Text>Offense or Defense</Text> */}
        <StartOnToggle
          currentMode={startingOn}
          onModeChange={handleStartingOnChange}
        />
        {/** add a toggle switch */}
      </View>
      <View style={styles.rowItem}>
        <Text style={styles.itemHeadingText}>Game To</Text>
        <Text>Odd number</Text>
        {/** add a toggle switch? or decide what to do */}
      </View>
      <View style={styles.rowItem}>
        <Text style={styles.itemHeadingText}>Hard Cap</Text>
        <Text>Time minutes</Text>
        {/** add a toggle switch? or decide what to do */}
        {/** how to add a push notification, or alarm, when hard cap goes on */}
      </View>
      <View style={styles.rowItem}>
        <Text style={styles.itemHeadingText}>Half At</Text>
        <Text>Half points, time, or first</Text>
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
});
