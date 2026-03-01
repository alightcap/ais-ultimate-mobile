import ListRowItem from "@/src/components/ListRowItem";
import { useCurrentTeam } from "@/src/contexts/CurrentTeamContext";
import { router } from "expo-router";
import { Pressable, StyleSheet, View } from "react-native";

export default function Index() {
  const { team } = useCurrentTeam();

  return (
    <View style={styles.container}>
      <Pressable onPress={() => router.push(`/team/${team.id}/players`)}>
        <ListRowItem title={"Players"} />
      </Pressable>
      {/** TODO add route to games page, create games page */}
      <Pressable>
        <ListRowItem title={"Games"} />
      </Pressable>
      {/* TODO add delete button and functionality */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 5,
  },
  titleText: {
    fontSize: 25,
    textAlign: "center",
  },
});
