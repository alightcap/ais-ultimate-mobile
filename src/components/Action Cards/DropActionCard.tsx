import { Drop } from "@/src/lib/actions";
import { ActionCardStyle } from "@/src/styles/actionCard";
import { Colors } from "@/src/styles/global";
import {
  ArrowBendRightDownIcon,
  HandPointingIcon,
} from "phosphor-react-native";
import { Text, View } from "react-native";

export default function DropActionCard({ dropAction }: { dropAction: Drop }) {
  return (
    <View style={ActionCardStyle}>
      <HandPointingIcon
        color={Colors.brandPrimary}
        style={{ transform: [{ rotate: "180deg" }] }}
      />
      <Text>{dropAction.thrower.name}</Text>
      <ArrowBendRightDownIcon color={Colors.brandPrimary} />
      <Text>{dropAction.receiver.name}</Text>
    </View>
  );
}
