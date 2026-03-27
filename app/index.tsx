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
            <Pressable onPress={() => router.push("/archivedTeams")}>
              <Ionicons
                name="archive-outline"
                size={24}
                color={Colors.brandPrimary}
              />
            </Pressable>
          ),
        }}
      />
      <View style={GlobalStyles.titleContainer}>
        <Text style={GlobalStyles.headingText}>My Teams</Text>
      </View>
      <View style={[GlobalStyles.contentContainer, { flex: 7 }]}>
        <TeamList
          teams={activeTeams}
          emptyMessage="There are no teams to display."
        />
      </View>
      <View style={{ flex: 1, justifyContent: "flex-end" }}>
        <BigButton
          onPress={() => router.push("/teams/newTeam")}
          title="New Team"
        />
      </View>
    </View>
  );
}
