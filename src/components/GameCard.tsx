import { StyleSheet, Text, View } from "react-native";
import { Game } from "../lib/types";
import { Colors } from "../styles/global";
import { getDateTimeString } from "../utils/dates";
import ScoreBoard from "./ScoreBoard";

export default function GameCard({ game }: { game: Game }) {
  return (
    <View style={styles.gameContainer}>
      <View>
        <Text>{`${getDateTimeString(game.timeStamp)}${game.eventName ? `, ${game.eventName}` : ""}`}</Text>
        <Text style={styles.oppText}>{`vs. ${game.opponentName}`}</Text>
      </View>
      <ScoreBoard
        ourScore={game.ourScore}
        theirScore={game.theirScore}
        size="medium"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  gameContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: Colors.surface,
  },
  oppText: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
