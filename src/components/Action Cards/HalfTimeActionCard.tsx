import { Halftime } from "@/src/lib/actions";
import { ActionCardStyle } from "@/src/styles/actionCard";
import { Colors } from "@/src/styles/global";
import { FlagBannerFoldIcon } from "phosphor-react-native";
import { View } from "react-native";
import ActionText from "./ActionText";

export default function HalfTimeActionCard({ action }: { action: Halftime }) {
  return (
    <View style={ActionCardStyle}>
      <FlagBannerFoldIcon color={Colors.brandPrimary} weight="fill" />
      <ActionText text="Half Time" />
    </View>
  );
}
