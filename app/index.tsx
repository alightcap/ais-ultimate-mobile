import TeamListRow from "@/src/components/TeamListRow";
import { useTeams } from "@/src/contexts/TeamListContext";
import { Link, useRouter } from "expo-router";
import React from "react";
import { FlatList, Pressable, StyleSheet, View } from "react-native";

export default function Index() {
  const { teams } = useTeams();
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.listContainer}>
        <FlatList
          data={teams}
          renderItem={({ item }) => (
            <Pressable
              onPress={() => router.push(`/team/${item.name}`)}
              style={({ pressed }) => ({
                borderColor: "#ccc",
                backgroundColor: pressed ? "#f0f0f0" : "white",
              })}
            >
              <TeamListRow
                id={item.id}
                name={item.name}
                players={item.players}
              />
            </Pressable>
          )}
          keyExtractor={(item) => item.id.toString()}
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
