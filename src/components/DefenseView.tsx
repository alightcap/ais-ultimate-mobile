import { Text, View } from "react-native";
import { Action } from "../lib/actions";
import { Player } from "../lib/types";
import { GlobalStyles } from "../styles/global";
import ActionButton from "./ActionButton";
import DefensePlayerCard from "./DefensePlayerCard";

export default function DefenseView({
  currentLine,
  onAction,
}: {
  currentLine: Player[];
  onAction: (action: Action) => void;
}) {
  return (
    <View style={GlobalStyles.contentContainer}>
      <View style={{ height: 50 }}>
        <Text>Headings go here</Text>
      </View>

      <View style={{ flexDirection: "row" }}>
        <View style={{ flex: 2.75, margin: 2 }}>
          {currentLine.map((player) => (
            <DefensePlayerCard
              key={player.id}
              name={player.name}
              onD={() => {}}
            />
          ))}
          <DefensePlayerCard
            name="UNKNOWN"
            onD={() => {}}
            textStyle={{ fontStyle: "italic" }}
          />
        </View>

        <View style={{ flex: 1 }}>
          <ActionButton
            label={"THROWAWAY".split("").join("\n")}
            onPress={() => {}}
          />
        </View>
        <View style={{ flex: 1, justifyContent: "center" }}>
          <ActionButton
            label="They Scored"
            onPress={() => {}}
            style={{ height: 50 }}
          />
        </View>
      </View>
    </View>
  );
}
