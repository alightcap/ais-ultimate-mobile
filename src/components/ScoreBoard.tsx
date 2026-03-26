import { StyleSheet, Text, View } from "react-native";
import { Colors } from "../styles/global";

export default function ScoreBoard({
  ourScore,
  theirScore,
  size = "medium",
}: {
  ourScore: number;
  theirScore: number;
  size?: "small" | "medium" | "large";
}) {
  const sizeStyles = {
    small: {
      view: { width: 55, height: 24 },
      font: { fontSize: 12, lineHeight: 24 },
    },
    medium: {
      view: { width: 75, height: 32 },
      font: { fontSize: 16, lineHeight: 32 },
    },
    large: {
      view: { width: 100, height: 45 },
      font: { fontSize: 24, lineHeight: 45 },
    },
  };

  const isTied = ourScore === theirScore;
  const areWinning = ourScore > theirScore;

  const getStatusStyle = () => {
    if (isTied) return styles.tied;
    return areWinning ? styles.winning : styles.losing;
  };

  return (
    <View style={[styles.container, getStatusStyle(), sizeStyles[size].view]}>
      <Text
        style={[styles.scoreText, sizeStyles[size].font]}
      >{`${ourScore} - ${theirScore}`}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 6,
  },
  scoreText: {
    textAlign: "center",
    fontWeight: "800",
    color: "white",
  },
  winning: {
    backgroundColor: Colors.winningHighlight,
  },
  losing: {
    backgroundColor: Colors.losingHighlight,
  },
  tied: {
    backgroundColor: Colors.textMuted,
  },
});
