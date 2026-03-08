import { PlayersProvider } from "@/src/contexts/PlayersContext";
import { useTeams } from "@/src/contexts/TeamsContext";
import { HeaderBackButton } from "@react-navigation/elements";
import { router, Stack, useLocalSearchParams } from "expo-router";
import { Text } from "react-native";

export default function TeamLayout() {
  const { teamId } = useLocalSearchParams();
  const { teams } = useTeams();
  const team = teams.find((t) => t.id === teamId);

  if (!team) return <Text>Team not found</Text>;

  return (
    <PlayersProvider team={team}>
      <Stack
        screenOptions={{
          headerTitle: team.name,
          headerTintColor: "black",
          headerLeft: (props) => (
            <HeaderBackButton
              {...props}
              displayMode="minimal"
              onPress={() => router.back()}
              style={{ marginRight: -10 }}
            />
          ),
          headerTitleAlign: "center",
        }}
      >
        <Stack.Screen name="players" options={{ title: "Roster" }} />
        <Stack.Screen name="index" />
        <Stack.Screen name="games" />
        <Stack.Screen
          name="player/[playerId]"
          options={{ headerShown: false }}
        />
        <Stack.Screen name="newPlayer" />
        <Stack.Screen name="editTeam" />
      </Stack>
    </PlayersProvider>
  );
}
