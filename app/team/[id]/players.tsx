import ListRowItem from "@/src/components/ListRowItem";
import { usePlayers } from "@/src/contexts/PlayersContext";
import { router } from "expo-router";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";

export default function Players() {
  const { players } = usePlayers();

  return (
    <View>
      <Text style={styles.header}>Players</Text>
      <FlatList
        data={players}
        renderItem={({ item }) => (
          <Pressable onPress={() => router.push(`/player/${item.id}`)}>
            <ListRowItem title={item.name} />
          </Pressable>
        )}
      />
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
});
