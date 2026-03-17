import TeamList from "@/src/components/TeamList";
import { useData } from "@/src/contexts/DataContext";
import { GlobalStyles } from "@/src/styles/global";
import { Text, View } from "react-native";

export default function ArchivedTeams() {
  const { teams } = useData();
  const archivedTeams = teams.filter((team) => team.isArchived);

  return (
    <View style={GlobalStyles.container}>
      <View style={GlobalStyles.titleContainer}>
        <Text style={GlobalStyles.headingText}>Archived Teams</Text>
      </View>
      <View style={GlobalStyles.contentContainer}>
        <TeamList teams={archivedTeams} emptyMessage="No archived teams" />
      </View>
    </View>
  );
}
