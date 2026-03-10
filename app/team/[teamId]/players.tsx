import NavCard from "@/src/components/NavCard";
import { useData } from "@/src/contexts/DataContext";
import { GlobalStyles } from "@/src/styles/global";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import {
  Button,
  FlatList,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

export default function Players() {
  const router = useRouter();

  const { teams, players } = useData();
  const { teamId } = useLocalSearchParams();

  const [modalVisible, setModalVisible] = useState(false);

  const currentTeam = teams.find((t) => t.id === teamId);

  const roster = players.filter((player) =>
    currentTeam?.playerIDs.includes(player.id),
  );

  return (
    <View style={GlobalStyles.container}>
      <Text style={GlobalStyles.headingText}>Roster</Text>
      <View style={GlobalStyles.listContainer}>
        <FlatList
          data={roster}
          renderItem={({ item }) => (
            <NavCard route={`/player/${item.id}`} title={item.name} />
          )}
          ListEmptyComponent={
            <Text style={GlobalStyles.headingText}>
              There are no players to display
            </Text>
          }
        />
      </View>

      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <View style={styles.emptyTop}>
          <View style={styles.modalView}>
            <Pressable
              onPress={() => {
                setModalVisible(false);
                router.push({
                  pathname: "/player/newPlayer",
                  params: { teamId: teamId },
                });
              }}
              style={{ paddingBottom: 16 }}
            >
              <Text style={styles.buttonText}>New Player</Text>
            </Pressable>
            <Pressable
              onPress={() => setModalVisible(false)}
              style={{ padding: 8 }}
            >
              <Text style={styles.buttonText}>Existing Player(s)</Text>
            </Pressable>

            <Pressable
              onPress={() => setModalVisible(false)}
              style={{ paddingTop: 16 }}
            >
              <Text style={styles.buttonText}>Cancel</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      <Button title="Add Player(s)" onPress={() => setModalVisible(true)} />
      {/* <NewButton
        route={{ pathname: "/player/newPlayer", params: { teamId: teamId } }}
        title="New Player"
      /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  modalView: {
    backgroundColor: "white",
    elevation: 5,
    padding: 32,
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: -2 },
    shadowRadius: 4,
    borderRadius: 16,
  },
  emptyTop: {
    flex: 1,
    justifyContent: "flex-end",
    paddingTop: 8,
    paddingLeft: 8,
    paddingRight: 8,
  },
  buttonText: {
    fontSize: 18,
    textAlign: "center",
    color: "blue",
  },
});
