import BigButton from "@/src/components/BigButton";
import GameDateInput from "@/src/components/GameDateInput";
import TextInputFormRow from "@/src/components/TextInputFormRow";
import { useData } from "@/src/contexts/DataContext";
import { GlobalStyles } from "@/src/styles/global";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import { Alert, Text, View } from "react-native";

export default function EditGame() {
  const { gameId } = useLocalSearchParams<{ gameId: string }>();
  const { games, updateGame } = useData();
  const router = useRouter();

  const currentGame = games.find((g) => g.id === gameId);

  const [timeStamp, setTimeStamp] = useState(
    currentGame?.timeStamp || Date.now(),
  );
  const [eventName, setEventName] = useState(currentGame?.eventName || "");
  const [opponentName, setOpponentName] = useState(
    currentGame?.opponentName || "",
  );

  const handleSave = async () => {
    if (!currentGame) return;
    if (opponentName.trim() === "") {
      Alert.alert("Error", "Opponent cannot be empty");
      return;
    }

    await updateGame({
      ...currentGame,
      timeStamp: timeStamp,
      eventName: eventName,
      opponentName: opponentName,
    });

    router.back();
  };

  return (
    <View style={GlobalStyles.container}>
      <Stack.Screen />
      <View style={GlobalStyles.contentContainer}>
        <Text style={GlobalStyles.headingText}>Edit Game</Text>
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
          label="Game Start:"
          date={timeStamp}
          onChange={(newDate) => setTimeStamp(newDate)}
          style={{ fontSize: 20 }}
        />
      </View>
      <BigButton title="Save Changes" onPress={handleSave} />
    </View>
  );
}
