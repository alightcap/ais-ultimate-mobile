import Button from "@/src/components/Button";
import EditButton from "@/src/components/EditButton";
import NavCard from "@/src/components/NavCard";
import { useData } from "@/src/contexts/DataContext";
import { Colors, GlobalStyles } from "@/src/styles/global";
import { Stack, useLocalSearchParams } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

export default function TeamIndex() {
  const { teamId } = useLocalSearchParams<{ teamId: string }>();
  const { teams, toggleArchiveEntity } = useData();
  const team = teams.find((t) => t.id === teamId);

  if (!team) return <Text>Team not found</Text>;

  return (
    <View style={GlobalStyles.container}>
      <Stack.Screen
        options={{
          headerRight: () => (
            <EditButton
              route={{
                pathname: "/teams/[teamId]/editTeam",
                params: { teamId: teamId },
              }}
            />
          ),
        }}
      />
      <View style={GlobalStyles.titleContainer}>
        <Text style={GlobalStyles.headingText}>{team.name}</Text>
      </View>
      <View style={GlobalStyles.contentContainer}>
        <NavCard route={`/teams/${team.id}/roster`}>
          <Text style={styles.cardText}>Players</Text>
        </NavCard>
        <NavCard route={`/teams/${team.id}/games`}>
          <Text style={styles.cardText}>Games</Text>
        </NavCard>
      </View>
      <Button
        title={team.isArchived ? "Unarchive" : "Archive"}
        viewStyle={[
          GlobalStyles.bigButtonScreenBottom,
          { backgroundColor: Colors.surface, borderWidth: 2 },
        ]}
        onPress={() => toggleArchiveEntity("teams", team.id, !team.isArchived)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  cardText: {
    fontSize: 18,
  },
});
