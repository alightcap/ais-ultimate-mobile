import { useGameSession } from "@/src/Hooks/useGameSession";
import * as Haptics from "expo-haptics";
import { useMemo, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useData } from "../../contexts/DataContext";
import { Game, Player } from "../../lib/types";
import { Colors, GlobalStyles } from "../../styles/global";
import Button from "../Button";
import LinePlayerCard from "../LinePlayerCard";
import ScoreBoard from "../ScoreBoard";

export default function LineView({
  currentGame,
  roster,
  currentLine: initialLine,
  ourScore,
  theirScore,
  isOffense,
  onClose,
}: {
  currentGame: Game;
  roster: Player[];
  currentLine: Player[];
  ourScore: number;
  theirScore: number;
  isOffense: boolean;
  onClose: () => void;
}) {
  const { updateGame } = useData();
  const { pointsPlayed } = useGameSession(currentGame.id);

  const [draftLine, setDraftLine] = useState<(Player | null)[]>(() => {
    const initialPlayers = initialLine.filter((p) => !p.id.includes("unknown"));
    const slots = Array(7).fill(null);
    initialPlayers.forEach((p, i) => {
      if (i < 7) slots[i] = p;
    });
    return slots;
  });

  // TODO?: Last O line, last D line

  const insets = useSafeAreaInsets();

  const onClearLine = () => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    setDraftLine(Array(7).fill(null));
  };

  const togglePlayer = async (player: Player) => {
    if (player.id.includes("unknown")) return;

    const selectedIndex = draftLine.findIndex((p) => p?.id === player.id);

    if (selectedIndex !== -1) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      const newLine = [...draftLine];
      newLine[selectedIndex] = null;
      setDraftLine(newLine);
    } else {
      const firstEmptyIndex = draftLine.indexOf(null);

      if (firstEmptyIndex !== -1) {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
        const newLine = [...draftLine];
        newLine[firstEmptyIndex] = player;
        setDraftLine(newLine);
      } else {
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
      }
    }
  };

  const benchPlayers = useMemo(() => {
    return roster
      .filter(
        (player) =>
          !draftLine.some((p) => p?.id === player.id) &&
          !player.id.includes("unknown") &&
          player.active,
      )
      .sort((a, b) => a.name.localeCompare(b.name));
  }, [roster, draftLine]);

  const handleSaveAndClose = async () => {
    const updatedPoints = [...currentGame.points];
    const lastIdx = updatedPoints.length - 1;
    const unknownPlayer = roster.find((p) => p.id.includes("unknown"));

    const currentLineIds = [
      ...draftLine.filter((p): p is Player => p !== null).map((p) => p.id),
      unknownPlayer!.id,
    ];

    if (lastIdx >= 0) {
      updatedPoints[lastIdx] = {
        ...updatedPoints[lastIdx],
        currentLineIds: currentLineIds,
      };
    }

    await updateGame({
      ...currentGame,
      currentLineIds: currentLineIds,
      points: updatedPoints,
    });

    onClose();
  };

  return (
    <View
      style={{
        flex: 1,
        paddingTop: insets.top,
        backgroundColor: Colors.background,
      }}
    >
      <View
        style={{
          flex: 1,
          backgroundColor: Colors.surface,
          justifyContent: "space-between",
          alignItems: "center",
          borderBottomColor: Colors.border,
          borderBottomWidth: 2,
          padding: 6,
        }}
      >
        <ScoreBoard ourScore={ourScore} theirScore={theirScore} size="large" />
        <Text style={{ fontSize: 20, fontWeight: "800" }}>
          {isOffense ? "O Line" : "D Line"}
        </Text>
      </View>
      <View style={{ flex: 7, flexDirection: "row" }}>
        <View
          style={{
            flex: 3,
            backgroundColor: Colors.surface,
            borderRightWidth: 4,
            borderRightColor: Colors.border,
            justifyContent: "space-between",
            paddingBottom: 10,
          }}
        >
          <View style={{ gap: 4, margin: 4, paddingVertical: 2 }}>
            {draftLine.map((player, index) => {
              if (!player) {
                return (
                  <View key={`empty-${index}`} style={styles.emptyPlayerView}>
                    <Text style={{ color: Colors.border, fontSize: 12 }}>
                      Empty Slot
                    </Text>
                  </View>
                );
              }

              return (
                <Pressable key={player.id} onPress={() => togglePlayer(player)}>
                  <LinePlayerCard
                    player={player}
                    pointsPlayed={pointsPlayed[player.id] || 0}
                  />
                </Pressable>
              );
            })}
          </View>
          <Button
            title="Clear Line"
            onPress={onClearLine}
            viewStyle={{ margin: 3, backgroundColor: Colors.brandPrimary }}
            textStyle={{ color: "white", fontWeight: "bold" }}
          />
        </View>
        <View
          style={{
            flex: 6,
            backgroundColor: Colors.surface,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              margin: 4,
            }}
          >
            {benchPlayers.map((player) => {
              return (
                <Pressable
                  key={player.id}
                  style={{ width: "50%", padding: 2 }}
                  onPress={() => togglePlayer(player)}
                >
                  <LinePlayerCard
                    player={player}
                    pointsPlayed={pointsPlayed[player.id]}
                  />
                </Pressable>
              );
            })}
          </View>
        </View>
      </View>
      <Button
        title="Close"
        onPress={handleSaveAndClose}
        viewStyle={GlobalStyles.bigButtonScreenBottom}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  emptyPlayerView: {
    height: 50, // Matches your LinePlayerCard height
    borderWidth: 1,
    borderStyle: "dashed",
    borderColor: Colors.border,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
});
