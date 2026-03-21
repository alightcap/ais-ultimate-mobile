import BigButton from "@/src/components/BigButton";
import DefenseView from "@/src/components/DefenseView";
import OffenseView from "@/src/components/OffenseView";
import ScoreBoard from "@/src/components/ScoreBoard";
import { useData } from "@/src/contexts/DataContext";
import { Colors, GlobalStyles } from "@/src/styles/global";
import { Stack, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { Text, View } from "react-native";

export default function Action() {
  const { gameId } = useLocalSearchParams<{ gameId: string }>();
  const { games, teams, players } = useData();

  const currentGame = games.find((g) => g.id === gameId);
  const currentTeam = teams.find((t) => t.id === currentGame?.teamId);
  const roster = players.filter((p) => currentTeam?.playerIDs.includes(p.id));
  const activePlayers = roster
    ?.filter((p) => p.active)
    .sort((a, b) => a.name.localeCompare(b.name));
  const [currentLine, setCurrentLine] = useState(
    (currentGame?.currentLine.length ?? 0 > 0)
      ? currentGame?.currentLine
      : activePlayers.slice(0, 7),
  );
  const [currentPoint, setCurrentPoint] = useState(currentGame?.points[-1]);
  const [currentPossession, setCurrentPossession] = useState(
    currentGame?.hasPossession,
  );

  if (!currentGame) return <Text>Game not found</Text>;
  // if (!currentTeam) return <Text>Team not found</Text>;
  // if (!activePlayers) return <Text>Active Players not found</Text>;
  if (!currentLine) return <Text>No Line found</Text>;

  return (
    <View style={GlobalStyles.container}>
      <Stack.Screen options={{ headerTitle: "Action" }} />
      <View style={GlobalStyles.titleContainer}>
        <ScoreBoard
          game={currentGame}
          style={[GlobalStyles.headingText, { color: Colors.white }]}
        />
      </View>
      <View style={GlobalStyles.contentContainer}>
        {currentPossession ? (
          <OffenseView currentLine={currentLine} currentPoint={currentPoint} />
        ) : (
          <DefenseView currentLine={currentLine} currentPoint={currentPoint} />
        )}
      </View>
      <BigButton
        title="SWITCH"
        onPress={() => setCurrentPossession(!currentPossession)}
      />
    </View>
  );
}
