import ListRowItem from "@/src/components/ListRowItem";
import NewButton from "@/src/components/NewButton";
import { usePlayers } from "@/src/contexts/PlayersContext";
import { router } from "expo-router";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";

export default function Players() {
  const { players } = usePlayers();

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
    <View style={styles.container}>
      <Text style={styles.header}>Roster</Text>
      <View style={styles.listContainer}>
        <FlatList
          data={players}
          renderItem={({ item }) => (
            <Pressable onPress={() => router.push(`./player/${item.id}`)}>
              <ListRowItem title={item.name} />
            </Pressable>
          )}
        />
      </View>
      <NewButton route="./newPlayer" title="New Player" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    fontSize: 24,
    textAlign: "center",
    margin: 5,
  },
  listContainer: {
    flex: 1,
  },
});
