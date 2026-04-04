import { FlatList, StyleSheet, Text, View } from "react-native";
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
          <NavCard route={`./teams/${item.id}`} viewStyle={{ height: 56 }}>
            <View style={{ width: "90%" }}>
              <Text
                numberOfLines={1}
                ellipsizeMode="tail"
                style={styles.teamNameText}
              >
                {item.name}
              </Text>
            </View>
          </NavCard>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  teamNameText: {
    fontSize: 18,
    fontWeight: "bold",
  },
});
