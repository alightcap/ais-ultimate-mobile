import HeaderBack from "@/src/components/HeaderBack";
import { useData } from "@/src/contexts/DataContext";
import { DefaultStackOptions } from "@/src/styles/navigation";
import { Stack, useLocalSearchParams } from "expo-router";
import { Text, View } from "react-native";

export default function PlayerLayout() {
  const { playerId } = useLocalSearchParams<{ playerId: string }>();
  const { players } = useData();

  const currentPlayer = players.find((p) => p.id === playerId);

  if (!currentPlayer) {
    return (
      <View>
        <Text>Player Not Found</Text>
      </View>
    );
  }

  return (
    <Stack
      screenOptions={{
        ...DefaultStackOptions,
        headerTitle: "Player Details",
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
    >
      <Stack.Screen name="index" />
      <Stack.Screen name="editPlayer" />
    </Stack>
  );
}
