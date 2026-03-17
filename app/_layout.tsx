import { DataProvider } from "@/src/contexts/DataContext";
import { DefaultStackOptions } from "@/src/styles/navigation";
import { Stack } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function RootLayout() {
  return (
    <GestureHandlerRootView>
      <DataProvider>
        <Stack screenOptions={DefaultStackOptions}>
          <Stack.Screen name="index" options={{ title: "UltiAnalytics" }} />
          <Stack.Screen
            name="archivedTeams"
            options={{ title: "UltiAnalytics" }}
          />
          <Stack.Screen
            name="teams/newTeam"
            options={{ title: "UltiAnalytics" }}
          />
          <Stack.Screen
            name="teams/[teamId]"
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="players/newPlayer"
            options={{ title: "New Player" }}
          />
          <Stack.Screen
            name="players/selectExistingPlayers"
            options={{ title: "Add Players" }}
          />
          <Stack.Screen
            name="players/[playerId]"
            options={{ headerShown: false }}
          />
          <Stack.Screen name="games/newGame" />
          <Stack.Screen
            name="games/[gameId]"
            options={{ headerShown: false }}
          />
        </Stack>
      </DataProvider>
    </GestureHandlerRootView>
  );
}
