import { ThrowawayAgainst, ThrowawayFor } from "@/src/lib/actions";
import { ActionCardStyle } from "@/src/styles/actionCard";
import { Colors } from "@/src/styles/global";
import { ArrowBendRightDownIcon } from "phosphor-react-native";
import { View } from "react-native";
import ActionText from "./ActionText";

export default function ThrowawayActionCard({
  action,
}: {
  action: ThrowawayFor | ThrowawayAgainst;
}) {
  const throwawayText =
    action.name === "throwaway for"
      ? `${action.thrower.name} throwaway`
      : `Throwaway by ${action.opponentName}`;
  return (
    <View style={ActionCardStyle}>
      <ArrowBendRightDownIcon color={Colors.brandPrimary} />
      <ActionText text={throwawayText} />
    </View>
  );
}
