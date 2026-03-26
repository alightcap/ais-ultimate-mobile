import Ionicons from "@expo/vector-icons/Ionicons";
import { useRouter } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Game } from "../lib/types";
import { Colors } from "../styles/global";
import { getDateTimeString } from "../utils/dates";
import ScoreBoard from "./ScoreBoard";

export default function GameCard({ game }: { game: Game }) {
  const router = useRouter();

  return (
    <Pressable
      onPress={() =>
        router.push({
          pathname: "/games/[gameId]",
          params: { gameId: game.id },
        })
      }
    >
      <View style={styles.gameContainer}>
        <View>
          <Text>{`${getDateTimeString(game.timeStamp)}${game.eventName ? `, ${game.eventName}` : ""}`}</Text>
          <Text style={styles.oppText}>{`vs. ${game.opponentName}`}</Text>
        </View>
        <View style={styles.row}>
          <ScoreBoard
            ourScore={game.ourScore}
            theirScore={game.theirScore}
            style={{ fontSize: 18 }}
          />
          <Ionicons name="chevron-forward" size={24} color="black" />
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  gameContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    backgroundColor: Colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  oppText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  scoreText: {
    marginRight: 5,
    fontSize: 18,
  },
  winningScoreText: {
    color: Colors.active,
  },
  losingScoreText: {
    color: Colors.error,
  },
});
