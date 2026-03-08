import { FlatList, StyleSheet, Text, View } from "react-native";
import { Team, TeamListProps } from "../lib/types";
import TeamCard from "./TeamCard";

export default function TeamList({ teams, emptyMessage }: TeamListProps) {
  return (
    <View style={styles.listContainer}>
      <FlatList<Team>
        data={teams}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={() => (
          <View>
            <Text>{emptyMessage}</Text>
          </View>
        )}
        renderItem={({ item }) => <TeamCard team={item} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  listContainer: {
    flex: 1,
    marginLeft: 2,
    marginRight: 2,
  },
});
