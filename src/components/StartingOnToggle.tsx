import { StyleProp, TextStyle } from "react-native";
import { StartingOnMode } from "../lib/types";
import GenericToggle from "./GenericToggle";

export default function StartingOnToggle({
  currentMode,
  onModeChange,
  style,
}: {
  currentMode: StartingOnMode;
  onModeChange: (mode: StartingOnMode) => void;
  style?: StyleProp<TextStyle>;
}) {
  return (
    <GenericToggle
      currentValue={currentMode}
      onChange={onModeChange}
      options={[
        { label: "Offense", value: "offense" },
        { label: "Defense", value: "defense" },
      ]}
      textStyle={style}
    />
  );
}
