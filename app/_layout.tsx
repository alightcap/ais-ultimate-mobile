import { TeamsProvider } from "@/src/contexts/TeamsContext";
import { Stack } from "expo-router";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1 }}>
        <TeamsProvider>
          <Stack screenOptions={{ headerBackButtonDisplayMode: "minimal" }}>
            <Stack.Screen name="index" options={{ title: "My Teams" }} />
            <Stack.Screen name="newTeam" options={{ title: "New Team" }} />
          </Stack>
        </TeamsProvider>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
