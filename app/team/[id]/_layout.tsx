import BackButton from "@/src/components/BackButton";
import { useCurrentTeam } from "@/src/contexts/CurrentTeamContext";
import { Stack } from "expo-router";

export default function TeamLayout() {
  const { team } = useCurrentTeam();

  return (
    <Stack
      screenOptions={{
        headerTitle: team.name,
        headerLeft: BackButton,
      }}
    >
      <Stack.Screen name="index" options={{ title: "Overview" }} />
      <Stack.Screen name="players" options={{ title: "Roster" }} />
    </Stack>
  );
}
