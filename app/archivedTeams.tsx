import TeamList from "@/src/components/TeamList";
import { useData } from "@/src/contexts/DataContext";
import { GlobalStyles } from "@/src/styles/global";
import { View } from "react-native";

export default function ArchivedTeams() {
  const { teams } = useData();
  const archivedTeams = teams.filter((team) => team.isArchived);

  return (
    <View style={GlobalStyles.container}>
      <TeamList teams={archivedTeams} emptyMessage="No archived teams" />
    </View>
  );
}
