import { GoalAgainst, GoalFor } from "@/src/lib/actions";
import { ActionCardStyle, GoalActionCardStyle } from "@/src/styles/actionCard";
import { Colors } from "@/src/styles/global";
import { SirenIcon } from "phosphor-react-native";
import { View } from "react-native";
import ScoreBoard from "../ScoreBoard";
import ActionText from "./ActionText";

export default function GoalActionCard({
  action,
}: {
  action: GoalAgainst | GoalFor;
}) {
  const color =
    action.name === "goal for"
      ? Colors.winningHighlight
      : Colors.losingHighlight;

  const newOurScore =
    action.name === "goal for"
      ? action.score.ourScore + 1
      : action.score.ourScore;

  const newTheirScore =
    action.name === "goal against"
      ? action.score.theirScore + 1
      : action.score.theirScore;

  const goalText =
    action.name === "goal for"
      ? `${action.receiver.name} scores from ${action.thrower.name}`
      : `Goal by ${action.opponentName}`;

  return (
    <View style={ActionCardStyle}>
      <View style={GoalActionCardStyle}>
        <SirenIcon color={color} weight="fill" />
        <ActionText textStyle={{ fontWeight: "900" }} text={goalText} />
      </View>
      <View>
        <ScoreBoard ourScore={newOurScore} theirScore={newTheirScore} />
      </View>
    </View>
  );
}
