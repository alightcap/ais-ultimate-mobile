import ListRowItem from "@/src/components/ListRowItem";
import { useTeams } from "@/src/contexts/TeamsContext";
import { router, useLocalSearchParams } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";

export default function TeamIndex() {
  const { id } = useLocalSearchParams();
  const { teams } = useTeams();
  const team = teams.find((t) => t.id === id);

  if (!team) return <Text>Team not found</Text>;

  return (
    <View style={styles.container}>
      <Pressable onPress={() => router.push(`/team/${team.id}/players`)}>
        <ListRowItem title={"Players"} />
      </Pressable>
      <Pressable onPress={() => router.push(`/team/${team.id}/games`)}>
        <ListRowItem title={"Games"} />
      </Pressable>
      {/* TODO add delete button and functionality */}
      {/* TODO add copy or rollover button and functionality */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 5,
  },
  titleText: {
    fontSize: 25,
    textAlign: "center",
  },
});
