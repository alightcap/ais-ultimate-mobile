import { Throwaway } from "@/src/lib/actions";
import { ActionCardStyle } from "@/src/styles/actionCard";
import { Colors } from "@/src/styles/global";
import { ArrowBendRightDownIcon } from "phosphor-react-native";
import { Text, View } from "react-native";

export default function ThrowawayActionCard({
  throwawayAction,
}: {
  throwawayAction: Throwaway;
}) {
  return (
    <View style={ActionCardStyle}>
      <ArrowBendRightDownIcon color={Colors.brandPrimary} />
      <Text>{throwawayAction.thrower.name} throwaway</Text>
    </View>
  );
}
