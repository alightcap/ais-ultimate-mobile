import { useCallback, useEffect, useMemo, useState } from "react";
import { useData } from "../contexts/DataContext";
import { Action } from "../lib/actions";
import { createNewPoint, createStartGameEvent } from "../lib/models";
import { Player } from "../lib/types";

// TODO: when the first point is created, check the halftime settings
// and if the halfTime mode is time, set an "alarm" for the start
// time + time cap / 2, when that alarm goes, a notification
// should appear indicating that half will be at the end
// of the current point.

export function useGameSession(gameId: string) {
  const { games, teams, players, updateGame } = useData();
  const [lineModalVisible, setLineModalVisible] = useState(false);

  // Selectors
  const currentGame = games.find((g) => g.id === gameId);
  const currentTeam = teams.find((t) => t.id === currentGame?.teamId);
  const currentPoint =
    currentGame?.points && currentGame.points.length > 0
      ? currentGame.points[currentGame.points.length - 1]
      : null;

  const roster = useMemo(() => {
    if (!currentTeam) return [];
    return players.filter((p) => p.teamIDs.includes(currentTeam.id));
  }, [currentTeam, players]);

  const activePlayers = useMemo(() => {
    if (!roster) return [];
    return roster?.filter((p) => p.active);
  }, [roster]);

  const initializeGame = useCallback(async () => {
    if (!currentGame || !activePlayers) return;

    const initialLineIds = activePlayers.slice(0, 7).map((p) => p.id);

    const startAction = createStartGameEvent({
      startTime: currentGame.timeStamp,
    });

    const firstPoint = createNewPoint({
      number: 1,
      currentLineIds: initialLineIds,
      actions: [startAction],
    });

    await updateGame({
      ...currentGame,
      points: [firstPoint],
    });
  }, [currentGame, activePlayers, updateGame]);

  useEffect(() => {
    if (currentGame && currentGame.points.length === 0) {
      initializeGame();
    }
  }, [currentGame, activePlayers, initializeGame]);

  const currentLineIds = useMemo(() => {
    const lastPoint = currentGame?.points[currentGame.points.length - 1];
    return lastPoint?.currentLineIds || currentGame?.currentLineIds || [];
  }, [currentGame]);

  const currentLine = useMemo(() => {
    return currentLineIds
      .map((id) => players.find((p) => p.id === id))
      .filter((p): p is Player => !!p)
      .filter((p) => p.active)
      .sort((a, b) => {
        if (a.id.includes("unknown")) return 1;
        if (b.id.includes("unknown")) return -1;
        return a.name.localeCompare(b.name);
      });
  }, [currentLineIds, players]);

  const rawLineIds = useMemo(() => {
    const lastPoint = currentGame?.points[currentGame.points.length - 1];
    return lastPoint?.currentLineIds || [];
  }, [currentGame]);

  // Handler
  const handleAction = async (action: Action) => {
    // TODO: handle half time.
    // TODO: handle game over.
    if (!currentGame || !currentGame.points.length) return;

    let updatedPoints = [...currentGame.points];
    const lastIdx = updatedPoints.length - 1;

    updatedPoints[lastIdx] = {
      ...updatedPoints[lastIdx],
      actions: [...updatedPoints[lastIdx].actions, action],
    };

    const newOurScore =
      action.name === "goal for"
        ? currentGame.ourScore + 1
        : currentGame.ourScore;
    const newTheirScore =
      action.name === "goal against"
        ? currentGame.theirScore + 1
        : currentGame.theirScore;

    const newPossession = action.switchPossession
      ? !currentGame.hasPossession
      : currentGame.hasPossession;

    if (action.endPoint) {
      updatedPoints[lastIdx].ourScore = newOurScore;
      updatedPoints[lastIdx].theirScore = newTheirScore;

      const cleanLineIds = currentLineIds
        .filter((id) => id !== "" && !id.includes("unknown"))
        .map((id) => players.find((p) => p.id === id))
        .filter((p): p is Player => !!p)
        .sort((a, b) => a.name.localeCompare(b.name))
        .map((p) => p.id);

      const nextPoint = createNewPoint({
        number: updatedPoints[lastIdx].number + 1,
        currentLineIds: cleanLineIds,
      });
      updatedPoints.push(nextPoint);
      setLineModalVisible(true);
    }

    await updateGame({
      ...currentGame,
      points: updatedPoints,
      ourScore: newOurScore,
      theirScore: newTheirScore,
      hasPossession: newPossession,
    });
  };

  const isOffense = useMemo(() => {
    return (currentGame?.points.reduce((acc, p) => acc + p.actions.length, 0) ||
      0) <= 1
      ? currentGame?.startingOn === "offense"
      : currentGame?.hasPossession;
  }, [currentGame]);

  const pointsPlayed = useMemo(() => {
    if (!currentGame) return {};

    const counts: Record<string, number> = {};

    if (roster) {
      roster.forEach((player) => (counts[player.id] = 0));
    }

    currentGame.points.slice(0, -1).forEach((point) => {
      point.currentLineIds?.forEach((playerId) => {
        counts[playerId] = (counts[playerId] || 0) + 1;
      });
    });
    return counts;
  }, [currentGame, roster]);

  const allActions = useMemo(() => {
    const gamePoints = currentGame?.points || [];
    return gamePoints.flatMap((p) => p.actions).toReversed();
  }, [currentGame?.points]);

  const recentActions = useMemo(() => {
    return allActions.slice(0, 5);
  }, [allActions]);

  const undoAction = async () => {
    if (!currentGame || currentGame.points.length === 0) return;

    const updatedPoints = [...currentGame.points];
    let lastPointIdx = updatedPoints.length - 1;
    let lastPoint = { ...updatedPoints[lastPointIdx] };

    if (lastPoint.actions.length === 0 && updatedPoints.length > 1) {
      updatedPoints.pop();
      lastPointIdx = updatedPoints.length - 1;
      lastPoint = { ...updatedPoints[lastPointIdx] };
      setLineModalVisible(false);
    }

    const actionToDelete = lastPoint.actions[lastPoint.actions.length - 1];
    if (actionToDelete?.name === "game start") return;

    const newActions = lastPoint.actions.slice(0, -1);

    updatedPoints[lastPointIdx] = {
      ...lastPoint,
      actions: newActions,
      ourScore:
        actionToDelete.name === "goal for"
          ? (lastPoint.ourScore ?? 0) - 1
          : lastPoint.ourScore,
      theirScore:
        actionToDelete.name === "goal against"
          ? (lastPoint.theirScore ?? 0) - 1
          : lastPoint.theirScore,
    };

    const newOurScore =
      actionToDelete.name === "goal for"
        ? currentGame.ourScore - 1
        : currentGame.ourScore;
    const newTheirScore =
      actionToDelete.name === "goal against"
        ? currentGame.theirScore - 1
        : currentGame.theirScore;

    const newPossession = actionToDelete.switchPossession
      ? !currentGame.hasPossession
      : currentGame.hasPossession;

    await updateGame({
      ...currentGame,
      points: updatedPoints,
      ourScore: newOurScore,
      theirScore: newTheirScore,
      hasPossession: newPossession,
    });
  };

  return {
    activePlayers,
    allActions,
    currentGame,
    currentTeam,
    currentPoint,
    currentLine,
    handleAction,
    isOffense,
    lineModalVisible,
    pointsPlayed,
    rawLineIds,
    recentActions,
    roster,
    setLineModalVisible,
    undoAction,
  };
}
