import { useTeams } from "@/src/contexts/TeamsContext";
import { HeaderBackButton } from "@react-navigation/elements";
import { router, Stack, useLocalSearchParams } from "expo-router";
import { Text, View } from "react-native";

export default function PlayerLayout() {
  const { playerId } = useLocalSearchParams();
  const { teams } = useTeams();

  const team = teams.find((t) => t.players.some((p) => p.id === playerId));
  if (!team) return null;

  const currentPlayer = team.players.find((p) => p.id === playerId);

  if (!currentPlayer) {
    return (
      <View>
        <Text>Player Not Found</Text>
      </View>
    );
  }

  return (
    <Stack
      screenOptions={{
        headerTitle: `${currentPlayer.name} Details`,
        headerTintColor: "black",
        headerLeft: (props) => (
          <HeaderBackButton
            {...props}
            displayMode="minimal"
            onPress={() => router.back()}
            style={{ marginRight: -10 }}
          />
        ),
      }}
    >
      <Stack.Screen
        name="index"
        options={{ title: `${currentPlayer.name} Details` }}
      />
    </Stack>
  );
}
