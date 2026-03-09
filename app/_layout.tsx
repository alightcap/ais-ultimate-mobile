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
        <Stack.Screen name="team/newTeam" options={{ title: "New Team" }} />
        <Stack.Screen name="team/[teamId]" options={{ headerShown: false }} />
        <Stack.Screen name="player/newPlayer" />
        <Stack.Screen
          name="player/[playerId]"
          options={{ headerShown: false }}
        />
      </Stack>
    </DataProvider>
  );
}
