import ListRowItem from "@/src/components/ListRowItem";
import { useData } from "@/src/contexts/DataContext";
import { Stack, router, useLocalSearchParams } from "expo-router";
import { Button, Pressable, StyleSheet, Text, View } from "react-native";

export default function TeamIndex() {
  const { teamId } = useLocalSearchParams();
  const { teams } = useData();
  const team = teams.find((t) => t.id === teamId);

  if (!team) return <Text>Team not found</Text>;

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: team.name,
          headerRight: () => (
            <Button
              title="Edit"
              onPress={() => router.push(`/team/${teamId}/editTeam`)}
            />
          ),
        }}
      />
      <View style={styles.teamContainer}>
        <Pressable onPress={() => router.push(`/team/${team.id}/players`)}>
          <ListRowItem title={"Players"} />
        </Pressable>
        <Pressable onPress={() => router.push(`/team/${team.id}/games`)}>
          <ListRowItem title={"Games"} />
        </Pressable>
      </View>

      {/* TODO add copy or rollover button and functionality */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 5,
  },
  teamContainer: {
    flex: 1,
  },
  titleText: {
    fontSize: 25,
    textAlign: "center",
  },
});
