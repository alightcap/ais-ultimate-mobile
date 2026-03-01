import { CurrentTeamProvider } from "@/src/contexts/CurrentTeamContext";
import { useTeams } from "@/src/contexts/TeamsContext";
import Fontisto from "@expo/vector-icons/Fontisto";
import { Stack, useLocalSearchParams } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

export default function Team() {
  const { name } = useLocalSearchParams();
  const { teams } = useTeams();

  const team = teams.find((t) => t.name === name);

  if (!team)
    return (
      <View>
        <Text>Team not found</Text>
      </View>
    );

  return (
    <CurrentTeamProvider id={team.id}>
      <View style={styles.container}>
        <Stack.Screen options={{ title: "Team" }} />
        <Text style={styles.titleText}>{team.name}</Text>
        <View style={styles.cloudIconContainer}>
          {team.hasUploads && (
            <Fontisto
              name="cloud-up"
              size={20}
              color="black"
              style={styles.icon}
            />
          )}
          {team.hasDownloads && (
            <Fontisto
              name="cloud-down"
              size={20}
              color="black"
              style={styles.icon}
            />
          )}
        </View>
        <Text>Players</Text>
      </View>
    </CurrentTeamProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 5,
  },
  cloudIconContainer: {
    flexDirection: "row",
  },
  icon: {
    margin: 2,
  },
  titleText: {
    fontSize: 25,
    textAlign: "center",
  },
});
