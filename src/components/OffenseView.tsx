import { useState } from "react";
import { Text, View } from "react-native";
import { Player } from "../lib/types";
import { GlobalStyles } from "../styles/global";
import ActionButton from "./ActionButton";
import OffensePlayerCard from "./OffensePlayerCard";

export default function OffenseView({
  currentLine,
  currentPoint,
}: {
  currentLine: Player[];
  currentPoint: any;
}) {
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>();

  const handleCatch = (player: Player) => {
    // record catch from selected player to player
    // updatePoint({...currentPoint.actions.push()})
    setSelectedPlayer(player);
  };

  return (
    <View style={GlobalStyles.contentContainer}>
      <View style={{ height: 50 }}>
        <Text>Headings go here</Text>
      </View>
      <View style={{ flexDirection: "row" }}>
        <View style={{ flex: 5, margin: 2 }}>
          {currentLine.map((player) => (
            <OffensePlayerCard // may need to refactor the buttons out in order to hide them before a player picks up the disc
              key={player.id}
              name={player.name}
              hasDisc={selectedPlayer === player}
              showButtons={selectedPlayer !== undefined}
              onPress={() => setSelectedPlayer(player)}
              onCatch={() => handleCatch(player)} // record catch from selected player to this player
              onDrop={() => {}} // record drop by this player, switch to defence
              onGoal={() => {}} // record goal from selected player to this player, go to pick line view
            />
          ))}
          <OffensePlayerCard // how to handle Unkown player
            name="UNKNOWN"
            hasDisc={false}
            textStyle={{ fontStyle: "italic" }}
            showButtons={selectedPlayer !== undefined}
            onPress={() => {}}
            onCatch={() => {}}
            onDrop={() => {}}
            onGoal={() => {}}
          />
        </View>
        <ActionButton
          label={"THROWAWAY".split("").join("\n")}
          onPress={() => {}} // record throwaway and switch to defence
        />
      </View>
    </View>
  );
}
