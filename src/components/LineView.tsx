import { Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Player, PlayerStats, Point } from "../lib/types";
import { Colors } from "../styles/global";
import BigButton from "./BigButton";
import LinePlayerCard from "./LinePlayerCard";
import ScoreBoard from "./ScoreBoard";

export default function LineView({
  roster,
  points, // points played, point streaks, etc...
  currentLine,
  ourScore,
  theirScore,
  isOffense,
  onClose,
}: {
  roster: Player[];
  points: Point[];
  currentLine: Player[];
  ourScore: number;
  theirScore: number;
  isOffense: boolean;
  onClose: () => void;
}) {
  const insets = useSafeAreaInsets();

  const playerStats: Record<string, PlayerStats> = {};
  roster.forEach((p) => (playerStats[p.id] = { pointsPlayed: 0 }));

  points.forEach((point) => {
    point.currentLine?.forEach((player) => {
      if (playerStats[player.id]) {
        playerStats[player.id].pointsPlayed++;
      }
    });
  });

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
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ScoreBoard ourScore={ourScore} theirScore={theirScore} size="large" />
        <Text style={{ fontSize: 20, fontWeight: "800" }}>
          {isOffense ? "O Line" : "D Line"}
        </Text>
      </View>
      <View style={{ flex: 7, flexDirection: "row" }}>
        <View
          style={{ flex: 3, backgroundColor: Colors.surface }} // current line
        >
          <View style={{ gap: 4, margin: 4 }}>
            {currentLine.map(
              (player) =>
                !player.id.includes("unknown") && (
                  <LinePlayerCard
                    key={player.id}
                    player={player}
                    playerStats={playerStats[player.id]}
                  />
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
              gap: 4,
              margin: 4,
            }}
          >
            {roster.map(
              (player) =>
                !currentLine.includes(player) &&
                !player.id.includes("unknown") && (
                  <LinePlayerCard
                    player={player}
                    key={player.id}
                    playerStats={playerStats[player.id]}
                  />
                ),
            )}
          </View>
        </View>
      </View>
      <View style={{ flex: 1, justifyContent: "flex-end" }}>
        <BigButton title="Close" onPress={onClose} />
      </View>
    </View>
  );
}
