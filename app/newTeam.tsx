import TextInputFormRow from "@/src/components/TextInputFormRow";
import { useTeams } from "@/src/contexts/TeamsContext";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Alert, Button, View } from "react-native";

export default function NewTeam() {
  const router = useRouter();
  const [newName, setNewName] = useState("");
  const { setTeams } = useTeams();

  const handleSave = () => {
    if (newName.trim() === "") {
      Alert.alert("Error", "Please enter a team name.");
      return;
    }

    setTeams((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        name: newName,
        players: [],
        games: [],
      },
    ]);
    router.back();
  };

  return (
    <View>
      <TextInputFormRow title="Team Name" item={newName} setItem={setNewName} />
      <Button title="Submit" onPress={handleSave} />
    </View>
  );
}
