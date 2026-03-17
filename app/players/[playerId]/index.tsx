import EditButton from "@/src/components/EditButton";
import { useData } from "@/src/contexts/DataContext";
import { Colors, GlobalStyles } from "@/src/styles/global";
import { Stack, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { StyleSheet, Switch, Text, View } from "react-native";

export default function PlayerIndex() {
  const { playerId } = useLocalSearchParams<{ playerId: string }>();
  const { players, updatePlayer } = useData();
  const currentPlayer = players.find((p) => p.id === playerId);
  const [isActive, setIsActive] = useState<boolean>(
    currentPlayer?.active ?? true,
  );

  if (!currentPlayer) return <Text> Player not found</Text>;

  const handleTogglePlayer = async () => {
    const nextActive = !isActive;
    setIsActive(nextActive);
    await updatePlayer({ ...currentPlayer, active: nextActive });
  };

  return (
    <View style={GlobalStyles.container}>
      <Stack.Screen
        options={{
          headerRight: () => (
            <EditButton
              route={{
                pathname: "/players/[playerId]/editPlayer",
                params: { playerId: playerId },
              }}
            />
          ),
        }}
      />
      <View style={GlobalStyles.titleContainer}>
        <Text style={GlobalStyles.headingText}>{currentPlayer.name}</Text>
      </View>
      <View style={GlobalStyles.contentContainer}>
        <View style={styles.rowContainer}>
          <Text style={styles.displayText}>Number: </Text>
          <Text style={styles.displayText}>{currentPlayer.number}</Text>
        </View>
        <View style={styles.rowContainer}>
          <Text style={styles.displayText}>Playing: </Text>
          <Switch
            onValueChange={handleTogglePlayer}
            value={isActive}
            trackColor={{ true: Colors.brandAccent }}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  displayText: {
    fontSize: 20,
  },
  rowContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 5,
    marginLeft: 15,
    marginRight: 15,
  },
});
