import { useState } from "react";
import { Alert, Text, View } from "react-native";
import { Action } from "../lib/actions";
import { Player } from "../lib/types";
import { Colors, GlobalStyles } from "../styles/global";
import ActionButton from "./ActionButton";
import OffensePlayerCard from "./OffensePlayerCard";

export default function OffenseView({
  currentLine,
  onAction,
}: {
  currentLine: Player[];
  onAction: (action: Action) => void;
}) {
  const [selectedPlayer, setSelectedPlayer] = useState<Player | undefined>(
    undefined,
  );

  const handleCatch = (player: Player) => {
    if (!selectedPlayer) return;

    onAction({
      name: "catch",
      timeStamp: Date.now(),
      thrower: selectedPlayer,
      receiver: player,
      switchPossession: false,
      endPoint: false,
    });

    setSelectedPlayer(player);
  };

  const handleDrop = (player: Player) => {
    Alert.alert(player.name + " dropped the disc from " + selectedPlayer!.name);
    // if (!selectedPlayer) return;

    // onAction({
    //   name: "drop",
    //   timeStamp: Date.now(),
    //   thrower: selectedPlayer,
    //   receiver: player,
    //   switchPossession: true,
    //   endPoint: false,
    // });

    // swich to Defence view
  };

  return (
    <View style={[GlobalStyles.contentContainer, { flex: 1 }]}>
      <View style={{ height: 50 }}>
        <Text>Headings go here</Text>
      </View>
      <View
        style={{
          flexDirection: "row",
          flex: 1,
          backgroundColor: Colors.surface,
        }}
      >
        <View style={{ flex: 5, margin: 2 }}>
          {currentLine.map((player) => (
            <OffensePlayerCard
              key={player.id}
              name={player.name}
              hasDisc={selectedPlayer === player}
              showButtons={selectedPlayer !== undefined}
              onPress={() => setSelectedPlayer(player)}
              onCatch={() => handleCatch(player)} // record catch from selected player to this player
              onDrop={() => handleDrop(player)} // record drop by this player, switch to defence
              onGoal={() => {}} // record goal from selected player to this player, go to pick line view
            />
          ))}
        </View>
        <ActionButton
          label={"THROWAWAY".split("").join("\n")}
          onPress={() => {}} // record throwaway and switch to defence
        />
      </View>
    </View>
  );
}
