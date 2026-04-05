import { ToggleStyles } from "@/src/styles/toggle";
import { Pressable, StyleProp, Text, TextStyle, View } from "react-native";

interface ToggleOption<T> {
  label: string;
  value: T;
}

interface GenericToggleProps<T> {
  options: ToggleOption<T>[];
  enabled?: boolean;
  currentValue: T;
  onChange: (value: T) => void;
  textStyle?: StyleProp<TextStyle>;
}

export default function GenericToggle<T>({
  options,
  enabled = true,
  currentValue,
  onChange,
  textStyle,
}: GenericToggleProps<T>) {
  return (
    <View style={ToggleStyles.container}>
      {options.map((option) => {
        const isActive = currentValue === option.value;

        return (
          <Pressable
            key={String(option.value)}
            onPress={() => enabled && onChange(option.value)}
            style={[
              ToggleStyles.button,
              isActive && ToggleStyles.activeButton,
              isActive && !enabled && ToggleStyles.inactiveButton,
            ]}
          >
            <Text
              style={[
                ToggleStyles.text,
                isActive && ToggleStyles.activeText,
                textStyle,
              ]}
            >
              {option.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}
