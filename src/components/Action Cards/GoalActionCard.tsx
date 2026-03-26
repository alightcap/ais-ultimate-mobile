import { Goal } from "@/src/lib/actions";
import { ActionCardStyle } from "@/src/styles/actionCard";
import { SirenIcon } from "phosphor-react-native";
import { Text, View } from "react-native";
import ScoreBoard from "../ScoreBoard";

export default function GoalActionCard({ goalAction }: { goalAction: Goal }) {
  return (
    <View style={[ActionCardStyle, { backgroundColor: "#C8E6C9" }]}>
      <View
        style={{ gap: 10, flex: 1, flexDirection: "row", alignItems: "center" }}
      >
        <SirenIcon color={"green"} weight="fill" />
        <Text style={{ fontWeight: "900" }}>
          {goalAction.receiver.name} scores from {goalAction.thrower.name}
        </Text>
      </View>
      <View>
        <ScoreBoard
          ourScore={goalAction.score.ourScore + 1}
          theirScore={goalAction.score.theirScore}
        />
      </View>
    </View>
  );
}
