import { Action } from "@/src/lib/actions";
import { Colors } from "@/src/styles/global";
import { Text, View } from "react-native";
import CatchActionCard from "./CatchActionCard";
import DeActionCard from "./DeActionCard";
import DropActionCard from "./DropActionCard";
import GoalActionCard from "./GoalActionCard";
import ThrowawayActionCard from "./ThrowawayActionCard";

export default function ActionCard({ action }: { action: Action }) {
  switch (action.name) {
    case "catch":
      return <CatchActionCard catchAction={action} />;
    case "drop":
      return <DropActionCard dropAction={action} />;
    case "d":
      return <DeActionCard dAction={action} />;
    case "throwaway":
      return <ThrowawayActionCard throwawayAction={action} />;
    case "goal":
      return <GoalActionCard goalAction={action} />;
    default:
      return (
        <View>
          <Text style={{ color: Colors.textMuted }}>
            {action.name.toUpperCase()} recorded
          </Text>
        </View>
      );
  }
}
