import EditButton from "@/src/components/EditButton";
import NavCard from "@/src/components/NavCard";
import { useData } from "@/src/contexts/DataContext";
import { GlobalStyles } from "@/src/styles/global";
import { Stack, useLocalSearchParams } from "expo-router";
import { Button, Text, View } from "react-native";

export default function TeamIndex() {
  const { teamId } = useLocalSearchParams<{ teamId: string }>();
  const { teams, toggleArchiveEntity } = useData();
  const team = teams.find((t) => t.id === teamId);

  if (!team) return <Text>Team not found</Text>;

  return (
    <View style={GlobalStyles.container}>
      <Stack.Screen
        options={{
          headerRight: () => (
            <EditButton
              route={{
                pathname: "/teams/[teamId]/editTeam",
                params: { teamId: teamId },
              }}
            />
          ),
        }}
      />
      <View style={GlobalStyles.titleContainer}>
        <Text style={GlobalStyles.headingText}>{team.name}</Text>
      </View>
      <View style={GlobalStyles.contentContainer}>
        <NavCard route={`/teams/${team.id}/roster`} title={"Players"} />
        <NavCard route={`/teams/${team.id}/games`} title={"Games"} />
      </View>
      {/** what's that margin for? */}
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
