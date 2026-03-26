import { StyleProp, StyleSheet, Text, TextStyle } from "react-native";
import { Colors } from "../styles/global";

export default function ScoreBoard({
  ourScore,
  theirScore,
  style,
}: {
  ourScore: number;
  theirScore: number;
  style?: StyleProp<TextStyle>;
}) {
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
    textAlign: "center",
    alignSelf: "center",
    color: "white",
    fontWeight: "800",
    borderRadius: 5,
    paddingVertical: 4,
  },
  winning: {
    backgroundColor: Colors.winningHighlight,
  },
  losing: {
    backgroundColor: "red",
  },
  tied: {
    backgroundColor: Colors.textMuted,
  },
});
