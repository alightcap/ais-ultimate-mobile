import ListRowItem from "@/src/components/ListRowItem";
import { useCurrentTeam } from "@/src/contexts/CurrentTeamContext";
import { router } from "expo-router";
import { Pressable, StyleSheet, View } from "react-native";

export default function Index() {
  const { team } = useCurrentTeam();

  return (
    <View style={styles.container}>
      {/* <Text style={styles.titleText}>{team.name}</Text> */}
      <Pressable onPress={() => router.push(`/team/${team.id}/players`)}>
        <ListRowItem title={"Players"} />
      </Pressable>
      <Pressable>
        <ListRowItem title={"Games"} />
      </Pressable>
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
