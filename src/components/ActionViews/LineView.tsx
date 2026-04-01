import { useGameSession } from "@/src/Hooks/useGameSession";
import * as Haptics from "expo-haptics";
import { useMemo, useState } from "react";
import { Pressable, Text, View } from "react-native";
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

  const [draftLine, setDraftLine] = useState<Player[]>(initialLine);

  const insets = useSafeAreaInsets();

  const togglePlayer = async (player: Player) => {
    if (player.id.includes("unknown")) return;

    const isSelected = draftLine.some((p) => p.id === player.id);

    if (isSelected) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      setDraftLine((prev) => prev.filter((p) => p.id !== player.id));
    } else {
      const realPlayerCount = draftLine.filter(
        (p) => !p.id.includes("unknown"),
      ).length;

      if (realPlayerCount < 7) {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
        setDraftLine((prev) => [...prev, player]);
      } else {
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
      }
    }
  };

  const benchPlayers = useMemo(() => {
    return roster
      .filter(
        (player) =>
          !draftLine.some((p) => p.id === player.id) &&
          !player.id.includes("unknown") &&
          player.active,
      )
      .sort((a, b) => a.name.localeCompare(b.name));
  }, [roster, draftLine]);

  const handleSaveAndClose = async () => {
    const updatedPoints = [...currentGame.points];
    const lastIdx = updatedPoints.length - 1;
    const currentLineIds = draftLine.map((p) => p.id);

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
          }}
        >
          <View style={{ gap: 4, margin: 4, paddingVertical: 2 }}>
            {draftLine.map(
              (player) =>
                !player.id.includes("unknown") && (
                  <Pressable
                    key={player.id}
                    onPress={() => togglePlayer(player)}
                  >
                    <LinePlayerCard
                      player={player}
                      pointsPlayed={pointsPlayed[player.id]}
                    />
                  </Pressable>
                ),
            )}
          </View>
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
