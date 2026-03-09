import TextInputFormRow from "@/src/components/TextInputFormRow";
import { useData } from "@/src/contexts/DataContext";
import { GlobalStyles } from "@/src/styles/global";
import { getId } from "@/src/utils/uniqueId";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import { Alert, Button, Text, View } from "react-native";

export default function NewPlayer() {
  const { teamId } = useLocalSearchParams<{ teamId: string }>();
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const { teams, addPlayer } = useData();
  const router = useRouter();
  const currentTeam = teams.find((t) => t.id === teamId);

  if (!currentTeam) {
    Alert.alert("Error", "No team selected to add this player to.");
    router.back();
    return;
  }

  const handleSave = () => {
    if (newName.trim() === "") {
      Alert.alert("Error", "Please enter a name.");
      return;
    }

    addPlayer({
      id: getId(),
      name: newName,
      number: parseInt(newNumber),
      teamIDs: [teamId],
      active: true,
      isArchived: false,
    });
    router.back();
  };
  return (
    <View>
      <Stack.Screen options={{ title: `${currentTeam.name}` }} />
      <Text style={GlobalStyles.headingText}>New Player</Text>
      <TextInputFormRow title="Name" item={newName} setItem={setNewName} />
      <TextInputFormRow
        title="Number"
        item={newNumber}
        setItem={setNewNumber}
        placeholderText="0"
        keyboardType="numeric"
      />
      <Button title="Submit" onPress={() => handleSave()} />
    </View>
  );
}
