import { De } from "@/src/lib/actions";
import { ActionCardStyle } from "@/src/styles/actionCard";
import { Colors } from "@/src/styles/global";
import { ShieldCheckeredIcon } from "phosphor-react-native";
import { Text, View } from "react-native";

export default function DeActionCard({ dAction }: { dAction: De }) {
  return (
    <View style={ActionCardStyle}>
      <ShieldCheckeredIcon color={Colors.brandPrimary} weight="fill" />
      <Text>D by {dAction.defender.name}</Text>
    </View>
  );
}
