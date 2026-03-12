import { useData } from "@/src/contexts/DataContext";
import { GlobalStyles } from "@/src/styles/global";
import Ionicons from "@expo/vector-icons/Ionicons";
import { HeaderBackButton } from "@react-navigation/elements";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import {
  Button,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

export default function SelectExistingPlayers() {
  const router = useRouter();
  const { teams, players, linkPlayersToTeam } = useData();
  const { teamId } = useLocalSearchParams<{ teamId: string }>();

  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const currentTeam = teams.find((t) => t.id === teamId);
  if (!currentTeam) return <Text>Team not found</Text>;

  const availablePlayers = players.filter(
    (player) => !currentTeam?.playerIDs.includes(player.id),
  );

  const toggleSelection = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id],
    );
  };

  const handleSave = async () => {
    await linkPlayersToTeam(selectedIds, currentTeam.id);
    router.back();
  };

  return (
    <View style={GlobalStyles.container}>
      <Stack.Screen
        options={{
          title: "Add Players",
          headerLeft: () => (
            <HeaderBackButton tintColor="black" onPress={() => router.back()} />
          ),
          headerRight: () => (
            <Button
              title="Done"
              onPress={handleSave}
              disabled={selectedIds.length === 0}
            />
          ),
        }}
      />
      <FlatList
        data={availablePlayers}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          const isSelected = selectedIds.includes(item.id);
          return (
            <Pressable
              onPress={() => toggleSelection(item.id)}
              style={[styles.row, isSelected && styles.selectedRow]}
            >
              <Text style={styles.name}>
                {item.name} (#{item.number})
              </Text>
              <Ionicons
                name={isSelected ? "checkbox" : "square-outline"}
                size={24}
                color={isSelected ? "#007aff" : "#ccc"}
              />
            </Pressable>
          );
        }}
        ListEmptyComponent={
          <Text style={GlobalStyles.empty}>
            All existing player are already on this team.
          </Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    alignItems: "center",
  },
  selectedRow: {
    backgroundColor: "#f0f8ff",
  },
  name: { fontSize: 18 },
});
