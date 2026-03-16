import { Pressable, StyleSheet, Text, View } from "react-native";
import { StartingOnMode } from "../lib/types";
import { Colors } from "../styles/global";

export default function StartingOnToggle({
  currentMode,
  onModeChange,
}: {
  currentMode: StartingOnMode;
  onModeChange: (mode: StartingOnMode) => void;
}) {
  return (
    <View style={styles.toggleContainer}>
      <Pressable
        onPress={() => onModeChange("offense")}
        style={[
          styles.button,
          currentMode === "offense" && styles.activeButton,
        ]}
      >
        <Text
          style={[styles.text, currentMode === "offense" && styles.activeText]}
        >
          Offense
        </Text>
      </Pressable>
      <Pressable
        onPress={() => onModeChange("defense")}
        style={[
          styles.button,
          currentMode === "defense" && styles.activeButton,
        ]}
      >
        <Text
          style={[styles.text, currentMode === "defense" && styles.activeText]}
        >
          Defense
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  toggleContainer: {
    flexDirection: "row",
    backgroundColor: Colors.surface,
    borderRadius: 8,
    padding: 4,
  },
  button: {
    paddingHorizontal: 8,
    paddingVertical: 10,
    alignItems: "center",
    borderRadius: 6,
  },
  activeButton: {
    backgroundColor: Colors.brandPrimary,
    elevation: 2,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  text: {
    fontWeight: "600",
    color: Colors.textMuted,
  },
  activeText: {
    color: Colors.white,
  },
});
