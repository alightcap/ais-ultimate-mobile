import TextInputFormRow from "@/src/components/TextInputFormRow";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Alert, Button, Text, View } from "react-native";
import { useTeams } from "./_layout";

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
      <Text
        style={{
          textAlign: "center",
          fontSize: 20,
          margin: 20,
        }}
      >
        New Team
      </Text>
      <TextInputFormRow
        title="Team Name"
        item={newTeamName}
        setItem={setNewTeamName}
      />
      <Button title="Submit" onPress={handleSave} />
    </View>
  );
}
