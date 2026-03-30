import { StyleProp, TextStyle } from "react-native";
import { StartingOnMode } from "../lib/types";
import GenericToggle from "./GenericToggle";

export default function StartingOnToggle({
  currentMode,
  enabled,
  onModeChange,
  style,
}: {
  currentMode: StartingOnMode;
  enabled: boolean;
  onModeChange: (mode: StartingOnMode) => void;
  style?: StyleProp<TextStyle>;
}) {
  return (
    <GenericToggle
      currentValue={currentMode}
      enabled={enabled}
      onChange={onModeChange}
      options={[
        { label: "Offense", value: "offense" },
        { label: "Defense", value: "defense" },
      ]}
      textStyle={style}
    />
  );
}
