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
        backgroundColor: Colors.brandPrimary,
        padding: 2,
        borderRadius: 6,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          paddingHorizontal: 4,
        }}
      >
        <Text style={{ color: "white", fontWeight: "800", fontSize: 18 }}>
          {player.name}
        </Text>
        <Text style={{ color: "white" }}>{playerStats.pointsPlayed}</Text>
      </View>
    </View>
  );
}
