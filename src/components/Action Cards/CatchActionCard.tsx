import { Catch } from "@/src/lib/actions";
import { ActionCardStyle } from "@/src/styles/actionCard";
import { Colors } from "@/src/styles/global";
import { HandsClappingIcon } from "phosphor-react-native";
import { Text, View } from "react-native";

export default function CatchActionCard({
  catchAction,
}: {
  catchAction: Catch;
}) {
  return (
    <View style={ActionCardStyle}>
      <HandsClappingIcon color={Colors.brandPrimary} weight="fill" />

      <Text>
        {catchAction.receiver.name} caught from {catchAction.thrower.name}
      </Text>
    </View>
  );
}
