import { View } from "react-native";
import { Action } from "../lib/actions";
import {
  createDeEvent,
  createGoalAgainstEvent,
  createThrowawayAgainstEvent,
} from "../lib/models";
import { Player } from "../lib/types";
import ActionButton from "./ActionButton";
import DefensePlayerCard from "./DefensePlayerCard";

export default function DefenseView({
  currentLine,
  onAction,
  opponentName,
  ourScore,
  theirScore,
}: {
  currentLine: Player[];
  onAction: (action: Action) => void;
  opponentName: string;
  ourScore: number;
  theirScore: number;
}) {
  const handleD = (player: Player) => {
    onAction(createDeEvent({ defender: player }));
  };

  const handleThrowawayAgainst = () => {
    onAction(createThrowawayAgainstEvent(opponentName));
  };

  const handleGoalAgainst = () => {
    onAction(
      createGoalAgainstEvent({
        opponentName: opponentName,
        ourScore: ourScore,
        theirScore: theirScore,
      }),
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={{ flexDirection: "row", gap: 2, flex: 1 }}>
        <View style={{ flex: 4, gap: 2 }}>
          {currentLine.map((player) => (
            <DefensePlayerCard
              key={player.id}
              name={player.name}
              onD={() => handleD(player)}
            />
          ))}
        </View>

        <View style={{ flex: 1.5 }}>
          <ActionButton
            label={"THROWAWAY".split("").join("\n")}
            onPress={() => handleThrowawayAgainst()}
          />
        </View>
        <View style={{ flex: 1.5, justifyContent: "center" }}>
          <ActionButton
            label="They Scored"
            onPress={() => handleGoalAgainst()}
          />
        </View>
        <View style={{ flex: 1 }}></View>
      </View>
    </View>
  );
}
