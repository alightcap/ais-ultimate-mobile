import ListRowItem from "@/src/components/ListRowItem";
import { useTeams } from "@/src/contexts/TeamsContext";
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
            <Pressable onPress={() => router.push(`/team/${item.id}`)}>
              <ListRowItem title={item.name} />
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
