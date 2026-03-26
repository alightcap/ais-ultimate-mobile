import { GoalAgainst } from "@/src/lib/actions";
import { ActionCardStyle, GoalActionCardStyle } from "@/src/styles/actionCard";
import { Colors } from "@/src/styles/global";
import { SirenIcon } from "phosphor-react-native";
import { Text, View } from "react-native";
import ScoreBoard from "../ScoreBoard";

export default function GoalAgainstActionCard({
  action,
}: {
  action: GoalAgainst;
}) {
  return (
    <View style={ActionCardStyle}>
      <View style={GoalActionCardStyle}>
        <SirenIcon color={Colors.losingHighlight} weight="fill" />
        <Text style={{ fontWeight: "900" }}>Goal by {action.opponentName}</Text>
      </View>
      <View>
        <ScoreBoard
          ourScore={action.score.ourScore}
          theirScore={action.score.theirScore + 1}
        />
      </View>
    </View>
  );
}
