import BigButton from "@/src/components/BigButton";
import GameCard from "@/src/components/GameCard";
import HeaderBack from "@/src/components/HeaderBack";
import TeamRecord from "@/src/components/TeamRecord";
import { useData } from "@/src/contexts/DataContext";
import { GlobalStyles } from "@/src/styles/global";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { FlatList, Text, View } from "react-native";

export default function Games() {
  const { teams, games } = useData();
  const { teamId } = useLocalSearchParams<{ teamId: string }>();
  const router = useRouter();

  const currentTeam = teams.find((t) => t.id === teamId);
  if (!currentTeam) return <Text>Team not found</Text>;

  const currentGames = games.filter((game) =>
    currentTeam?.gameIDs.includes(game.id),
  );

  return (
    <View style={GlobalStyles.container}>
      <Stack.Screen
        options={{ headerLeft: (props) => <HeaderBack {...props} /> }}
      />
      <View style={GlobalStyles.titleContainer}>
        <Text style={GlobalStyles.headingText}>{currentTeam.name}</Text>
        <TeamRecord
          games={currentGames}
          style={[GlobalStyles.headingText, { color: "white" }]}
        />
      </View>
      <View style={[GlobalStyles.contentContainer, { flex: 7 }]}>
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
      <View style={{ flex: 1, justifyContent: "flex-end" }}>
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
    </View>
  );
}
