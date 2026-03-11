import { useData } from "@/src/contexts/DataContext";
import { HeaderBackButton } from "@react-navigation/elements";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { Button, Text } from "react-native";

export default function TeamLayout() {
  const router = useRouter();
  const { teamId } = useLocalSearchParams<{ teamId: string }>();
  const { teams } = useData();
  const team = teams.find((t) => t.id === teamId);

  if (!team) return <Text>Team not found</Text>;

  return (
    <Stack screenOptions={{ headerBackButtonDisplayMode: "minimal" }}>
      <Stack.Screen
        name="index"
        options={{
          title: "Team Details",
          headerRight: () => (
            <Button
              title="Edit"
              onPress={() => router.push(`/teams/${teamId}/editTeam`)}
            />
          ),
          headerTintColor: "black",
          headerLeft: (props) => (
            <HeaderBackButton
              {...props}
              displayMode="minimal"
              onPress={() => router.back()}
              style={{ marginRight: -10 }}
            />
          ),
        }}
      />
      <Stack.Screen name="roster" options={{ title: `${team.name}` }} />
      <Stack.Screen name="games" />
      <Stack.Screen name="editTeam" />
    </Stack>
  );
}
