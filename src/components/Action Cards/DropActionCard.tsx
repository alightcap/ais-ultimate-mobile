import { Drop } from "@/src/lib/actions";
import { ActionCardStyle } from "@/src/styles/actionCard";
import { Colors } from "@/src/styles/global";
import { HandPointingIcon } from "phosphor-react-native";
import { Text, View } from "react-native";

export default function DropActionCard({ action }: { action: Drop }) {
  return (
    <View style={ActionCardStyle}>
      <HandPointingIcon
        color={Colors.brandPrimary}
        style={{ transform: [{ rotate: "180deg" }] }}
      />
      <Text>
        {action.receiver.name} drops from {action.thrower.name}
      </Text>
    </View>
  );
}
