import NavCard from "@/src/components/NavCard";
import NewButton from "@/src/components/NewButton";
import { useData } from "@/src/contexts/DataContext";
import { GlobalStyles } from "@/src/styles/global";
import { useLocalSearchParams } from "expo-router";
import { FlatList, Text, View } from "react-native";

export default function Players() {
  const { teams, players } = useData();
  const { teamId } = useLocalSearchParams();

  const currentTeam = teams.find((t) => t.id === teamId);

  const roster = players.filter((player) =>
    currentTeam?.players.includes(player.id),
  );

  return (
    <View style={GlobalStyles.container}>
      <Text style={GlobalStyles.headingText}>Roster</Text>
      <View style={GlobalStyles.listContainer}>
        <FlatList
          data={roster}
          renderItem={({ item }) => (
            <NavCard route={`/player/${item.id}`} title={item.name} />
          )}
          ListEmptyComponent={
            <Text style={GlobalStyles.headingText}>
              There are no players to display
            </Text>
          }
        />
      </View>
      <NewButton
        route={{ pathname: "/player/newPlayer", params: { teamId: teamId } }}
        title="New Player"
      />
    </View>
  );
}
