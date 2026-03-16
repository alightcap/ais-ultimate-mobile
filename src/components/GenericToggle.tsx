import { Pressable, StyleProp, Text, TextStyle, View } from "react-native";
import { ToggleStyles } from "../styles/toggle";

interface ToggleOption<T> {
  label: string;
  value: T;
}

interface GenericToggleProps<T> {
  options: ToggleOption<T>[];
  currentValue: T;
  onChange: (value: T) => void;
  textStyle?: StyleProp<TextStyle>;
}

export default function GenericToggle<T>({
  options,
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
            onPress={() => onChange(option.value)}
            style={[ToggleStyles.button, isActive && ToggleStyles.activeButton]}
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
