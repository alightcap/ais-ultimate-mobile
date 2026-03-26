import { ThrowawayFor } from "@/src/lib/actions";
import { ActionCardStyle } from "@/src/styles/actionCard";
import { Colors } from "@/src/styles/global";
import { ArrowBendRightDownIcon } from "phosphor-react-native";
import { Text, View } from "react-native";

export default function ThrowawayForActionCard({
  action,
}: {
  action: ThrowawayFor;
}) {
  return (
    <View style={ActionCardStyle}>
      <ArrowBendRightDownIcon color={Colors.brandPrimary} />
      <Text>{action.thrower.name} throwaway</Text>
    </View>
  );
}
