import { Catch } from "@/src/lib/actions";
import { ActionCardStyle } from "@/src/styles/actionCard";
import { Colors } from "@/src/styles/global";
import { HandsClappingIcon } from "phosphor-react-native";
import { Text, View } from "react-native";

export default function CatchActionCard({ action }: { action: Catch }) {
  return (
    <View style={ActionCardStyle}>
      <HandsClappingIcon
        color={Colors.brandPrimary}
        weight="fill"
        style={{ transform: [{ rotate: "90deg" }] }}
      />
      <Text>
        {action.receiver.name} caught from {action.thrower.name}
      </Text>
    </View>
  );
}
