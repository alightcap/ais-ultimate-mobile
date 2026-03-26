import { Goal } from "@/src/lib/actions";
import { ActionCardStyle } from "@/src/styles/actionCard";
import { SirenIcon } from "phosphor-react-native";
import { Text, View } from "react-native";
import ScoreBoard from "../ScoreBoard";

export default function GoalActionCard({ goalAction }: { goalAction: Goal }) {
  return (
    <View style={ActionCardStyle}>
      <SirenIcon color={"green"} weight="fill" />
      <Text>
        {goalAction.receiver.name} scores from {goalAction.thrower.name}
      </Text>
      <ScoreBoard
        ourScore={goalAction.score.ourScore + 1}
        theirScore={goalAction.score.theirScore}
      />
    </View>
  );
}
