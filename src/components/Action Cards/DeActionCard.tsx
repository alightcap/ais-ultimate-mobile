import { De } from "@/src/lib/actions";
import { ActionCardStyle } from "@/src/styles/actionCard";
import { Colors } from "@/src/styles/global";
import { ShieldCheckeredIcon } from "phosphor-react-native";
import { View } from "react-native";
import ActionText from "./ActionText";

export default function DeActionCard({ action }: { action: De }) {
  return (
    <View style={ActionCardStyle}>
      <ShieldCheckeredIcon color={Colors.brandPrimary} weight="fill" />
      <ActionText text={`D by ${action.defender.name}`} />
    </View>
  );
}
