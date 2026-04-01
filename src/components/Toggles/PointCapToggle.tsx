import { StyleProp, TextStyle } from "react-native";
import GenericToggle from "./GenericToggle";

export default function PointCapToggle({
  currentPointCap,
  onPointCapChange,
  style,
}: {
  currentPointCap: number;
  onPointCapChange: (newPointCap: number) => void;
  style?: StyleProp<TextStyle>;
}) {
  const pointCaps = [11, 13, 15, 17];

  return (
    <GenericToggle
      currentValue={currentPointCap}
      onChange={onPointCapChange}
      options={pointCaps.map((p) => ({ label: p.toString(), value: p }))}
      textStyle={style}
    />
  );
}
