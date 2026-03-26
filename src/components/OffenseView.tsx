import { useState } from "react";
import { Text, View } from "react-native";
import { Action } from "../lib/actions";
import {
  createCatchEvent,
  createDropEvent,
  createGoalEvent,
  createThrowawayEvent,
} from "../lib/models";
import { Player } from "../lib/types";
import { Colors, GlobalStyles } from "../styles/global";
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

  const handleGoal = (player: Player) => {
    if (!selectedPlayer) return;

    const goal = createGoalEvent({
      thrower: selectedPlayer,
      receiver: player,
      ourScore: ourScore,
      theirScore: theirScore,
    });

    onAction(goal);
  };

  const handleThrowaway = () => {
    if (!selectedPlayer) return;

    onAction(createThrowawayEvent({ thrower: selectedPlayer }));
  };

  return (
    <View style={[GlobalStyles.contentContainer, { flex: 1 }]}>
      <View style={{ height: 50 }}>
        <Text>Headings go here</Text>
      </View>
      <View
        style={{
          flexDirection: "row",
          flex: 1,
          backgroundColor: Colors.surface,
        }}
      >
        <View style={{ flex: 5, margin: 2 }}>
          {currentLine.map((player) => (
            <OffensePlayerCard
              key={player.id}
              name={player.name}
              hasDisc={selectedPlayer === player}
              showButtons={selectedPlayer !== undefined}
              onPress={() => setSelectedPlayer(player)}
              onCatch={() => handleCatch(player)}
              onDrop={() => handleDrop(player)}
              onGoal={() => handleGoal(player)} // record goal from selected player to this player, go to pick line view
            />
          ))}
        </View>
        <ActionButton
          label={"THROWAWAY".split("").join("\n")}
          onPress={() => handleThrowaway()} // record throwaway and switch to defence
        />
      </View>
    </View>
  );
}
