import { TeamsProvider } from "@/src/contexts/TeamsContext";
import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <TeamsProvider>
      <Stack screenOptions={{ headerBackButtonDisplayMode: "minimal" }}>
        <Stack.Screen name="index" options={{ title: "My Teams" }} />
        <Stack.Screen name="newTeam" options={{ title: "New Team" }} />
        <Stack.Screen name="team" options={{ headerShown: false }} />
      </Stack>
    </TeamsProvider>
  );
}
