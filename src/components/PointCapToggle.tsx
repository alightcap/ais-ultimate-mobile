import { Pressable, Text, View } from "react-native";
import { ToggleStyles } from "../styles/toggle";

export default function PointCapToggle({
  currentPointCap,
  onPointCapChange,
}: {
  currentPointCap: number;
  onPointCapChange: (newPointCap: number) => void;
}) {
  const pointCaps = [11, 13, 15, 17];

  return (
    <View style={ToggleStyles.container}>
      {pointCaps.map((pointCap) => (
        <Pressable
          key={pointCap}
          onPress={() => onPointCapChange(pointCap)}
          style={[
            ToggleStyles.button,
            currentPointCap === pointCap && ToggleStyles.activeButton,
          ]}
        >
          <Text
            style={[
              ToggleStyles.text,
              currentPointCap === pointCap && ToggleStyles.activeText,
            ]}
          >
            {pointCap}
          </Text>
        </Pressable>
      ))}
    </View>
  );
}
