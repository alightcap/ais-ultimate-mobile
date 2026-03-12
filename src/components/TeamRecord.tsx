import { StyleProp, Text, TextStyle } from "react-native";
import { Game } from "../lib/types";

export default function TeamRecord({
  games,
  style,
}: {
  games: Game[];
  style?: StyleProp<TextStyle>;
}) {
  const numWinning = games.filter((g) => g.ourScore > g.theirScore).length;
  const numLosing = games.length - numWinning;

  return <Text style={style}>{`${numWinning} - ${numLosing}`}</Text>;
}
