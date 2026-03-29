import { Text, View } from "react-native";
import { Player } from "../lib/types";
import { Colors } from "../styles/global";

export default function LinePlayerCard({
  player,
  rosterData,
}: {
  player: Player;
  rosterData: any;
}) {
  return (
    <View
      style={{
        backgroundColor: Colors.brandPrimary,
        padding: 2,
        borderRadius: 6,
      }}
    >
      <View style={{ flexDirection: "row" }}>
        <Text style={{ color: "white", fontWeight: "800", fontSize: 18 }}>
          {player.name}
        </Text>
        <Text style={{ color: "white" }}>{rosterData.pointsPlayed || 0}</Text>
      </View>
    </View>
  );
}
