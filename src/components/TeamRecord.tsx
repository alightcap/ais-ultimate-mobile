import { StyleProp, StyleSheet, Text, TextStyle } from "react-native";
import { Game } from "../lib/types";
import { Colors } from "../styles/global";

export default function TeamRecord({
  games,
  style,
}: {
  games: Game[];
  style?: StyleProp<TextStyle>;
}) {
  const numWinning = games.filter((g) => g.ourScore > g.theirScore).length;
  const numLosing = games.filter((g) => g.ourScore < g.theirScore).length;

  const isFiveHundred = numWinning === numLosing;
  const isWinningRecord = numWinning > numLosing;

  const getRecordStyle = () => {
    if (isFiveHundred) return styles.fiveHundred;
    return isWinningRecord ? styles.winning : styles.losing;
  };

  return (
    <Text
      style={[styles.recordText, getRecordStyle(), style]}
    >{`${numWinning} - ${numLosing}`}</Text>
  );
}

const styles = StyleSheet.create({
  recordText: {
    borderRadius: 5,
    paddingHorizontal: 8,
    minWidth: 50,
    textAlign: "center",
    alignSelf: "center",
    color: "white",
    paddingVertical: 4,
  },
  winning: {
    backgroundColor: "green",
  },
  losing: {
    backgroundColor: "red",
  },
  fiveHundred: {
    backgroundColor: Colors.textMuted,
  },
});
