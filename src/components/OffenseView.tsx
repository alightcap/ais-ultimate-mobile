import { useMemo, useState } from "react";
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

  const displayLine = useMemo(() => {
    const knownPlayers = currentLine.filter((p) => !p.id.includes("unknown"));
    const unknownPlayer = currentLine.find((p) => p.id.includes("unknown"));

    const emptyCount = 7 - knownPlayers.length;

    if (emptyCount <= 0) return currentLine;

    const placeholders = Array.from({ length: Math.max(0, emptyCount) }).map(
      (_, i) =>
        ({
          id: `empty-${i}`,
          name: "",
          active: false,
          teamIDs: [],
          isArchived: false,
        }) as Player,
    );

    const finalLine = [...knownPlayers, ...placeholders];
    if (unknownPlayer) {
      finalLine.push(unknownPlayer);
    }

    return finalLine;
  }, [currentLine]);

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
          {displayLine.map((player) => {
            const isEmpty = player.id.startsWith("empty");
            const isUnknown = player.id.includes("unknown");

            const showButtons =
              !isEmpty &&
              selectedPlayer !== undefined &&
              (isUnknown || player.id !== selectedPlayer.id);

            return (
              <OffensePlayerCard
                key={player.id}
                name={player.name}
                hasDisc={player.id === selectedPlayer?.id}
                showButtons={showButtons}
                onPress={() => !isEmpty && setSelectedPlayer(player)}
                onCatch={() => !isEmpty && handleCatch(player)}
                onDrop={() => !isEmpty && handleDrop(player)}
                onGoal={() => !isEmpty && handleGoalFor(player)}
                isEmpty={isEmpty}
              />
            );
          })}
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
