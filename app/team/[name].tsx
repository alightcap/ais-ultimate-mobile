import { useTeams } from "@/src/contexts/TeamListContext";
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
    <View style={styles.container}>
      <Stack.Screen options={{ title: team.name }} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 5,
  },
});
