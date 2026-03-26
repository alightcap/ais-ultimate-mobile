import { Text, View } from "react-native";
import ScoreBoard from "./ScoreBoard";

export default function TestAction() {
  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          flex: 0.5,
          backgroundColor: "orange",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ScoreBoard ourScore={0} theirScore={0} size="large" />
      </View>
      <View style={{ flex: 5, backgroundColor: "red" }}>
        <Text>player list/action buttons</Text>
      </View>
      <View style={{ flex: 1.5, backgroundColor: "blue" }}>
        <Text>prev events</Text>
      </View>
      <View style={{ flex: 1, backgroundColor: "yellow" }}>
        <Text>Line button</Text>
      </View>
    </View>
  );
}
