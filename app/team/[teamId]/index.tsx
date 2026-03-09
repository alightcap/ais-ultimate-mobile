import NavCard from "@/src/components/NavCard";
import { useData } from "@/src/contexts/DataContext";
import { GlobalStyles } from "@/src/styles/global";
import { Stack, router, useLocalSearchParams } from "expo-router";
import { Button, Text, View } from "react-native";

export default function TeamIndex() {
  const { teamId } = useLocalSearchParams();
  const { teams } = useData();
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
              onPress={() => router.push(`/team/${teamId}/editTeam`)}
            />
          ),
        }}
      />
      <NavCard route={`/team/${team.id}/players`} title={"Players"} />
      <NavCard route={`/team/${team.id}/games`} title={"Games"} />
      {/** TODO add archive button if unarchived, unarchive button if archived */}
      {/* TODO add copy or rollover button and functionality */}
    </View>
  );
}
