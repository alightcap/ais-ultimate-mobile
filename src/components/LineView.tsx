import { Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Player } from "../lib/types";
import { Colors } from "../styles/global";
import BigButton from "./BigButton";
import LinePlayerCard from "./LinePlayerCard";
import ScoreBoard from "./ScoreBoard";

export default function LineView({
  roster,
  currentLine,
  ourScore,
  theirScore,
  isOffense,
  onClose,
}: {
  roster: Player[];
  currentLine: Player[];
  ourScore: number;
  theirScore: number;
  isOffense: boolean;
  onClose: () => void;
}) {
  const insets = useSafeAreaInsets();

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
                  <LinePlayerCard player={player} key={player.id} />
                  // <Text key={player.id}>{player.name}</Text>
                ),
            )}
          </View>
        </View>
        <View style={{ flex: 6, backgroundColor: "blue" }}>
          {roster.map(
            (player) =>
              !currentLine.includes(player) &&
              !player.id.includes("unknown") && (
                <Text key={player.id}>{player.name}</Text>
              ),
          )}
        </View>
      </View>
      <View style={{ flex: 1, justifyContent: "flex-end" }}>
        <BigButton title="Close" onPress={onClose} />
      </View>
    </View>
  );
}
