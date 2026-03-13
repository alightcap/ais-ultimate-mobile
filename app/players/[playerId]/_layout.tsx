import { useData } from "@/src/contexts/DataContext";
import { DefaultStackOptions } from "@/src/styles/navigation";
import Ionicons from "@expo/vector-icons/Ionicons";
import { HeaderBackButton } from "@react-navigation/elements";
import { router, Stack, useLocalSearchParams } from "expo-router";
import { Pressable, Text, View } from "react-native";

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
          <HeaderBackButton
            {...props}
            displayMode="minimal"
            onPress={() => router.back()}
            style={{ marginRight: -10 }}
          />
        ),
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          headerRight: () => (
            <Pressable
              style={{ marginRight: -40 }}
              onPress={() =>
                router.push({
                  pathname: "/players/[playerId]/editPlayer",
                  params: { playerId: playerId },
                })
              }
            >
              <Ionicons name="pencil" size={24} />
            </Pressable>
          ),
        }}
      />
      <Stack.Screen name="editPlayer" />
    </Stack>
  );
}
