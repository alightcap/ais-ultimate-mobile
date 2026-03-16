import { Pressable, Text, View } from "react-native";
import { ToggleStyles } from "../styles/toggle";

export default function PointCapToggle({
  currentPointCap,
  onPointCapChange,
}: {
  currentPointCap: number;
  onPointCapChange: (newPointCap: number) => void;
}) {
  return (
    <View style={ToggleStyles.container}>
      <Pressable
        onPress={() => onPointCapChange(11)}
        style={[
          ToggleStyles.button,
          currentPointCap === 11 && ToggleStyles.activeButton,
        ]}
      >
        <Text
          style={[
            ToggleStyles.text,
            currentPointCap === 11 && ToggleStyles.activeText,
          ]}
        >
          11
        </Text>
      </Pressable>
      <Pressable
        onPress={() => onPointCapChange(13)}
        style={[
          ToggleStyles.button,
          currentPointCap === 13 && ToggleStyles.activeButton,
        ]}
      >
        <Text
          style={[
            ToggleStyles.text,
            currentPointCap === 13 && ToggleStyles.activeText,
          ]}
        >
          13
        </Text>
      </Pressable>

      <Pressable
        onPress={() => onPointCapChange(15)}
        style={[
          ToggleStyles.button,
          currentPointCap === 15 && ToggleStyles.activeButton,
        ]}
      >
        <Text
          style={[
            ToggleStyles.text,
            currentPointCap === 15 && ToggleStyles.activeText,
          ]}
        >
          15
        </Text>
      </Pressable>

      <Pressable
        onPress={() => onPointCapChange(17)}
        style={[
          ToggleStyles.button,
          currentPointCap === 17 && ToggleStyles.activeButton,
        ]}
      >
        <Text
          style={[
            ToggleStyles.text,
            currentPointCap === 17 && ToggleStyles.activeText,
          ]}
        >
          17
        </Text>
      </Pressable>
    </View>
  );
}
