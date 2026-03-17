import TextInputFormRow from "@/src/components/TextInputFormRow";
import { useData } from "@/src/contexts/DataContext";
import { GlobalStyles } from "@/src/styles/global";
import { getId } from "@/src/utils/uniqueId";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Alert, Button, Text, View } from "react-native";

export default function NewTeam() {
  const router = useRouter();
  const [newName, setNewName] = useState("");
  const { addTeam } = useData();

  const handleSave = () => {
    if (newName.trim() === "") {
      Alert.alert("Error", "Please enter a name.");
      return;
    }

    addTeam({
      id: getId(),
      name: newName,
      shortName: "",
      playerIDs: [],
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
