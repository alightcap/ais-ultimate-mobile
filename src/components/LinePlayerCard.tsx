import { Text, View } from "react-native";
import { Player } from "../lib/types";
import { Colors } from "../styles/global";

export default function LinePlayerCard({ player }: { player: Player }) {
  return (
    <View
      style={{
        backgroundColor: Colors.brandPrimary,
        padding: 2,
        borderRadius: 6,
      }}
    >
      <Text style={{ color: "white", fontWeight: "800", fontSize: 18 }}>
        {player.name}
      </Text>
    </View>
  );
}
