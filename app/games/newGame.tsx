import BigButton from "@/src/components/BigButton";
import TextInputFormRow from "@/src/components/TextInputFormRow";
import { useData } from "@/src/contexts/DataContext";
import { GlobalStyles } from "@/src/styles/global";
import { DefaultStackOptions } from "@/src/styles/navigation";
import { getDateTimeString } from "@/src/utils/dates";
import { getId } from "@/src/utils/uniqueId";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import { HeaderBackButton } from "@react-navigation/elements";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import { Alert, Platform, Pressable, Text, View } from "react-native";

export default function NewGame() {
  const router = useRouter();
  const { teams, addGame } = useData();
  const { teamId } = useLocalSearchParams<{ teamId: string }>();
  const [timeStamp, setTimeStamp] = useState(Date.now());
  const [eventName, setEventName] = useState("");
  const [opponentName, setOpponentName] = useState("");
  const [showPicker, setShowPicker] = useState(false);
  const currentDate = new Date(timeStamp);

  const currentTeam = teams.find((t) => t.id === teamId);
  if (!currentTeam) {
    Alert.alert("Error", "No team selected to add this game to.");
    router.back();
    return;
  }

  const handleDateChange = (
    event: DateTimePickerEvent,
    selectedDate?: Date,
  ) => {
    if (Platform.OS === "android") {
      setShowPicker(false);
    }

    if (selectedDate) {
      setTimeStamp(selectedDate.getTime());
    }
  };

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
          headerLeft: () => <HeaderBackButton onPress={() => router.back()} />,
        }}
      />
      <Text style={GlobalStyles.headingText}>New Game</Text>
      <TextInputFormRow
        title="Opponent"
        item={opponentName}
        setItem={setOpponentName}
      />
      <TextInputFormRow title="Event" item={eventName} setItem={setEventName} />
      <View style={{ flexDirection: "row" }}>
        <Text>Date</Text>
        <Pressable onPress={() => setShowPicker(true)}>
          <Text>{getDateTimeString(timeStamp)}</Text>
        </Pressable>
      </View>
      {showPicker && (
        <DateTimePicker
          value={currentDate}
          mode="datetime"
          display={Platform.OS === "ios" ? "spinner" : "default"}
          onChange={handleDateChange}
        />
      )}
      <BigButton title="Start Game" onPress={() => handleSave()} />
    </View>
  );
}
