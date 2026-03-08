import ListRowItem from "@/src/components/ListRowItem";
import { useTeams } from "@/src/contexts/TeamsContext";
import { Stack, router, useLocalSearchParams } from "expo-router";
import { Alert, Button, Pressable, StyleSheet, Text, View } from "react-native";

export default function TeamIndex() {
  const { teamId } = useLocalSearchParams();
  const { teams, deleteTeam } = useTeams();
  const team = teams.find((t) => t.id === teamId);

  if (!team) return <Text>Team not found</Text>;

  const handleDeleteTeam = (teamId: string, teamName: string) => {
    Alert.alert(
      "Delete Team?",
      `Are you sure you want to delete ${teamName}? \n\nThis will permanently remove all players and games. This action cannot be undone.`,
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete Everything",
          style: "destructive",
          onPress: () => {
            deleteTeam(teamId);
            console.log(`Deleted team ${teamName} and all associated data.`);
            router.back();
          },
        },
      ],
      { cancelable: true },
    );
  };

  return (
    <>
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
      <View style={styles.container}>
        <View style={styles.teamContainer}>
          <Pressable onPress={() => router.push(`/team/${team.id}/players`)}>
            <ListRowItem title={"Players"} />
          </Pressable>
          <Pressable onPress={() => router.push(`/team/${team.id}/games`)}>
            <ListRowItem title={"Games"} />
          </Pressable>
        </View>

        <View style={styles.deleteButton}>
          <Button
            title="Delete Team"
            onPress={() => handleDeleteTeam(team.id, team.name)}
          />
        </View>
        {/* TODO add copy or rollover button and functionality */}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 5,
  },
  deleteButton: {
    marginBottom: 20,
  },
  teamContainer: {
    flex: 1,
  },
  titleText: {
    fontSize: 25,
    textAlign: "center",
  },
});
