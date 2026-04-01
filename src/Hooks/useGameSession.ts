import { useMemo, useState } from "react";
import { useData } from "../contexts/DataContext";
import { Action } from "../lib/actions";
import { createNewPoint } from "../lib/models";
import { Player } from "../lib/types";

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
    if (!roster) return;
    return roster?.filter((p) => p.active);
  }, [roster]);

  const currentLineIds = useMemo(() => {
    const lastPoint = currentGame?.points[currentGame.points.length - 1];
    return lastPoint?.currentLineIds || currentGame?.currentLineIds || [];
  }, [currentGame]);

  const currentLine = useMemo(() => {
    // filters out players marked as inactive
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

  // Handler
  const handleAction = async (action: Action) => {
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

      const nextPoint = createNewPoint({
        number: updatedPoints[lastIdx].number + 1,
        currentLineIds: currentLineIds,
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

  const isOffense = currentGame?.hasPossession;

  const pointsPlayed = useMemo(() => {
    if (!currentGame) return {};

    const counts: Record<string, number> = {};

    currentGame.points.forEach((point) => {
      point.currentLineIds?.forEach((playerId) => {
        counts[playerId] = (counts[playerId] || 0) + 1;
      });
    });
    return counts;
  }, [currentGame]);

  const recentActions = useMemo(() => {
    const gamePoints = currentGame?.points || [];
    return gamePoints
      .flatMap((p) => p.actions)
      .reverse()
      .slice(0, 5);
  }, [currentGame?.points]);

  const saveLine = () => {};

  return {
    activePlayers,
    currentGame,
    currentTeam,
    currentPoint,
    currentLine,
    handleAction,
    isOffense,
    lineModalVisible,
    pointsPlayed,
    recentActions,
    roster,
    setLineModalVisible,
    saveLine,
  };
}
