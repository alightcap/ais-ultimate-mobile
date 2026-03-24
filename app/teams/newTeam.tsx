import TextInputFormRow from "@/src/components/TextInputFormRow";
import { useData } from "@/src/contexts/DataContext";
import { createNewTeam, createUnknownPlayer } from "@/src/lib/models";
import { GlobalStyles } from "@/src/styles/global";
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

    const newTeam = createNewTeam({ name: newName });
    const unknown = createUnknownPlayer(newTeam.id);

    addTeam(newTeam);
    addPlayer(unknown);

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
