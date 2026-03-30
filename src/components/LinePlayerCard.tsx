import { Text, View } from "react-native";
import { Player, PlayerStats } from "../lib/types";
import { Colors } from "../styles/global";

export default function LinePlayerCard({
  player,
  playerStats,
}: {
  player: Player;
  playerStats: PlayerStats;
}) {
  return (
    <View
      style={{
        backgroundColor: Colors.brandAccent,
        padding: 2,
        borderRadius: 6,
      }}
    >
      <View
        style={{
          justifyContent: "space-between",
          paddingHorizontal: 4,
        }}
      >
        <Text style={{ fontWeight: "800", fontSize: 18 }}>{player.name}</Text>
        <Text style={{ alignSelf: "flex-end", fontWeight: "bold" }}>
          {playerStats.pointsPlayed}
        </Text>
      </View>
    </View>
  );
}
