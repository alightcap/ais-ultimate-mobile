import { Pull, PullOb } from "@/src/lib/actions";
import { ActionCardStyle } from "@/src/styles/actionCard";
import { Colors } from "@/src/styles/global";
import { ArrowArcRightIcon } from "phosphor-react-native";
import { View } from "react-native";
import ActionText from "./ActionText";

export default function PullActionCard({ action }: { action: Pull | PullOb }) {
  const hasHangTime = action.name === "pull" ? action.hangTime > 0 : false;
  const hangTimeString =
    action.name === "pull" && hasHangTime
      ? (action.hangTime / 1000).toFixed(1)
      : "";
  const hangTimeSuffix = hasHangTime ? `(${hangTimeString}s)` : "";

  const pullPrefix = action.name === "pull" ? "Pull" : "OB Pull";
  return (
    <View style={ActionCardStyle}>
      <ArrowArcRightIcon color={Colors.brandPrimary} />
      <ActionText
        text={`${pullPrefix} from ${action.thrower.name} ${hangTimeSuffix}`}
      />
    </View>
  );
}
