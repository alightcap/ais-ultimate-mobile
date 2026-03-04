import { useCurrentPlayer } from "@/src/contexts/CurrentPlayerContext";
import { Text, View } from "react-native";

export default function Index() {
  const { player } = useCurrentPlayer();

  return (
    <View>
      <Text>{player.number}</Text>
      {/* TODO style above text */}
      {/* TODO add toggle for status */}
      {/* TODO add delete button */}
    </View>
  );
}
