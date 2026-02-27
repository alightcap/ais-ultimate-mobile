import TextInputFormRow from "@/src/components/TextInputFormRow";
import { useTeams } from "@/src/contexts/TeamListContext";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Alert, Button, View } from "react-native";

export default function NewTeam() {
  const router = useRouter();
  const [newTeamName, setNewTeamName] = useState("");
  const { setTeamList } = useTeams();

  const handleSave = () => {
    if (newTeamName.trim() === "") {
      Alert.alert("Error", "Please enter a team name.");
      return;
    }

    setTeamList((prev) => [...prev, { id: Date.now(), teamName: newTeamName }]);
    router.back();
  };

  return (
    <View>
      <TextInputFormRow
        title="Team Name"
        item={newTeamName}
        setItem={setNewTeamName}
      />
      <Button title="Submit" onPress={handleSave} />
    </View>
  );
}
