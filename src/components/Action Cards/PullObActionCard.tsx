import { PullOb } from "@/src/lib/actions";
import { ActionCardStyle } from "@/src/styles/actionCard";
import { Colors } from "@/src/styles/global";
import { ArrowArcRightIcon } from "phosphor-react-native";
import { Text, View } from "react-native";

export default function PullObActionCard({ action }: { action: PullOb }) {
  return (
    <View style={ActionCardStyle}>
      <ArrowArcRightIcon color={Colors.brandPrimary} />
      <Text>OB Pull from {action.thrower.name} </Text>
    </View>
  );
}
