import ScoreBoard from "@/src/components/ScoreBoard";
import { useData } from "@/src/contexts/DataContext";
import { Colors, GlobalStyles } from "@/src/styles/global";
import { Stack, useLocalSearchParams } from "expo-router";
import { Text, View } from "react-native";

export default function Action() {
  const { gameId } = useLocalSearchParams<{ gameId: string }>();
  const { games, teams, players } = useData();

  const currentGame = games.find((g) => g.id === gameId);
  if (!currentGame) return <Text>Game not found</Text>;
  const currentTeam = teams.find((t) => t.id === currentGame.teamId);
  if (!currentTeam) return <Text>Team not found</Text>;
  const roster = players.filter((p) => currentTeam.playerIDs.includes(p.id));
  const activePlayers = roster.filter((p) => p.active);

  return (
    <View>
      <Stack.Screen options={{ headerTitle: "Action" }} />
      <View style={{ borderBottomWidth: 2, borderBottomColor: Colors.border }}>
        <ScoreBoard
          game={currentGame}
          style={[GlobalStyles.headingText, { color: Colors.white }]}
        />
      </View>
      <View style={GlobalStyles.contentContainer}>
        <Text>{activePlayers.map((p) => p.name)}</Text>
      </View>
    </View>
  );
}
