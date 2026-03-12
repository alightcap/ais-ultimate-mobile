import { useData } from "@/src/contexts/DataContext";
import { GlobalStyles } from "@/src/styles/global";
import { HeaderBackButton } from "@react-navigation/elements";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { Text, View } from "react-native";

export default function GameIndex() {
  const router = useRouter();
  const { games, teams, players } = useData();
  const { gameId } = useLocalSearchParams<{ gameId: string }>();
  const currentGame = games.find((g) => g.id === gameId);
  if (!currentGame)
    return <Text style={GlobalStyles.empty}>Game not found</Text>;
  const currentTeam = teams.find((t) => t.id === currentGame.teamId);
  if (!currentTeam)
    return <Text style={GlobalStyles.empty}>Team not found</Text>;
  const roster = players.filter((p) => currentTeam.playerIDs.includes(p.id));
  //   const dateString = formatTimeStamp();

  const { timeStamp, eventName, opponentName, ourScore, theirScore } =
    currentGame;

  return (
    <View style={GlobalStyles.container}>
      <Stack.Screen
        options={{
          title: `${currentTeam.name}`,
          headerShown: true,
          headerTintColor: "black",
          headerLeft: (props) => (
            <HeaderBackButton
              {...props}
              displayMode="minimal"
              onPress={() => router.back()}
              style={{ marginRight: -10 }}
            />
          ),
        }}
      />
      <View style={{ flexDirection: "row" }}>
        <Text>{new Date(timeStamp).toDateString()}</Text>
        <Text>
          {new Date(timeStamp).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </Text>
        <Text>
          {ourScore} - {theirScore}
        </Text>
        {/**conditial style if we are winning, losing, or tied */}
      </View>
      <View style={{ flexDirection: "row" }}>
        <Text style={{ fontWeight: "bold" }}>Opponent</Text>
        <Text>{opponentName}</Text>
      </View>
      <View style={{ flexDirection: "row" }}>
        <Text style={{ fontWeight: "bold" }}>Event</Text>
        <Text>{eventName}</Text>
      </View>
      <View style={{ flexDirection: "row" }}>
        <Text style={{ fontWeight: "bold" }}>Starting on</Text>
        <Text>Offense or Defence</Text>
        {/** add a toggle switch */}
      </View>
      <View style={{ flexDirection: "row" }}>
        <Text style={{ fontWeight: "bold" }}>Game To</Text>
        <Text>Odd number or Time</Text>
        {/** add a toggle switch? or decide what to do */}
      </View>
      <View style={{ flexDirection: "row" }}>
        <Text style={{ fontWeight: "bold" }}>Timeouts</Text>
        <Text>per half/floaters/taken</Text>
      </View>
      <View style={{ flexDirection: "row" }}>
        <Text style={{ fontWeight: "bold" }}>Statistics</Text>
        <Text>Nav Arrow</Text>
      </View>
      <View style={{ flexDirection: "row" }}>
        <Text style={{ fontWeight: "bold" }}>Recap</Text>
        <Text>Nav Arrow</Text>
      </View>
      <View style={{ flexDirection: "row" }}>
        <Text style={{ fontWeight: "bold" }}>Wind</Text>
        <Text>Details</Text>
        <Text>Nav Arrow</Text>
      </View>
    </View>
  );
}
