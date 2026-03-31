import { useMemo, useState } from "react";
import { Modal, Text, View } from "react-native";
import { Action } from "../lib/actions";
import {
  createDeEvent,
  createGoalAgainstEvent,
  createNewPullEvent,
  createNewPullObEvent,
  createThrowawayAgainstEvent,
} from "../lib/models";
import { Player, Point } from "../lib/types";
import ActionButton from "./ActionButton";
import BigButton from "./BigButton";
import DefensePlayerCard from "./DefensePlayerCard";
import SpinningDisc from "./SpinningDisc";

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
  const [pullStartTime, setPullStartTime] = useState(0);
  const [pullThrower, setPullThrower] = useState<Player>();

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

  const handlePullStart = (player: Player) => {
    setPullThrower(player);
    setPullStartTime(Date.now());
    setPullModalVisible(true);
  };

  const handlePullEnd = ({
    hasHangTime,
    isInBounds,
  }: {
    hasHangTime: boolean;
    isInBounds: boolean;
  }) => {
    if (!pullThrower) return;

    const hangTime =
      pullStartTime !== 0 ? (hasHangTime ? Date.now() - pullStartTime : 0) : 0;

    if (isInBounds) {
      onAction(
        createNewPullEvent({
          thrower: pullThrower,
          hangTime: hangTime,
        }),
      );
    } else {
      onAction(createNewPullObEvent({ thrower: pullThrower }));
    }

    setPullModalVisible(false);
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
                onPull={() => handlePullStart(player)}
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
        animationType="fade"
        visible={pullModalVisible}
        onRequestClose={() => setPullModalVisible(false)}
      >
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View
            style={{
              gap: 10,
              width: "80%",
              alignItems: "center",
            }}
          >
            <SpinningDisc />
            <Text style={{ textAlign: "center" }}>Pulling</Text>
            <BigButton
              viewStyle={{ borderWidth: 2, alignSelf: "stretch" }}
              title="In Bounds"
              onPress={() =>
                handlePullEnd({ isInBounds: true, hasHangTime: true })
              }
            />
            <BigButton
              viewStyle={{ borderWidth: 2, alignSelf: "stretch" }}
              title="Out of Bounds"
              onPress={() =>
                handlePullEnd({ isInBounds: false, hasHangTime: false })
              }
            />
            <BigButton
              viewStyle={{ borderWidth: 2, alignSelf: "stretch" }}
              title={"No Hang Time"}
              onPress={() =>
                handlePullEnd({ isInBounds: true, hasHangTime: false })
              }
            />
            <BigButton
              viewStyle={{ backgroundColor: "red", alignSelf: "stretch" }}
              textStyle={{ fontWeight: "600" }}
              title="Cancel"
              onPress={() => setPullModalVisible(false)}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
}
