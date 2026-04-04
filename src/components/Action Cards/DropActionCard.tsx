import { Drop } from "@/src/lib/actions";
import { ActionCardStyle } from "@/src/styles/actionCard";
import { Colors } from "@/src/styles/global";
import { HandPointingIcon } from "phosphor-react-native";
import { View } from "react-native";
import ActionText from "./ActionText";

export default function DropActionCard({ action }: { action: Drop }) {
  return (
    <View style={ActionCardStyle}>
      <HandPointingIcon
        color={Colors.brandPrimary}
        style={{ transform: [{ rotate: "180deg" }] }}
      />
      <ActionText
        text={`${action.receiver.name} dropped from ${action.thrower.name}`}
      />
    </View>
  );
}
