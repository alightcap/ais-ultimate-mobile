import BigButton from "@/src/components/BigButton";
import GameDateInput from "@/src/components/GameDateInput";
import HeaderBack from "@/src/components/HeaderBack";
import TextInputFormRow from "@/src/components/TextInputFormRow";
import { useData } from "@/src/contexts/DataContext";
import { GlobalStyles } from "@/src/styles/global";
import { DefaultStackOptions } from "@/src/styles/navigation";
import { getId } from "@/src/utils/uniqueId";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import { Alert, Text, View } from "react-native";

export default function NewGame() {
  const router = useRouter();
  const { teams, addGame } = useData();
  const { teamId } = useLocalSearchParams<{ teamId: string }>();
  const [timeStamp, setTimeStamp] = useState(Date.now());
  const [eventName, setEventName] = useState("");
  const [opponentName, setOpponentName] = useState("");

  const currentTeam = teams.find((t) => t.id === teamId);
  if (!currentTeam) {
    Alert.alert("Error", "No team selected to add this game to.");
    router.back();
    return;
  }

  const handleSave = () => {
    if (opponentName.trim() === "") {
      Alert.alert("Error", "Please enter an opponent name");
      return;
    }
    const newId = getId();

    addGame({
      id: newId,
      timeStamp: timeStamp,
      teamId: teamId,
      eventName: eventName,
      opponentName: opponentName,
      ourScore: 0,
      theirScore: 0,
      isOver: false,
      isArchived: false,
    });
    router.replace({
      pathname: "/games/[gameId]",
      params: { gameId: newId },
    });
  };

  return (
    <View style={GlobalStyles.container}>
      <Stack.Screen
        options={{
          ...DefaultStackOptions,
          title: `${currentTeam.name}`,
          headerLeft: (props) => <HeaderBack {...props} />,
        }}
      />
      <View style={{ flex: 1 }}>
        <Text style={GlobalStyles.headingText}>New Game</Text>
        <TextInputFormRow
          title="Opponent"
          item={opponentName}
          setItem={setOpponentName}
        />
        <TextInputFormRow
          title="Event"
          item={eventName}
          setItem={setEventName}
        />

        <GameDateInput
          label="Game Start: "
          date={timeStamp}
          onChange={(newDate) => setTimeStamp(newDate)}
          style={{ fontSize: 20 }}
        />
      </View>

      <BigButton title="Start Game" onPress={() => handleSave()} />
    </View>
  );
}
