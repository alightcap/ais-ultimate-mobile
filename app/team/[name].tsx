import { useTeams } from "@/src/contexts/TeamsContext";
import { CloudStatus } from "@/src/lib/types";
import AntDesign from "@expo/vector-icons/AntDesign";
import { Stack, useLocalSearchParams } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

const getCLoudIcon = (status: CloudStatus) => {
  switch (status) {
    case "Local":
      return { name: "cloud-upload", color: "grey" };
    case "Pending":
      return { name: "cloud-sync", color: "black" };
    case "Synced":
      return { name: "cloud", color: "black" };
  }
};

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

  const iconConfig = getCLoudIcon(team.cloudStatus);
  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: "Team" }} />
      <Text style={styles.titleText}>{team.name}</Text>
      <AntDesign
        name={iconConfig.name as any}
        size={20}
        color={iconConfig.color}
      />
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
