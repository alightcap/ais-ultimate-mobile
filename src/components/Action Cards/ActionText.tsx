import { StyleProp, Text, TextStyle } from "react-native";

export default function ActionText({
  text,
  textStyle,
}: {
  text: string;
  textStyle?: StyleProp<TextStyle>;
}) {
  return (
    <Text numberOfLines={1} ellipsizeMode="tail" style={textStyle}>
      {text}
    </Text>
  );
}
