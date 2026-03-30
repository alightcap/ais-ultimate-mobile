import { useMemo, useState } from "react";
import { Modal, Text, View } from "react-native";
import { Action } from "../lib/actions";
import {
  createDeEvent,
  createGoalAgainstEvent,
  createThrowawayAgainstEvent,
} from "../lib/models";
import { Player, Point } from "../lib/types";
import ActionButton from "./ActionButton";
import BigButton from "./BigButton";
import DefensePlayerCard from "./DefensePlayerCard";

export default function DefenseView({
  currentPoint,
  currentLine,
  onAction,
  opponentName,
  ourScore,
  theirScore,
}: {
  currentPoint: Point;
  currentLine: Player[];
  onAction: (action: Action) => void;
  opponentName: string;
  ourScore: number;
  theirScore: number;
}) {
  const [pullModalVisible, setPullModalVisible] = useState(false);
  const isPulling = currentPoint.actions.length === 0;

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

  const handlePull = (player: Player) => {
    setPullModalVisible(true);
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={{ flexDirection: "row", gap: 2, flex: 1 }}>
        <View style={{ flex: 4, gap: 2 }}>
          {displayLine.map((player) => {
            const isEmpty = player.id.startsWith("empty");

            return (
              <DefensePlayerCard
                key={player.id}
                name={player.name}
                isPulling={isPulling}
                onD={() => handleD(player)}
                onPull={() => handlePull(player)}
                isEmpty={isEmpty}
              />
            );
          })}
        </View>

        <View style={{ flex: 1.5 }}>
          {!isPulling && (
            <ActionButton
              label={"THROWAWAY".split("").join("\n")}
              onPress={() => handleThrowawayAgainst()}
            />
          )}
        </View>
        <View style={{ flex: 1.5, justifyContent: "center" }}>
          {!isPulling && (
            <ActionButton
              label="They Scored"
              onPress={() => handleGoalAgainst()}
            />
          )}
        </View>
        <View style={{ flex: 1 }}></View>
      </View>

      <Modal
        animationType="slide"
        visible={pullModalVisible}
        onRequestClose={() => setPullModalVisible(false)}
      >
        <View style={{ flex: 1 }}>
          <Text>Pulling</Text>
          {/** caught/landed, caught/landed no hang time, OB, cancel */}
          <BigButton
            viewStyle={{ backgroundColor: "red" }}
            title="Cancel"
            onPress={() => setPullModalVisible(false)}
          />
        </View>
      </Modal>
    </View>
  );
}
