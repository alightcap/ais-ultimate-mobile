import { Action } from "@/src/lib/actions";
import { Colors } from "@/src/styles/global";
import { StyleSheet, Text, View } from "react-native";
import CatchActionCard from "./CatchActionCard";
import DeActionCard from "./DeActionCard";
import DropActionCard from "./DropActionCard";
import GoalActionCard from "./GoalActionCard";
import ThrowawayActionCard from "./ThrowawayActionCard";

export default function ActionCard({ action }: { action: Action }) {
  const isGoalFor = () => {
    return action.name === "goal";
  };

  return (
    <View
      style={[
        styles.actionCardContainer,
        isGoalFor() && styles.goalForContainer,
      ]}
    >
      {(() => {
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
      })()}
    </View>
  );
}

const styles = StyleSheet.create({
  actionCardContainer: {
    margin: 2,
    backgroundColor: Colors.surface,
    paddingHorizontal: 10,
    paddingVertical: 8,
    justifyContent: "center",
    borderBottomColor: Colors.border,
    borderBottomWidth: 1,
  },
  goalForContainer: {
    backgroundColor: Colors.winningSurface,
  },
});
