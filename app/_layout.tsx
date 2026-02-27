import { TeamProvider } from "@/src/contexts/TeamListContext";
import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <TeamProvider>
        <Stack>
          <Stack.Screen name="index" />
          <Stack.Screen name="newTeam" />
        </Stack>
      </TeamProvider>
    </SafeAreaProvider>
  );
}
