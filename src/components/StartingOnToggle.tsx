import { Pressable, Text, View } from "react-native";
import { StartingOnMode } from "../lib/types";
import { ToggleStyles } from "../styles/toggle";

export default function StartingOnToggle({
  currentMode,
  onModeChange,
}: {
  currentMode: StartingOnMode;
  onModeChange: (mode: StartingOnMode) => void;
}) {
  return (
    <View style={ToggleStyles.container}>
      <Pressable
        onPress={() => onModeChange("offense")}
        style={[
          ToggleStyles.button,
          currentMode === "offense" && ToggleStyles.activeButton,
        ]}
      >
        <Text
          style={[
            ToggleStyles.text,
            currentMode === "offense" && ToggleStyles.activeText,
          ]}
        >
          Offense
        </Text>
      </Pressable>
      <Pressable
        onPress={() => onModeChange("defense")}
        style={[
          ToggleStyles.button,
          currentMode === "defense" && ToggleStyles.activeButton,
        ]}
      >
        <Text
          style={[
            ToggleStyles.text,
            currentMode === "defense" && ToggleStyles.activeText,
          ]}
        >
          Defense
        </Text>
      </Pressable>
    </View>
  );
}
