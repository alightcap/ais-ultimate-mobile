import ActionCard from "@/src/components/Action Cards/ActionCard";
import BigButton from "@/src/components/BigButton";
import DefenseView from "@/src/components/DefenseView";
import LineView from "@/src/components/LineView";
import OffenseView from "@/src/components/OffenseView";
import ScoreBoard from "@/src/components/ScoreBoard";
import { useGameSession } from "@/src/Hooks/useGameSession";
import { Colors } from "@/src/styles/global";
import { useLocalSearchParams } from "expo-router";
import { FlatList, Modal, StyleSheet, Text, View } from "react-native";

export default function ActionView() {
  const { gameId } = useLocalSearchParams<{ gameId: string }>();
  const {
    activePlayers,
    currentGame,
    currentPoint,
    currentLine,
    handleAction,
    isOffense,
    lineModalVisible,
    recentActions,
    setLineModalVisible,
    // saveLine,
  } = useGameSession(gameId);

  if (!currentGame || !currentPoint) {
    return (
      <View>
        <Text>Loading Game...</Text>
      </View>
    );
  }

  // TODO: fix event list so height of event cards is dynamic

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
        animationType="slide"
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
