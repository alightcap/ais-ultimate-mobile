import ActionCard from "@/src/components/Action Cards/ActionCard";
import BigButton from "@/src/components/BigButton";
import DefenseView from "@/src/components/DefenseView";
import OffenseView from "@/src/components/OffenseView";
import ScoreBoard from "@/src/components/ScoreBoard";
import { useData } from "@/src/contexts/DataContext";
import { Action } from "@/src/lib/actions";
import { Colors, GlobalStyles } from "@/src/styles/global";
import { Stack, useLocalSearchParams } from "expo-router";
import { FlatList, Text, View } from "react-native";

export default function ActionView() {
  const { gameId } = useLocalSearchParams<{ gameId: string }>();
  const { games, teams, players, updateGame } = useData();

  const currentGame = games.find((g) => g.id === gameId);
  const currentTeam = teams.find((t) => t.id === currentGame!.teamId);

  const unknownPlayer = players.find(
    (p) => p.id === `${currentTeam!.id}-unknown`,
  );

  const points = currentGame?.points || [];
  const currentPoint = points[points.length - 1] || { actions: [] };
  const isOffense = currentGame?.hasPossession;

  const activePlayers = players.filter(
    (p) => p.teamIDs.includes(currentTeam!.id) && p.active,
  );
  const initialLine =
    (currentGame?.currentLine.length ?? 0) > 0
      ? currentGame!.currentLine
      : activePlayers.slice(0, 7);
  const alreadyHasUnkown = initialLine.some((p) => p.id.includes("unknown"));
  const currentLine =
    unknownPlayer && !alreadyHasUnkown
      ? [...initialLine, unknownPlayer]
      : initialLine;

  if (!currentGame) return <Text>Game not found</Text>;
  if (!currentTeam) return <Text>Team not found</Text>;
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

    let newPossession = currentGame.hasPossession;
    if (action.switchPossession) {
      newPossession = !currentGame.hasPossession;
    }

    // if (action.name === "goal") {
    //   if (action.thrower.name === "defense") {
    //     theirScore += 1;
    //   } else {
    //     ourScore += 1;
    //   }
    // }

    const updatedGame = {
      ...currentGame,
      points: updatedPoints,
      ourScore,
      theirScore,
      hasPossession: newPossession,
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
        {isOffense ? (
          <OffenseView currentLine={currentLine} onAction={handleAction} />
        ) : (
          <DefenseView currentLine={currentLine} onAction={handleAction} />
        )}
      </View>
      <View style={{ margin: 2, backgroundColor: Colors.surface }}>
        <FlatList
          data={currentPoint.actions.slice(-3)}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => {
            return <ActionCard action={item} />;
          }}
          ListEmptyComponent={<Text>No Actions Yet</Text>}
        />
      </View>
      <BigButton
        title="SWITCH"
        onPress={async () => {
          await updateGame({
            ...currentGame,
            hasPossession: !currentGame.hasPossession,
          });
        }}
      />
    </View>
  );
}
