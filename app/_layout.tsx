import { TeamContextType } from "@/src/lib/types";

import { TeamProvider } from "@/src/contexts/TeamListContext";
import { Stack } from "expo-router";
import { createContext, useContext } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";

const TeamListContext = createContext<TeamContextType | undefined>(undefined);

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

export const useTeams = () => {
  const context = useContext(TeamListContext);
  if (context === undefined) {
    throw new Error("useTeams must be defined within a TeamContext.Provider");
  }
  return context;
};
