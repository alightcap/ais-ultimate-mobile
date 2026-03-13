import HeaderBack from "@/src/components/HeaderBack";
import MedButton from "@/src/components/MedButton";
import TextInputFormRow from "@/src/components/TextInputFormRow";
import { useData } from "@/src/contexts/DataContext";
import { GlobalStyles } from "@/src/styles/global";
import { getId } from "@/src/utils/uniqueId";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import { Alert, Text, View } from "react-native";

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
    addPlayer({
      id: getId(),
      name: newName,
      number: parseInt(newNumber),
      teamIDs: [teamId],
      active: true,
      isArchived: false,
    });
  };

  const validateName = () => {
    if (newName.trim() === "") {
      Alert.alert("Error", "Please enter a name.");
      return false;
    }
    return true;
  };

  const handleSaveAndLeave = () => {
    if (validateName()) {
      handleSave();
      router.back();
    }
  };

  const handleSaveAndStay = () => {
    if (validateName()) {
      handleSave();
      setNewName("");
      setNewNumber("");
    }
  };

  return (
    <View style={GlobalStyles.container}>
      <Stack.Screen
        options={{
          headerLeft: (props) => <HeaderBack {...props} />,
          // <HeaderBackButton
          //   {...props}
          //   displayMode="minimal"
          //   onPress={() => router.back()}
          //   style={{ marginRight: -45 }}
          // />,
        }}
      />
      <Text style={GlobalStyles.headingText}>{`${currentTeam.name}`}</Text>
      <TextInputFormRow title="Name" item={newName} setItem={setNewName} />
      <TextInputFormRow
        title="Number"
        item={newNumber}
        setItem={setNewNumber}
        placeholderText="0"
        keyboardType="numeric"
      />
      <MedButton title="Submit" onPress={() => handleSaveAndLeave()} />
      <MedButton
        title="Submit and Add Another"
        onPress={() => handleSaveAndStay()}
      />
    </View>
  );
}
