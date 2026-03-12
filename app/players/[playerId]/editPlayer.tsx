import MedButton from "@/src/components/MedButton";
import TextInputFormRow from "@/src/components/TextInputFormRow";
import { useData } from "@/src/contexts/DataContext";
import { GlobalStyles } from "@/src/styles/global";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import { Alert, View } from "react-native";

export default function EditPlayer() {
  const { playerId } = useLocalSearchParams<{ playerId: string }>();
  const { players, updatePlayer } = useData();
  const router = useRouter();

  const currentPlayer = players.find((p) => p.id === playerId);

  const [name, setName] = useState(currentPlayer?.name || "");
  const [number, setNumber] = useState(currentPlayer?.number.toString() || "");

  const handleSave = async () => {
    if (!currentPlayer) return;
    if (name.trim() === "") {
      Alert.alert("Error", "Name cannot be empty");
      return;
    }

    await updatePlayer({
      ...currentPlayer,
      name: name,
      number: parseInt(number),
    });

    router.back();
  };

  return (
    <View style={GlobalStyles.container}>
      <TextInputFormRow title="Name" item={name} setItem={setName} />
      <TextInputFormRow title="Number" item={number} setItem={setNumber} />
      <MedButton title="Save Changes" onPress={handleSave} />
    </View>
  );
}
