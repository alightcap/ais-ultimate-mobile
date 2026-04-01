import { useMemo, useState } from "react";
import { Modal, Text, View } from "react-native";
import { Action } from "../../lib/actions";
import {
  createDeEvent,
  createGoalAgainstEvent,
  createNewPullEvent,
  createNewPullObEvent,
  createThrowawayAgainstEvent,
} from "../../lib/models";
import { Player, Point } from "../../lib/types";
import ActionButton from "../ActionButton";
import DefensePlayerCard from "../ActionPlayerCards/DefensePlayerCard";
import Button from "../Button";
import SpinningDisc from "../SpinningDisc";

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
    const knownPlayerIds = currentLine.filter((p) => !p.id.includes("unknown"));
    const unknownPlayerId = currentLine.find((p) => p.id.includes("unknown"));

    const emptyCount = 7 - knownPlayerIds.length;

    if (emptyCount <= 0) return currentLine;

    const placeholderIds = Array.from({ length: Math.max(0, emptyCount) }).map(
      (_, i) =>
        ({
          id: `empty-${i}`,
          name: "",
          active: false,
          teamIDs: [],
          isArchived: false,
        }) as Player,
    );

    const finalLineIds = [...knownPlayerIds, ...placeholderIds];
    if (unknownPlayerId) {
      finalLineIds.push(unknownPlayerId);
    }

    return finalLineIds;
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
            return (
              <DefensePlayerCard
                key={player.id}
                playerProps={{
                  isPulling: isPulling,
                  player: player,
                  onD: () => handleD(player),
                  onPull: () => handlePullStart(player),
                }}
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
            <Button
              viewStyle={{ alignSelf: "stretch" }}
              title="In Bounds"
              onPress={() =>
                handlePullEnd({ isInBounds: true, hasHangTime: true })
              }
            />
            <Button
              viewStyle={{ alignSelf: "stretch" }}
              title="Out of Bounds"
              onPress={() =>
                handlePullEnd({ isInBounds: false, hasHangTime: false })
              }
            />
            <Button
              viewStyle={{ alignSelf: "stretch" }}
              title={"No Hang Time"}
              onPress={() =>
                handlePullEnd({ isInBounds: true, hasHangTime: false })
              }
            />
            <Button
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
