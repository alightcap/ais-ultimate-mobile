import { useEffect, useMemo, useState } from "react";
import { useData } from "../contexts/DataContext";
import { Action } from "../lib/actions";
import { createNewPoint } from "../lib/models";

export function useGameSession(gameId: string) {
  const { games, teams, players, updateGame } = useData();
  const [lineModalVisible, setLineModalVisible] = useState(false);

  const currentGame = games.find((g) => g.id === gameId);
  const currentTeam = teams.find((t) => t.id === currentGame?.teamId);

  const activePlayers = useMemo(() => {
    if (!currentTeam) return [];
    return players.filter(
      (p) => p.teamIDs.includes(currentTeam.id) && p.active,
    );
  }, [players, currentTeam]);

  useEffect(() => {
    if (currentGame && currentGame.points.length === 0) {
      const initializeGame = async () => {
        const hasPossession = currentGame.startingOn === "offense";

        const initialLine = activePlayers.slice(0, 7);

        const firstPoint = createNewPoint({
          pointNumber: 1,
          currentLine: initialLine,
        });
        await updateGame({
          ...currentGame,
          points: [firstPoint],
          hasPossession: hasPossession,
        });
      };

      initializeGame();
    }
  }, [currentGame, activePlayers, updateGame]);

  const currentPoint =
    currentGame?.points && currentGame.points.length > 0
      ? currentGame.points[currentGame.points.length - 1]
      : null;

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
      setLineModalVisible(true);
      const nextPoint = createNewPoint({
        pointNumber: updatedPoints[lastPointIndex].number + 1,
        currentLine: currentLine,
      });
      updatedPoints = [...updatedPoints, nextPoint];
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

  const isOffense = currentGame?.hasPossession;

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
    recentActions,
    setLineModalVisible,
    saveLine,
  };
}
