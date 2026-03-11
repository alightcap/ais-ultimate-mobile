import { useData } from "@/src/contexts/DataContext";
import { HeaderBackButton } from "@react-navigation/elements";
import { router, Stack, useLocalSearchParams } from "expo-router";
import { Text } from "react-native";

export default function TeamLayout() {
  const { teamId } = useLocalSearchParams();
  const { teams } = useData();
  const team = teams.find((t) => t.id === teamId);

  if (!team) return <Text>Team not found</Text>;

  return (
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
      <Stack.Screen name="index" />
      <Stack.Screen name="roster" options={{ title: "Roster" }} />
      <Stack.Screen name="games" />
      <Stack.Screen name="editTeam" />
    </Stack>
  );
}
