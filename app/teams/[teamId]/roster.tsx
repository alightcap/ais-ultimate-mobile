import BigButton from "@/src/components/BigButton";
import MedButton from "@/src/components/MedButton";
import NavCard from "@/src/components/NavCard";
import { useData } from "@/src/contexts/DataContext";
import { Colors, GlobalStyles } from "@/src/styles/global";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import { FlatList, Modal, StyleSheet, Text, View } from "react-native";

export default function Players() {
  const router = useRouter();

  const { teams, players } = useData();
  const { teamId } = useLocalSearchParams<{ teamId: string }>();

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
            <NavCard route={`/players/${item.id}`} title={item.name} />
          )}
          ListEmptyComponent={
            <Text style={GlobalStyles.empty}>
              There are no players to display
            </Text>
          }
        />
      </View>

      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <View style={styles.emptyTop}>
          <View style={styles.modalView}>
            <MedButton
              title="New Player"
              onPress={() => {
                setModalVisible(false);
                router.push({
                  pathname: "/players/newPlayer",
                  params: { teamId: teamId },
                });
              }}
            />
            <MedButton
              title="Existing Player(s)"
              onPress={() => {
                setModalVisible(false);
                router.push({
                  pathname: "/players/selectExistingPlayers",
                  params: { teamId: teamId },
                });
              }}
            />
            <MedButton title="Cancel" onPress={() => setModalVisible(false)} />
          </View>
        </View>
      </Modal>
      <BigButton title="Add Player(s)" onPress={() => setModalVisible(true)} />
    </View>
  );
}

const styles = StyleSheet.create({
  modalView: {
    backgroundColor: Colors.white,
    elevation: 5,
    padding: 32,
    shadowColor: Colors.black,
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
});
