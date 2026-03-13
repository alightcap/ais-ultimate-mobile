import HeaderBack from "@/src/components/HeaderBack";
import { useData } from "@/src/contexts/DataContext";
import { DefaultStackOptions } from "@/src/styles/navigation";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { Text } from "react-native";

export default function TeamLayout() {
  const router = useRouter();
  const { teamId } = useLocalSearchParams<{ teamId: string }>();
  const { teams } = useData();
  const currentTeam = teams.find((t) => t.id === teamId);

  if (!currentTeam) return <Text>Team not found</Text>;

  return (
    <Stack screenOptions={DefaultStackOptions}>
      <Stack.Screen
        name="index"
        options={{
          title: "Team Details",
          headerLeft: (props) => (
            <HeaderBack {...props} />
            // <HeaderBackButton
            //   {...props}
            //   displayMode="minimal"
            //   onPress={() => router.back()}
            //   style={{ marginRight: -45 }}
            // />
          ),
        }}
      />
      <Stack.Screen name="roster" options={{ title: `${currentTeam.name}` }} />
      <Stack.Screen name="games" options={{ title: `${currentTeam.name}` }} />
      <Stack.Screen name="editTeam" options={{ title: "Edit Team" }} />
    </Stack>
  );
}
