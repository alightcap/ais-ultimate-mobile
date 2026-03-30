import * as Haptics from "expo-haptics";
import { useMemo } from "react";
import { Pressable, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useData } from "../contexts/DataContext";
import { Game, Player, PlayerStats, Point } from "../lib/types";
import { Colors } from "../styles/global";
import BigButton from "./BigButton";
import LinePlayerCard from "./LinePlayerCard";
import ScoreBoard from "./ScoreBoard";

export default function LineView({
  currentGame,
  roster,
  points, // points played, point streaks, etc...
  currentLine,
  ourScore,
  theirScore,
  isOffense,
  onClose,
}: {
  currentGame: Game;
  roster: Player[];
  points: Point[];
  currentLine: Player[];
  ourScore: number;
  theirScore: number;
  isOffense: boolean;
  onClose: () => void;
}) {
  const { updateGame } = useData();
  const insets = useSafeAreaInsets();

  const playerStats: Record<string, PlayerStats> = {};
  roster.forEach((p) => (playerStats[p.id] = { pointsPlayed: 0 }));

  points.slice(0, -1).forEach((point) => {
    point.currentLine?.forEach((player) => {
      if (playerStats[player.id]) {
        playerStats[player.id].pointsPlayed++;
      }
    });
  });

  const togglePlayer = async (player: Player) => {
    if (player.id.includes("unknown")) return;

    const isSelected = currentLine.some((p) => p.id === player.id);

    if (isSelected) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);

      const newLine = currentLine.filter((p) => p.id !== player.id);
      await updateGame({ ...currentGame, currentLine: newLine });
    } else {
      const realPlayerCount = currentLine.filter(
        (p) => !p.id.includes("unknown"),
      ).length;

      if (realPlayerCount < 7) {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
        const newLine = [...currentLine, player];
        await updateGame({ ...currentGame, currentLine: newLine });
      }
    }
  };

  const benchPlayers = useMemo(() => {
    return roster
      .filter(
        (player) =>
          !currentLine.some((p) => p.id === player.id) &&
          !player.id.includes("unknown"),
      )
      .sort((a, b) => a.name.localeCompare(b.name));
  }, [roster, currentLine]);

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
            {currentLine.map(
              (player) =>
                !player.id.includes("unknown") && (
                  <Pressable
                    key={player.id}
                    onPress={() => togglePlayer(player)}
                  >
                    <LinePlayerCard
                      player={player}
                      playerStats={playerStats[player.id]}
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
                    playerStats={playerStats[player.id]}
                  />
                </Pressable>
              );
            })}
          </View>
        </View>
      </View>
      <View style={{ flex: 1, justifyContent: "flex-end" }}>
        <BigButton title="Close" onPress={onClose} />
      </View>
    </View>
  );
}
