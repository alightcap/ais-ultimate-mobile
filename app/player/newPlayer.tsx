import { GlobalStyles } from "@/src/styles/global";
import { useLocalSearchParams } from "expo-router";
import { Text, View } from "react-native";

export default function NewPlayer() {
  const { teamId } = useLocalSearchParams();

  return (
    <View>
      <Text style={GlobalStyles.headingText}>New Player</Text>
    </View>
  );
}
