import TeamList from "@/src/components/TeamList";
import { useData } from "@/src/contexts/DataContext";
import { StyleSheet, View } from "react-native";

export default function ArchivedTeams() {
  const { teams } = useData();
  const archivedTeams = teams.filter((team) => team.isArchived);

  return (
    <View style={styles.container}>
      <TeamList teams={archivedTeams} emptyMessage="No archived teams" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
