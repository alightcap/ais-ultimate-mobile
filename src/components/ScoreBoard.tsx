import { StyleProp, StyleSheet, Text, TextStyle } from "react-native";
import { Game } from "../lib/types";

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
    if (isTied) return null;
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
    textDecorationLine: "underline",
  },
  winning: {
    textDecorationColor: "green",
  },
  losing: {
    textDecorationColor: "red",
  },
});
