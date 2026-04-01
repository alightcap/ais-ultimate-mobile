import Button from "@/src/components/Button";
import HeaderBack from "@/src/components/HeaderBack";
import GameDateInput from "@/src/components/Inputs/GameDateInput";
import TextInputFormRow from "@/src/components/Inputs/TextInputFormRow";
import { useData } from "@/src/contexts/DataContext";
import { createNewGame } from "@/src/lib/models";
import { GlobalStyles } from "@/src/styles/global";
import { DefaultStackOptions } from "@/src/styles/navigation";
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
    const newGame = createNewGame({
      teamId: currentTeam.id,
      opponentName: opponentName,
      eventName: eventName,
    });

    addGame(newGame);
    router.replace({
      pathname: "/games/[gameId]",
      params: { gameId: newGame.id },
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
        <View style={GlobalStyles.titleContainer}>
          <Text style={GlobalStyles.headingText}>New Game</Text>
        </View>
        <View style={[GlobalStyles.contentContainer, { flex: 8 }]}>
          <TextInputFormRow
            title="Opponent"
            item={opponentName}
            setItem={setOpponentName}
            autoFocus={true}
          />
          <TextInputFormRow
            title="Event"
            item={eventName}
            setItem={setEventName}
          />

          <GameDateInput
            label="Date: "
            date={timeStamp}
            onChange={(newDate) => setTimeStamp(newDate)}
            style={{ fontSize: 20 }}
          />
        </View>
      </View>
      <Button
        title="Create Game"
        onPress={() => handleSave()}
        viewStyle={GlobalStyles.bigButtonScreenBottom}
      />
    </View>
  );
}
