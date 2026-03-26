import { GoalFor } from "@/src/lib/actions";
import { ActionCardStyle } from "@/src/styles/actionCard";
import { Colors } from "@/src/styles/global";
import { SirenIcon } from "phosphor-react-native";
import { Text, View } from "react-native";
import ScoreBoard from "../ScoreBoard";

export default function GoalForActionCard({ action }: { action: GoalFor }) {
  return (
    <View style={ActionCardStyle}>
      <View
        style={{ gap: 10, flex: 1, flexDirection: "row", alignItems: "center" }}
      >
        <SirenIcon color={Colors.winningHighlight} weight="fill" />
        <Text style={{ fontWeight: "900" }}>
          {action.receiver.name} scores from {action.thrower.name}
        </Text>
      </View>
      <View>
        <ScoreBoard
          ourScore={action.score.ourScore + 1}
          theirScore={action.score.theirScore}
        />
      </View>
    </View>
  );
}
