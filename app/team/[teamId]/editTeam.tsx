import TextInputFormRow from "@/src/components/TextInputFormRow";
import { useTeams } from "@/src/contexts/TeamsContext";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import { Alert, Button, StyleSheet, View } from "react-native";

export default function EditTeam() {
  const { teamId } = useLocalSearchParams();
  const { teams, updateTeam } = useTeams();
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
    <View style={styles.container}>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});
