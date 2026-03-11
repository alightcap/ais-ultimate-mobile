import { DataProvider } from "@/src/contexts/DataContext";
import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <DataProvider>
      <Stack screenOptions={{ headerBackButtonDisplayMode: "minimal" }}>
        <Stack.Screen name="index" options={{ title: "My Teams" }} />
        <Stack.Screen
          name="archivedTeams"
          options={{ title: "Archived Teams" }}
        />
        <Stack.Screen name="teams/newTeam" options={{ title: "New Team" }} />
        <Stack.Screen name="teams/[teamId]" options={{ headerShown: false }} />
        <Stack.Screen name="players/newPlayer" />
        <Stack.Screen
          name="players/[playerId]"
          options={{ headerShown: false }}
        />
        <Stack.Screen name="games/newGame" />
        <Stack.Screen name="games/[gameId]" />
      </Stack>
    </DataProvider>
  );
}
