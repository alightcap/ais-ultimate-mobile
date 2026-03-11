import NavCard from "@/src/components/NavCard";
import { useData } from "@/src/contexts/DataContext";
import { GlobalStyles } from "@/src/styles/global";
import { Stack, router, useLocalSearchParams } from "expo-router";
import { Button, Text, View } from "react-native";

export default function TeamIndex() {
  const { teamId } = useLocalSearchParams();
  const { teams, toggleArchiveEntity } = useData();
  const team = teams.find((t) => t.id === teamId);

  if (!team) return <Text>Team not found</Text>;

  return (
    <View style={GlobalStyles.container}>
      <Stack.Screen
        options={{
          title: team.name,
          headerRight: () => (
            <Button
              title="Edit"
              onPress={() => router.push(`/teams/${teamId}/editTeam`)}
            />
          ),
        }}
      />
      <View style={GlobalStyles.listContainer}>
        <NavCard route={`/teams/${team.id}/roster`} title={"Players"} />
        <NavCard route={`/teams/${team.id}/games`} title={"Games"} />
      </View>
      <View style={{ margin: 20 }}>
        <Button
          title={team.isArchived ? "Unarchive" : "Archive"}
          color={team.isArchived ? "blue" : "red"}
          onPress={() =>
            toggleArchiveEntity("teams", team.id, !team.isArchived)
          }
        />
      </View>
    </View>
  );
}
