import ActionCard from "@/src/components/Action Cards/ActionCard";
import DefenseView from "@/src/components/ActionViews/DefenseView";
import LineView from "@/src/components/ActionViews/LineView";
import OffenseView from "@/src/components/ActionViews/OffenseView";
import Button from "@/src/components/Button";
import ScoreBoard from "@/src/components/ScoreBoard";
import { useGameSession } from "@/src/Hooks/useGameSession";
import { Colors, GlobalStyles } from "@/src/styles/global";
import { router, useLocalSearchParams } from "expo-router";
import { EraserIcon } from "phosphor-react-native";
import {
  FlatList,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

export default function ActionView() {
  // TODO: fix Offense/Defense toggle logic. Maybe just remove it.

  const { gameId } = useLocalSearchParams<{ gameId: string }>();

  const {
    roster,
    currentGame,
    currentPoint,
    currentLine,
    handleAction,
    isOffense,
    lineModalVisible,
    undoAction,
    recentActions,
    setLineModalVisible,
  } = useGameSession(gameId);

  if (!currentGame || !currentPoint) return;

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
      <Pressable
        style={{ flex: 3 }}
        onPress={() =>
          router.push({
            pathname: "/games/[gameId]/recap",
            params: { gameId: gameId },
          })
        }
      >
        <FlatList
          data={recentActions}
          contentContainerStyle={{ flexGrow: 1 }}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => {
            return (
              <View
                style={{
                  flexDirection: "row",
                  flex: 1,
                  alignItems: "center",
                }}
              >
                {index === 0 && item.name !== "game start" && (
                  <Pressable
                    style={{
                      minWidth: 50,
                      alignItems: "center",
                      height: "100%",
                      justifyContent: "center",
                      borderRadius: "30%",
                      marginHorizontal: 2,
                      backgroundColor: Colors.brandAccent,
                    }}
                    onPress={undoAction}
                  >
                    <EraserIcon color="black" weight="fill" />
                  </Pressable>
                )}
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
      </Pressable>
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
            currentPoint={currentPoint}
            currentLine={currentLine}
            onAction={handleAction}
            opponentName={currentGame.opponentName}
            ourScore={currentGame.ourScore}
            theirScore={currentGame.theirScore}
          />
        )}
      </View>

      <Button
        title="Show Line"
        onPress={() => setLineModalVisible(true)}
        viewStyle={GlobalStyles.bigButtonScreenBottom}
      />

      <Modal
        animationType="slide"
        visible={lineModalVisible}
        onRequestClose={() => setLineModalVisible(false)}
      >
        <LineView
          currentGame={currentGame}
          roster={roster}
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
