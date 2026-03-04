import { useCurrentTeam } from "@/src/contexts/CurrentTeamContext";
import { PlayersProvider } from "@/src/contexts/PlayersContext";
import { HeaderBackButton } from "@react-navigation/elements";
import { router, Stack } from "expo-router";

export default function TeamLayout() {
  const { team } = useCurrentTeam();

  return (
    <PlayersProvider team={team}>
      <Stack
        screenOptions={{
          headerTitle: team.name,
          headerTintColor: "black",
          headerLeft: (props) => (
            <HeaderBackButton
              {...props}
              displayMode="minimal"
              onPress={() => router.back()}
              style={{ marginRight: -10 }}
            />
          ),
          headerTitleAlign: "center",
        }}
      >
        <Stack.Screen name="index" options={{ title: "Overview" }} />
        <Stack.Screen name="players" options={{ title: "Roster" }} />
      </Stack>
    </PlayersProvider>
  );
}
