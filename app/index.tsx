import NewButton from "@/src/components/NewButton";
import TeamList from "@/src/components/TeamList";
import { useData } from "@/src/contexts/DataContext";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Stack, useRouter } from "expo-router";
import React from "react";
import { Pressable, StyleSheet, View } from "react-native";

export default function TeamsIndex() {
  const { teams } = useData();
  const router = useRouter();

  const activeTeams = teams.filter((team) => !team.isArchived);

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          headerRight: () => (
            <Pressable
              onPress={() => router.push("/archivedTeams")}
              style={{ marginRight: -36 }}
            >
              <Ionicons
                name="archive-outline"
                size={24}
                color="black"
              ></Ionicons>
            </Pressable>
          ),
        }}
      />
      <TeamList
        teams={activeTeams}
        emptyMessage="No Teams. Add one to get started!"
      />
      <NewButton route="/newTeam" title="New Team" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 16,
  },
});
