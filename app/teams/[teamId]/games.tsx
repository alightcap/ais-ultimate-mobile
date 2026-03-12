import BigButton from "@/src/components/BigButton";
import GameCard from "@/src/components/GameCard";
import TeamRecord from "@/src/components/TeamRecord";
import { useData } from "@/src/contexts/DataContext";
import { GlobalStyles } from "@/src/styles/global";
import { useLocalSearchParams, useRouter } from "expo-router";
import { FlatList, Text, View } from "react-native";

export default function Games() {
  const { teams, games } = useData();
  const { teamId } = useLocalSearchParams<{ teamId: string }>();
  const router = useRouter();

  const currentTeam = teams.find((t) => t.id === teamId);

  const currentGames = games.filter((game) =>
    currentTeam?.gameIDs.includes(game.id),
  );

  return (
    <View style={GlobalStyles.container}>
      <Text style={GlobalStyles.headingText}>Games</Text>
      <TeamRecord
        games={currentGames}
        style={{ fontSize: 16, textAlign: "center", marginBottom: 10 }}
      />
      <View style={GlobalStyles.listContainer}>
        <FlatList
          data={currentGames}
          renderItem={({ item }) => <GameCard game={item} />}
          ListEmptyComponent={
            <Text style={GlobalStyles.empty}>
              There are no games to display
            </Text>
          }
        />
      </View>
      <BigButton
        onPress={() =>
          router.push({
            pathname: "/games/newGame",
            params: { teamId: teamId },
          })
        }
        title="New Game"
      />
    </View>
  );
}
