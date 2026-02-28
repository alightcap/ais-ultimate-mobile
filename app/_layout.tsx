import { TeamProvider } from "@/src/contexts/TeamListContext";
import { Stack } from "expo-router";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1 }}>
        <TeamProvider>
          <Stack screenOptions={{ headerBackButtonDisplayMode: "minimal" }}>
            <Stack.Screen name="index" options={{ title: "My Teams" }} />
            <Stack.Screen name="newTeam" options={{ title: "New Team" }} />
          </Stack>
        </TeamProvider>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
