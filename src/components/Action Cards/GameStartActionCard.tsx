import { GameStart } from "@/src/lib/actions";
import { ActionCardStyle } from "@/src/styles/actionCard";
import { Colors } from "@/src/styles/global";
import { FlagBannerIcon } from "phosphor-react-native";
import { View } from "react-native";
import ActionText from "./ActionText";

export default function GameStartActionCard({ action }: { action: GameStart }) {
  return (
    <View style={ActionCardStyle}>
      <FlagBannerIcon color={Colors.brandPrimary} weight="fill" />
      <ActionText text="Game Start" />
    </View>
  );
}
