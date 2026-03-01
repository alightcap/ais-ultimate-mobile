import { CurrentTeamProvider } from "@/src/contexts/CurrentTeamContext";
import { useTeams } from "@/src/contexts/TeamsContext";
import { Stack, useLocalSearchParams } from "expo-router";
import { Text, View } from "react-native";

export default function RootTeamLayout() {
  const { id } = useLocalSearchParams();
  const { teams } = useTeams();

  const currentTeam = teams.find((t) => t.id === id);

  if (!currentTeam) {
    return (
      <View>
        <Text>Team Not Found</Text>
      </View>
    );
  }

  return (
    <CurrentTeamProvider team={currentTeam}>
      <Stack
        screenOptions={{
          headerTitle: currentTeam?.name ?? "Team Details",
          headerShown: true,
        }}
      >
        <Stack.Screen name="[id]" options={{ headerShown: false }} />
      </Stack>
    </CurrentTeamProvider>
  );
}
