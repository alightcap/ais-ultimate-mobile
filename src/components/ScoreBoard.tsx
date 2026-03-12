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
    borderWidth: 2,
    borderRadius: 5,
    paddingLeft: 2,
    paddingRight: 2,
    minWidth: 50,
    textAlign: "center",
  },
  winning: {
    borderColor: Colors.active,
    borderStyle: "dotted",
  },
  losing: {
    borderColor: Colors.error,
    borderStyle: "dashed",
  },
});
