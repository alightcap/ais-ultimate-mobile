import NavCard from "@/src/components/NavCard";
import NewButton from "@/src/components/NewButton";
import { useData } from "@/src/contexts/DataContext";
import { GlobalStyles } from "@/src/styles/global";
import { router, useLocalSearchParams } from "expo-router";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";

export default function Players() {
  const { teams, players } = useData();
  const { teamId } = useLocalSearchParams();

  const currentTeam = teams.find((t) => t.id === teamId);

  const roster = players.filter((player) =>
    currentTeam?.players.includes(player.id),
  );

  if (players.length === 0)
    return (
      <View>
        <Text>There are no players to display</Text>
        {/* style these text elements */}
        <Text>Add Players</Text>
        {/* this will be a button */}
      </View>
    );

  return (
    <View style={GlobalStyles.container}>
      <Text style={GlobalStyles.headingText}>Roster</Text>
      <View style={styles.listContainer}>
        <FlatList
          data={roster}
          renderItem={({ item }) => (
            <Pressable onPress={() => router.push(`./player/${item.id}`)}>
              <NavCard title={item.name} />
            </Pressable>
          )}
        />
      </View>
      <NewButton route="./newPlayer" title="New Player" />
    </View>
  );
}

const styles = StyleSheet.create({
  listContainer: {
    flex: 1,
  },
});
