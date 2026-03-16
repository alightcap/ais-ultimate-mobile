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
  const numLosing = games.length - numWinning;

  const isFiveHundred = numWinning === numLosing;
  const isWinningRecord = numWinning > numLosing;

  const getRecordStyle = () => {
    if (isFiveHundred) return null;
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
    borderWidth: 2,
    borderRadius: 5,
    paddingHorizontal: 6,
    minWidth: 50,
    textAlign: "center",
    alignSelf: "center",
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
