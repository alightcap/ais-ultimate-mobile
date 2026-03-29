import ActionCard from "@/src/components/Action Cards/ActionCard";
import BigButton from "@/src/components/BigButton";
import DefenseView from "@/src/components/DefenseView";
import LineView from "@/src/components/LineView";
import OffenseView from "@/src/components/OffenseView";
import ScoreBoard from "@/src/components/ScoreBoard";
import { useData } from "@/src/contexts/DataContext";
import { Action } from "@/src/lib/actions";
import { createNewPoint } from "@/src/lib/models";
import { Point } from "@/src/lib/types";
import { Colors } from "@/src/styles/global";
import { useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { FlatList, Modal, StyleSheet, Text, View } from "react-native";

export default function ActionView() {
  const { gameId } = useLocalSearchParams<{ gameId: string }>();
  const { games, teams, players, updateGame } = useData();
  const [lineModalVisible, setLineModalVisible] = useState(false);

  const currentGame = games.find((g) => g.id === gameId);

  const currentTeam = teams.find((t) => t.id === currentGame!.teamId);

  const unknownPlayer = players.find(
    (p) => p.id === `${currentTeam!.id}-unknown`,
  );

  const points = currentGame!.points || [];
  const [currentPoint, setCurrentPoint] = useState<Point>(points[-1]);
  if (!currentGame) return <Text>Game not found</Text>;
  if (!currentTeam) return <Text>Team not found</Text>;

  const isOffense = currentGame.hasPossession;

  const activePlayers = players.filter(
    (p) => p.teamIDs.includes(currentTeam!.id) && p.active,
  );

  const initialLine =
    (currentGame.currentLine.length ?? 0) > 0
      ? currentGame.currentLine
      : activePlayers.slice(0, 7);
  const alreadyHasUnkown = initialLine.some((p) => p.id.includes("unknown"));
  const currentLine =
    unknownPlayer && !alreadyHasUnkown
      ? [...initialLine, unknownPlayer]
      : initialLine;
  if (!currentLine) return <Text>No Line found</Text>;

  const recentActions = [...currentPoint.actions].reverse().slice(0, 5);

  const handleAction = async (action: Action) => {
    if (!currentGame) return;

    let updatedPoints = [...(currentGame.points || [])];
    const lastPointIndex = updatedPoints.length - 1;

    updatedPoints[lastPointIndex] = {
      ...updatedPoints[lastPointIndex],
      actions: [...updatedPoints[lastPointIndex].actions, action],
    };

    let ourScore = currentGame.ourScore;
    let theirScore = currentGame.theirScore;
    if (action.name === "goal for") {
      ourScore += 1;
    }
    if (action.name === "goal against") {
      theirScore += 1;
    }

    let newPossession = currentGame.hasPossession;
    if (action.switchPossession) {
      newPossession = !currentGame.hasPossession;
    }

    if (action.endPoint) {
      const nextPoint = createNewPoint(currentPoint.number + 1);
      updatedPoints = [...updatedPoints, nextPoint];
      setCurrentPoint(nextPoint);
      setLineModalVisible(true);
    }

    const updatedGame = {
      ...currentGame,
      points: updatedPoints,
      ourScore,
      theirScore,
      hasPossession: newPossession,
    };

    await updateGame(updatedGame);
  };

  // TODO:
  // Don't love how the event list is working right now.

  return (
    <View style={{ flex: 1, gap: 2 }}>
      <View style={styles.scoreHeader}>
        <ScoreBoard
          ourScore={currentGame.ourScore}
          theirScore={currentGame.theirScore}
          size={"large"}
        />
      </View>
      <View style={{ flex: 3 }}>
        <FlatList
          data={recentActions}
          contentContainerStyle={{ flexGrow: 1 }}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => {
            return (
              <View style={{ flex: 1 }}>
                <ActionCard action={item} />
              </View>
            );
          }}
          ListEmptyComponent={
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text>No Actions Yet</Text>
            </View>
          }
        />
      </View>
      <View style={{ flex: 4, padding: 2 }}>
        {isOffense ? (
          <OffenseView
            currentLine={currentLine}
            onAction={handleAction}
            ourScore={currentGame.ourScore}
            theirScore={currentGame.theirScore}
          />
        ) : (
          <DefenseView
            currentLine={currentLine}
            onAction={handleAction}
            opponentName={currentGame.opponentName}
            ourScore={currentGame.ourScore}
            theirScore={currentGame.theirScore}
          />
        )}
      </View>

      <View style={{ flex: 1, backgroundColor: "white" }}>
        <BigButton
          title="Show Line"
          onPress={() => setLineModalVisible(true)}
        />
      </View>

      <Modal
        animationType="fade"
        visible={lineModalVisible}
        onRequestClose={() => setLineModalVisible(false)}
      >
        <LineView
          roster={activePlayers}
          points={currentGame.points}
          currentLine={currentLine}
          ourScore={currentGame.ourScore}
          theirScore={currentGame.theirScore}
          isOffense={currentGame.hasPossession}
          onClose={() => setLineModalVisible(false)}
        />
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  scoreHeader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.surface,
  },
});
