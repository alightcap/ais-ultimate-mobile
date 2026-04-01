import Button from "@/src/components/Button";
import HeaderBack from "@/src/components/HeaderBack";
import NavCard from "@/src/components/NavCard";
import RosterPlayerCard from "@/src/components/RosterPlayerCard";
import { useData } from "@/src/contexts/DataContext";
import { Colors, GlobalStyles } from "@/src/styles/global";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import { FlatList, Modal, StyleSheet, Text, View } from "react-native";

export default function Players() {
  const router = useRouter();

  const { teams, players } = useData();
  const { teamId } = useLocalSearchParams<{ teamId: string }>();

  const [modalVisible, setModalVisible] = useState(false);

  const currentTeam = teams.find((t) => t.id === teamId);
  if (!currentTeam) return <Text>Team not found</Text>;

  const roster = players
    .filter(
      (player) =>
        currentTeam!.playerIDs.includes(player.id) &&
        !player.id.includes("unknown"),
    )
    .sort((a, b) => a.name.localeCompare(b.name));

  return (
    <View style={GlobalStyles.container}>
      <Stack.Screen
        options={{
          headerLeft: (props) => <HeaderBack {...props} />,
        }}
      />
      <View style={GlobalStyles.titleContainer}>
        <Text style={GlobalStyles.headingText}>{currentTeam.name}</Text>
      </View>
      <View style={[GlobalStyles.contentContainer, { flex: 7 }]}>
        <FlatList
          data={roster}
          renderItem={({ item }) => {
            return (
              <NavCard
                route={{
                  pathname: "/players/[playerId]",
                  params: { playerId: item.id },
                }}
              >
                <RosterPlayerCard player={item} />
              </NavCard>
            );
          }}
          ListEmptyComponent={
            <Text style={GlobalStyles.empty}>
              There are no players to display
            </Text>
          }
        />
      </View>
      <Button
        viewStyle={GlobalStyles.bigButtonScreenBottom}
        title="Add Player(s)"
        onPress={() => setModalVisible(true)}
      />

      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <View style={styles.emptyTop}>
          <View style={styles.modalView}>
            <Button
              title="New Player"
              onPress={() => {
                setModalVisible(false);
                router.push({
                  pathname: "/players/newPlayer",
                  params: { teamId: teamId },
                });
              }}
              size="medium"
            />
            <Button
              title="Existing Player(s)"
              onPress={() => {
                setModalVisible(false);
                router.push({
                  pathname: "/players/selectExistingPlayers",
                  params: { teamId: teamId },
                });
              }}
              size="medium"
            />
            <Button
              viewStyle={{ backgroundColor: "red" }}
              title="Cancel"
              onPress={() => setModalVisible(false)}
              size="medium"
            />
          </View>
        </View>
      </Modal>
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
    gap: 20,
  },
  emptyTop: {
    flex: 1,
    justifyContent: "flex-end",
    paddingTop: 8,
    paddingLeft: 8,
    paddingRight: 8,
  },
});
