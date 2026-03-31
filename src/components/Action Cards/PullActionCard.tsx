import { Pull } from "@/src/lib/actions";
import { ActionCardStyle } from "@/src/styles/actionCard";
import { Colors } from "@/src/styles/global";
import { ArrowArcRightIcon } from "phosphor-react-native";
import { Text, View } from "react-native";

export default function PullActionCard({ action }: { action: Pull }) {
  const hasHangTime = action.hangTime > 0;
  const hangTimeString = hasHangTime ? (action.hangTime / 1000).toFixed(1) : "";

  return (
    <View style={ActionCardStyle}>
      <ArrowArcRightIcon color={Colors.brandPrimary} />
      <Text>
        Pull from {action.thrower.name}{" "}
        {hasHangTime && "(" + hangTimeString + "s)"}
      </Text>
    </View>
  );
}
