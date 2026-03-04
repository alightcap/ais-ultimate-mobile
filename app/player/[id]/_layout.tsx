import { CurrentPlayerProvider } from "@/src/contexts/CurrentPlayerContext";
import { useTeams } from "@/src/contexts/TeamsContext";
import { HeaderBackButton } from "@react-navigation/elements";
import { router, Stack, useLocalSearchParams } from "expo-router";
import { Text, View } from "react-native";

export default function PlayerLayout() {
  const { id } = useLocalSearchParams();
  const { teams } = useTeams();

  const team = teams.find((t) => t.players.some((p) => p.id === id));
  if (!team) return null;

  const currentPlayer = team.players.find((p) => p.id === id);

  if (!currentPlayer) {
    return (
      <View>
        <Text>Player Not Found</Text>
      </View>
    );
  }

  return (
    <CurrentPlayerProvider player={currentPlayer}>
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
        <Stack.Screen name="index" />
      </Stack>
    </CurrentPlayerProvider>
  );
}
