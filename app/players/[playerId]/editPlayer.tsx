import Button from "@/src/components/Button";
import TextInputFormRow from "@/src/components/TextInputFormRow";
import { useData } from "@/src/contexts/DataContext";
import { GlobalStyles } from "@/src/styles/global";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import { Alert, Text, View } from "react-native";

export default function EditPlayer() {
  const { playerId } = useLocalSearchParams<{ playerId: string }>();
  const { players, updatePlayer } = useData();
  const router = useRouter();

  const currentPlayer = players.find((p) => p.id === playerId);

  const [name, setName] = useState(currentPlayer?.name ?? "");
  const [number, setNumber] = useState(currentPlayer?.number?.toString() ?? "");

  if (!currentPlayer) return;

  const handleSave = async () => {
    if (name.trim() === "") {
      Alert.alert("Error", "Name cannot be empty");
      return;
    }

    const playerNumber = parseInt(number) || 0;

    await updatePlayer({
      ...currentPlayer,
      name: name,
      number: playerNumber,
    });

    router.back();
  };

  return (
    <View style={GlobalStyles.container}>
      <View style={GlobalStyles.titleContainer}>
        <Text style={GlobalStyles.headingText}>Edit Player</Text>
      </View>
      <View style={GlobalStyles.contentContainer}>
        <TextInputFormRow title="Name" item={name} setItem={setName} />
        <TextInputFormRow title="Number" item={number} setItem={setNumber} />
      </View>
      <Button
        title="Save Changes"
        onPress={handleSave}
        viewStyle={GlobalStyles.bigButtonScreenBottom}
      />
    </View>
  );
}
