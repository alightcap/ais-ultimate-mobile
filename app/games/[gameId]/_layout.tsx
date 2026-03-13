import HeaderBack from "@/src/components/HeaderBack";
import { useData } from "@/src/contexts/DataContext";
import { GlobalStyles } from "@/src/styles/global";
import { DefaultStackOptions } from "@/src/styles/navigation";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { Text } from "react-native";

export default function GameLayout() {
  const { gameId } = useLocalSearchParams();
  const { games, teams } = useData();
  const router = useRouter();

  const currentGame = games.find((g) => g.id === gameId);
  if (!currentGame)
    return <Text style={GlobalStyles.empty}>Game not found.</Text>;

  const teamId = currentGame.teamId;
  const currentTeam = teams.find((t) => t.id === teamId);
  if (!currentTeam) {
    return <Text style={GlobalStyles.empty}>Team not found.</Text>;
  }

  return (
    <Stack screenOptions={DefaultStackOptions}>
      <Stack.Screen
        name="index"
        options={{
          title: `${currentTeam.name}`,
          headerShown: true,
          headerLeft: (props) => (
            <HeaderBack {...props} />
            // <HeaderBackButton
            //   {...props}
            //   displayMode="minimal"
            //   onPress={() => router.back()}
            //   style={{ marginRight: -45 }}
            // />
          ),
        }}
      />
    </Stack>
  );
}
