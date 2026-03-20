import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Player } from "../lib/types";
import { Colors, GlobalStyles } from "../styles/global";
import ActionButton from "./ActionButton";
import OffensePlayerCard from "./OffensePlayerCard";

export default function OffenseView({
  currentLine,
}: {
  currentLine: Player[];
}) {
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>();

  return (
    <View style={GlobalStyles.contentContainer}>
      <View style={{ height: 50 }}>
        <Text>headings go here</Text>
      </View>
      <View style={{ flexDirection: "row" }}>
        <View style={{ flex: 5, margin: 2 }}>
          {currentLine.map((player) => (
            <OffensePlayerCard
              key={player.id}
              name={player.name}
              hasDisc={selectedPlayer === player}
              onPress={() => setSelectedPlayer(player)}
            />
          ))}
          <OffensePlayerCard
            name="UNKNOWN"
            hasDisc={false}
            textStyle={{ fontStyle: "italic" }}
          />
          {/** how to handle Unknown player */}
        </View>
        <ActionButton label={"THROWAWAY".split("").join("\n")} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonText: {
    color: "white",
    textAlign: "center",
  },
  fakeButton: {
    backgroundColor: Colors.brandPrimary,
    padding: 8,
    paddingVertical: 12,
    borderRadius: 5,
    fontWeight: 600,
    marginHorizontal: 2,
    width: 60,
  },
  playerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    marginVertical: 2,
  },
  playerText: {
    textAlign: "right",
    color: Colors.brandPrimary,
    fontWeight: "900",
    fontSize: 16,
  },
});
