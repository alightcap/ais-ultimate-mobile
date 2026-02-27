import TeamListRow from "@/src/components/TeamListRow";
import { useTeams } from "@/src/contexts/TeamListContext";
import { Link } from "expo-router";
import React from "react";
import { FlatList, StyleSheet, View } from "react-native";

export default function Index() {
  const { teamList } = useTeams();
  return (
    <View style={styles.container}>
      <View style={styles.listContainer}>
        <FlatList
          data={teamList}
          renderItem={({ item }) => (
            <TeamListRow teamName={item.teamName} id={item.id} />
          )}
        />
      </View>
      <Link href="/newTeam" style={styles.newButton}>
        New Team
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContainer: {
    flex: 1,
  },
  newButton: {
    textAlign: "center",
    fontSize: 18,
    backgroundColor: "skyblue",
    margin: 20,
    padding: 20,
  },
});
