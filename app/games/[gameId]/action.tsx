import BigButton from "@/src/components/BigButton";
import DefenseView from "@/src/components/DefenseView";
import OffenseView from "@/src/components/OffenseView";
import ScoreBoard from "@/src/components/ScoreBoard";
import { useData } from "@/src/contexts/DataContext";
import { Action } from "@/src/lib/actions";
import { Colors, GlobalStyles } from "@/src/styles/global";
import { Stack, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { FlatList, Text, View } from "react-native";

export default function ActionView() {
  const { gameId } = useLocalSearchParams<{ gameId: string }>();
  const { games, teams, players, updateGame } = useData();

  const currentGame = games.find((g) => g.id === gameId);

  const points = currentGame?.points || [];
  const currentPoint =
    points.length > 0
      ? points[points.length - 1]
      : {
          number: 1,
          startTime: Date.now(),
          startedOn: currentGame!.hasPossession ? "offense" : "defense",
          currentLine: [],
          actions: [],
          ourScore: 0,
          theirScore: 0,
        };

  const currentTeam = teams.find((t) => t.id === currentGame!.teamId);
  const roster = players.filter((p) => currentTeam!.playerIDs.includes(p.id));
  const activePlayers = roster
    ?.filter((p) => p.active)
    .sort((a, b) => a.name.localeCompare(b.name));
  const unknownPlayer = roster.find((p) => p.id.includes("unknown"));

  const [currentLine, setCurrentLine] = useState(() => {
    const initialLine =
      (currentGame!.currentLine.length ?? 0) > 0
        ? currentGame!.currentLine
        : activePlayers.slice(0, 7);

    const alreadyHasUnkonw = initialLine.some((p) => p.id.includes("unknown"));

    return unknownPlayer && !alreadyHasUnkonw
      ? [...initialLine, unknownPlayer]
      : initialLine;
  });

  // what if the game just started?
  // const [currentPoint, setCurrentPoint] = useState(
  //   currentGame!.points[-1] || {
  //     number: 1,
  //     startTime: Date.now(),
  //     startedOn: currentGame!.hasPossession ? "offense" : "defense",
  //     currentLine: currentLine,
  //     actions: [],
  //     ourScore: 0,
  //     theirScore: 0,
  //   },
  // );
  const [currentPossession, setCurrentPossession] = useState(
    currentGame?.hasPossession,
  );

  if (!currentGame) return <Text>Game not found</Text>;
  // if (!currentTeam) return <Text>Team not found</Text>;
  // if (!activePlayers) return <Text>Active Players not found</Text>;
  if (!currentLine) return <Text>No Line found</Text>;

  const handleAction = async (action: Action) => {
    if (!currentGame) return;

    const updatedPoints = [...(currentGame.points || [])];
    const lastPointIndex = updatedPoints.length - 1;
    updatedPoints[lastPointIndex] = {
      ...updatedPoints[lastPointIndex],
      actions: [...updatedPoints[lastPointIndex].actions, action],
    };

    let ourScore = currentGame.ourScore;
    let theirScore = currentGame.theirScore;

    if (action.name === "goal") {
      if (action.thrower.name === "defense") {
        theirScore += 1;
      } else {
        ourScore += 1;
      }
    }

    const updatedGame = {
      ...currentGame,
      points: updatedPoints,
      ourScore,
      theirScore,
    };

    await updateGame(updatedGame);
  };

  return (
    <View style={GlobalStyles.container}>
      <Stack.Screen options={{ headerTitle: "Action" }} />
      <View style={GlobalStyles.titleContainer}>
        <ScoreBoard
          game={currentGame}
          style={[GlobalStyles.headingText, { color: Colors.white }]}
        />
      </View>
      <View style={GlobalStyles.contentContainer}>
        {currentPossession ? (
          <OffenseView currentLine={currentLine} onAction={handleAction} />
        ) : (
          <DefenseView currentLine={currentLine} onAction={handleAction} />
        )}
      </View>
      <View>
        <FlatList
          data={currentPoint.actions.slice(-5)}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => {
            if (item.name === "catch") {
              return (
                <Text>
                  {item.name} from {item.thrower.name} to {item.receiver.name}
                </Text>
              );
            }
            return null;
          }}
          ListEmptyComponent={<Text>No Actions Yet</Text>}
        />
      </View>
      <BigButton
        title="SWITCH"
        onPress={() => setCurrentPossession(!currentPossession)}
      />
    </View>
  );
}
