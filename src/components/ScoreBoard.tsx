import { StyleProp, StyleSheet, Text, TextStyle } from "react-native";
import { Game } from "../lib/types";
import { Colors } from "../styles/global";

export default function ScoreBoard({
  game,
  style,
}: {
  game: Game;
  style?: StyleProp<TextStyle>;
}) {
  const { ourScore, theirScore } = game;
  const isTied = ourScore === theirScore;
  const areWinning = ourScore > theirScore;

  const getStatusStyle = () => {
    if (isTied) return styles.tied;
    return areWinning ? styles.winning : styles.losing;
  };

  return (
    <Text
      style={[styles.scoreText, getStatusStyle(), style]}
    >{`${ourScore} - ${theirScore}`}</Text>
  );
}

const styles = StyleSheet.create({
  scoreText: {
    paddingHorizontal: 8,
    minWidth: 50,
    textAlign: "center",
    alignSelf: "center",
    color: "white",
    fontWeight: "800",
    borderRadius: 5,
    paddingVertical: 4,
  },
  indicatorText: {
    padding: 4,
    borderRadius: 5,
    marginRight: 5,
    width: 30,
    textAlign: "center",
    color: "white",
    fontWeight: "800",
  },
  winning: {
    backgroundColor: "green",
  },
  losing: {
    backgroundColor: "red",
  },
  tied: {
    backgroundColor: Colors.textMuted,
  },
});
