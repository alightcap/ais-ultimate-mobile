import NavCard from "@/src/components/NavCard";
import NewButton from "@/src/components/NewButton";
import { useData } from "@/src/contexts/DataContext";
import { GlobalStyles } from "@/src/styles/global";
import { getDate } from "@/src/utils/dates";
import { useLocalSearchParams } from "expo-router";
import { FlatList, Text, View } from "react-native";

export default function Games() {
  const { teams, games } = useData();
  const { teamId } = useLocalSearchParams();

  const currentTeam = teams.find((t) => t.id === teamId);

  const currentGames = games.filter((game) =>
    currentTeam?.gameIDs.includes(game.id),
  );

  return (
    <View style={GlobalStyles.container}>
      <Text style={GlobalStyles.headingText}>Games</Text>
      <View style={GlobalStyles.listContainer}>
        <FlatList
          data={currentGames}
          renderItem={({ item }) => (
            <NavCard
              route={`./game/${item.id}`}
              title={`vs. ${item.opponent} ${getDate(item.timeStamp)}`}
            />
          )}
          ListEmptyComponent={
            <Text style={GlobalStyles.headingText}>
              There are no games to display
            </Text>
          }
        />
      </View>
      <NewButton route="./newGame" title="NewPlayer" />
    </View>
  );
}
