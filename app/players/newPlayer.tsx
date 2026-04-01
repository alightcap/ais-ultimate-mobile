import Button from "@/src/components/Button";
import HeaderBack from "@/src/components/HeaderBack";
import TextInputFormRow from "@/src/components/Inputs/TextInputFormRow";
import { useData } from "@/src/contexts/DataContext";
import { createNewPlayer } from "@/src/lib/models";
import { GlobalStyles } from "@/src/styles/global";
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
    addPlayer(
      createNewPlayer({
        name: newName,
        teamId: teamId,
        number: parseInt(newNumber) ? parseInt(newNumber) : 0,
      }),
    );
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
        }}
      />
      <View style={GlobalStyles.titleContainer}>
        <Text style={GlobalStyles.headingText}>{currentTeam.name}</Text>
      </View>
      <View style={GlobalStyles.contentContainer}>
        <TextInputFormRow title="Name" item={newName} setItem={setNewName} />
        <TextInputFormRow
          title="Number"
          item={newNumber}
          setItem={setNewNumber}
          placeholderText="0"
          keyboardType="numeric"
        />
      </View>
      <View
        style={{
          marginBottom: 20,
          width: "80%",
          gap: 10,
          alignSelf: "center",
        }}
      >
        <Button title="Submit" onPress={handleSaveAndLeave} size="medium" />
        <Button
          title="Submit and Add Another"
          onPress={handleSaveAndStay}
          size="medium"
        />
      </View>
    </View>
  );
}
