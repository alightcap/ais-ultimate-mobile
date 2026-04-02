import { GameStart } from "@/src/lib/actions";
import { ActionCardStyle } from "@/src/styles/actionCard";
import { Colors } from "@/src/styles/global";
import { FlagBannerIcon } from "phosphor-react-native";
import { Text, View } from "react-native";

export default function GameStartActionCard({ action }: { action: GameStart }) {
  return (
    <View style={ActionCardStyle}>
      <FlagBannerIcon color={Colors.brandPrimary} weight="fill" />
      <Text>Game Start</Text>
    </View>
  );
}
