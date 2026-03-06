import ListRowItem from "@/src/components/ListRowItem";
import NewButton from "@/src/components/NewButton";
import { useTeams } from "@/src/contexts/TeamsContext";
import { useRouter } from "expo-router";
import React from "react";
import { FlatList, Pressable, StyleSheet, View } from "react-native";

export default function TeamsIndex() {
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
      <NewButton route="/newTeam" title="New Team" />
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
});
