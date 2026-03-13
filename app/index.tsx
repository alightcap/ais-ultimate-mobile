import BigButton from "@/src/components/BigButton";
import TeamList from "@/src/components/TeamList";
import { useData } from "@/src/contexts/DataContext";
import { Colors, GlobalStyles } from "@/src/styles/global";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Stack, useRouter } from "expo-router";
import React from "react";
import { Pressable, Text, View } from "react-native";

export default function TeamsIndex() {
  const { teams } = useData();
  const router = useRouter();

  const activeTeams = teams.filter((team) => !team.isArchived);

  return (
    <View style={GlobalStyles.container}>
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
                color={Colors.brandPrimary}
              />
              {/** this does not work on android */}
            </Pressable>
          ),
        }}
      />

      <Text style={GlobalStyles.headingText}>My Teams</Text>
      <TeamList
        teams={activeTeams}
        emptyMessage="There are no teams to display."
      />
      <BigButton
        onPress={() => router.push("/teams/newTeam")}
        title="New Team"
      />
    </View>
  );
}
