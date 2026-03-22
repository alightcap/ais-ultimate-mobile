import TextInputFormRow from "@/src/components/TextInputFormRow";
import { useData } from "@/src/contexts/DataContext";
import { Player } from "@/src/lib/types";
import { GlobalStyles } from "@/src/styles/global";
import { getId } from "@/src/utils/uniqueId";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Alert, Button, Text, View } from "react-native";

export default function NewTeam() {
  const router = useRouter();
  const [newName, setNewName] = useState("");
  const { addTeam, addPlayer } = useData();

  const handleSave = () => {
    if (newName.trim() === "") {
      Alert.alert("Error", "Please enter a name.");
      return;
    }
    const teamId = getId();
    const unknown: Player = {
      id: `${teamId}-unknown}`,
      name: "UNKNOWN",
      active: true,
      isArchived: false,
      teamIDs: [teamId],
    };

    addPlayer(unknown);

    addTeam({
      id: teamId,
      name: newName,
      shortName: "",
      playerIDs: [unknown.id],
      gameIDs: [],
      isArchived: false,
    });
    router.back();
  };

  return (
    <View style={GlobalStyles.container}>
      <View style={GlobalStyles.titleContainer}>
        <Text style={GlobalStyles.headingText}>New Team</Text>
      </View>

      <View style={GlobalStyles.contentContainer}>
        <TextInputFormRow
          title="Team Name"
          item={newName}
          setItem={setNewName}
        />
      </View>

      <Button title="Submit" onPress={handleSave} />
    </View>
  );
}
