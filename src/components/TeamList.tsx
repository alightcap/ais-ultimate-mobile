import { FlatList, Text, View } from "react-native";
import { Team, TeamListProps } from "../lib/types";
import { GlobalStyles } from "../styles/global";
import NavCard from "./NavCard";

export default function TeamList({ teams, emptyMessage }: TeamListProps) {
  return (
    <View style={GlobalStyles.listContainer}>
      <FlatList<Team>
        data={teams}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={() => (
          <View>
            <Text style={GlobalStyles.empty}>{emptyMessage}</Text>
          </View>
        )}
        renderItem={({ item }) => (
          <NavCard route={`./team/${item.id}`} title={item.name} />
        )}
      />
    </View>
  );
}
