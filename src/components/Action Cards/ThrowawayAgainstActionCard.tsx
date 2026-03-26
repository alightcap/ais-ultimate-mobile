import { ThrowawayAgainst } from "@/src/lib/actions";
import { ActionCardStyle } from "@/src/styles/actionCard";
import { Colors } from "@/src/styles/global";
import { ArrowBendRightDownIcon } from "phosphor-react-native";
import { Text, View } from "react-native";

export default function ThrowawayAgainstActionCard({
  action,
}: {
  action: ThrowawayAgainst;
}) {
  return (
    <View style={ActionCardStyle}>
      <ArrowBendRightDownIcon color={Colors.brandPrimary} />
      <Text>Throwaway by {action.opponentName}</Text>
    </View>
  );
}
