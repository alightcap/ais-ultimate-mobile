import TextInputFormRow from "@/src/components/TextInputFormRow";
import { useData } from "@/src/contexts/DataContext";
import { GlobalStyles } from "@/src/styles/global";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import { Alert, Button, View } from "react-native";

export default function EditTeam() {
  const { teamId } = useLocalSearchParams();
  const { teams, updateTeam } = useData();
  const router = useRouter();

  const currentTeam = teams.find((t) => t.id === teamId);

  const [name, setName] = useState(currentTeam?.name || "");

  const handleSave = async () => {
    if (!currentTeam) return;
    if (name.trim() === "") {
      Alert.alert("Error", "Name cannot be empty");
      return;
    }

    await updateTeam({
      ...currentTeam,
      name: name,
    });

    router.back();
  };

  return (
    <View style={GlobalStyles.container}>
      <Stack.Screen options={{ title: `Edit ${currentTeam?.name}` }} />

      <TextInputFormRow
        title="Team Name"
        item={name}
        setItem={setName}
        autoFocus={true}
      />
      <Button title="Save Changes" onPress={handleSave} />
    </View>
  );
}
