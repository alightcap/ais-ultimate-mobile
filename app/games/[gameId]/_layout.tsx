import HeaderBack from "@/src/components/HeaderBack";
import { useData } from "@/src/contexts/DataContext";
import { GlobalStyles } from "@/src/styles/global";
import { DefaultStackOptions } from "@/src/styles/navigation";
import { Stack, useLocalSearchParams } from "expo-router";
import { Text } from "react-native";

export default function GameLayout() {
  const { gameId } = useLocalSearchParams();
  const { games, teams } = useData();

  const currentGame = games.find((g) => g.id === gameId);
  if (!currentGame)
    return <Text style={GlobalStyles.empty}>Game not found.</Text>;

  const teamId = currentGame.teamId;
  const currentTeam = teams.find((t) => t.id === teamId);
  if (!currentTeam) {
    return <Text style={GlobalStyles.empty}>Team not found.</Text>;
  }

  return (
    <Stack
      screenOptions={{
        ...DefaultStackOptions,
        headerTitle: "Game Details",
        headerLeft: (props) => <HeaderBack {...props} />,
      }}
    >
      <Stack.Screen name="action" />
      <Stack.Screen name="editGame" />
      <Stack.Screen name="index" />
      <Stack.Screen name="recap" />
      <Stack.Screen name="statistics" />
    </Stack>
  );
}
