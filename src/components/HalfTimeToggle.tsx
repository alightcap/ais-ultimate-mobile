import { StyleProp, TextStyle } from "react-native";
import { HalfTimeMode } from "../lib/types";
import GenericToggle from "./GenericToggle";

const halfTimeModes: { label: string; value: HalfTimeMode }[] = [
  { label: "Points", value: "points" },
  { label: "Time", value: "time" },
  { label: "First", value: "first" },
];

export default function HalfTimeToggle({
  currentHalfTimeMode,
  onHalfTimeModeChange,
  style,
}: {
  currentHalfTimeMode: HalfTimeMode;
  onHalfTimeModeChange: (newHalfTimeMode: HalfTimeMode) => void;
  style?: StyleProp<TextStyle>;
}) {
  return (
    <GenericToggle
      currentValue={currentHalfTimeMode}
      onChange={onHalfTimeModeChange}
      options={halfTimeModes}
      textStyle={style}
    />
  );
}
