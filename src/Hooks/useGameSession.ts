import { useMemo, useState } from "react";
import { useData } from "../contexts/DataContext";
import { Action } from "../lib/actions";
import { createNewPoint } from "../lib/models";

export function useGameSession(gameId: string) {
  const { games, teams, players, updateGame } = useData();
  const [lineModalVisible, setLineModalVisible] = useState(false);

  const currentGame = games.find((g) => g.id === gameId);
  const currentTeam = teams.find((t) => t.id === currentGame?.teamId);

  const points = currentGame?.points || [];

  const activePlayers = useMemo(() => {
    if (!currentTeam) return [];
    return players.filter(
      (p) => p.teamIDs.includes(currentTeam.id) && p.active,
    );
  }, [players, currentTeam]);

  const currentPoint = currentGame?.points[currentGame.points.length - 1];

  const handleAction = async (action: Action) => {
    if (!currentGame) return;

    let updatedPoints = [...currentGame.points];
    const lastPointIndex = updatedPoints.length - 1;

    updatedPoints[lastPointIndex] = {
      ...updatedPoints[lastPointIndex],
      actions: [...updatedPoints[lastPointIndex].actions, action],
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
      const nextPoint = createNewPoint(
        updatedPoints[lastPointIndex].number + 1,
      );
      updatedPoints = [...updatedPoints, nextPoint];
      setLineModalVisible(true);
    }

    const updatedGame = {
      ...currentGame,
      points: updatedPoints,
      ourScore: newOurScore,
      theirScore: newTheirScore,
      hasPossession: newPossession,
    };

    await updateGame(updatedGame);
  };

  const currentLine = useMemo(() => {
    if (!currentTeam) return [];

    const savedLine = currentGame?.currentLine || [];
    const initialLine =
      savedLine.length > 0 ? savedLine : activePlayers.slice(0, 7);

    const unknownPlayer = players.find(
      (p) => p.id === `${currentTeam?.id}-unknown`,
    );

    const alreadyHasUnknown = initialLine?.some((p) =>
      p.id.includes("unknown"),
    );

    return unknownPlayer && !alreadyHasUnknown
      ? [...initialLine, unknownPlayer]
      : initialLine;
  }, [currentGame?.currentLine, currentTeam, activePlayers, players]);

  const recentActions = useMemo(() => {
    return points
      .flatMap((p) => p.actions)
      .reverse()
      .slice(0, 5);
  }, [points]);

  return {
    activePlayers,
    currentGame,
    currentTeam,
    currentPoint,
    currentLine,
    handleAction,
    isOffense: currentGame?.hasPossession,
    lineModalVisible,
    recentActions,
    setLineModalVisible,
  };
}
