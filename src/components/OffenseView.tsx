import { useState } from "react";
import { View } from "react-native";
import { Action } from "../lib/actions";
import {
  createCatchEvent,
  createDropEvent,
  createGoalForEvent,
  createThrowawayForEvent,
} from "../lib/models";
import { Player } from "../lib/types";
import { Colors } from "../styles/global";
import ActionButton from "./ActionButton";
import OffensePlayerCard from "./OffensePlayerCard";

export default function OffenseView({
  currentLine,
  onAction,
  ourScore,
  theirScore,
}: {
  currentLine: Player[];
  onAction: (action: Action) => void;
  ourScore: number;
  theirScore: number;
}) {
  const [selectedPlayer, setSelectedPlayer] = useState<Player | undefined>(
    undefined,
  );

  const handleCatch = (player: Player) => {
    if (!selectedPlayer) return;

    onAction(createCatchEvent({ thrower: selectedPlayer, receiver: player }));

    setSelectedPlayer(player);
  };

  const handleDrop = (player: Player) => {
    if (!selectedPlayer) return;

    onAction(createDropEvent({ thrower: selectedPlayer, receiver: player }));
  };

  const handleGoalFor = (player: Player) => {
    if (!selectedPlayer) return;

    const goal = createGoalForEvent({
      thrower: selectedPlayer,
      receiver: player,
      ourScore: ourScore,
      theirScore: theirScore,
    });

    onAction(goal);
  };

  const handleThrowawayFor = () => {
    if (!selectedPlayer) return;

    onAction(createThrowawayForEvent({ thrower: selectedPlayer }));
  };

  return (
    <View style={{ flex: 1, backgroundColor: Colors.surface }}>
      <View
        style={{
          flexDirection: "row",
          gap: 2,
          flex: 1,
        }}
      >
        <View style={{ flex: 5, gap: 2 }}>
          {currentLine.map((player) => (
            <OffensePlayerCard
              key={player.id}
              name={player.name}
              hasDisc={selectedPlayer === player}
              showButtons={selectedPlayer !== undefined}
              onPress={() => setSelectedPlayer(player)}
              onCatch={() => handleCatch(player)}
              onDrop={() => handleDrop(player)}
              onGoal={() => handleGoalFor(player)}
            />
          ))}
        </View>
        <View style={{ flex: 1 }}>
          <ActionButton
            label={"THROWAWAY".split("").join("\n")}
            onPress={() => handleThrowawayFor()}
          />
        </View>
      </View>
    </View>
  );
}
