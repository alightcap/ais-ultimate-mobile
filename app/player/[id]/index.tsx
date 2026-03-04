import { useCurrentPlayer } from "@/src/contexts/CurrentPlayerContext";
import { Text, View } from "react-native";

export default function Index() {
  const { player } = useCurrentPlayer();

  return (
    <View>
      <Text>{player.name}</Text>
      <Text>{player.number}</Text>
    </View>
  );
}
