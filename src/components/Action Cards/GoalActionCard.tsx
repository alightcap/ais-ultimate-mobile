import { Goal } from "@/src/lib/actions";
import { ActionCardStyle } from "@/src/styles/actionCard";
import { SirenIcon } from "phosphor-react-native";
import { Text, View } from "react-native";
import ScoreBoard from "../ScoreBoard";

export default function GoalActionCard({
  goalAction,
  ourScore,
  theirScore,
}: {
  goalAction: Goal;
  ourScore: number;
  theirScore: number;
}) {
  return (
    <View style={ActionCardStyle}>
      <SirenIcon color={"green"} weight="fill" />
      <Text>
        {goalAction.receiver.name} scores from {goalAction.thrower.name}
      </Text>
      <ScoreBoard ourScore={ourScore} theirScore={theirScore} />
    </View>
  );
}
