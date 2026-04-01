import Button from "@/src/components/Button";
import TextInputFormRow from "@/src/components/Inputs/TextInputFormRow";
import { useData } from "@/src/contexts/DataContext";
import { GlobalStyles } from "@/src/styles/global";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import { Alert, Text, View } from "react-native";

export default function EditTeam() {
  const { teamId } = useLocalSearchParams<{ teamId: string }>();
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
      <View style={GlobalStyles.titleContainer}>
        <Text style={GlobalStyles.headingText}>Edit Team</Text>
      </View>
      <View style={GlobalStyles.contentContainer}>
        <TextInputFormRow
          title="Team Name"
          item={name}
          setItem={setName}
          autoFocus={true}
        />
      </View>
      <Button
        title="Save Changes"
        onPress={handleSave}
        viewStyle={GlobalStyles.bigButtonScreenBottom}
      />
    </View>
  );
}
