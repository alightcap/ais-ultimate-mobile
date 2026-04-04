import { Action } from "@/src/lib/actions";
import { Colors } from "@/src/styles/global";
import { StyleSheet, Text, View } from "react-native";
import CatchActionCard from "./CatchActionCard";
import DeActionCard from "./DeActionCard";
import DropActionCard from "./DropActionCard";
import GameStartActionCard from "./GameStartActionCard";
import GoalAgainstActionCard from "./GoalAgainstActionCard";
import GoalForActionCard from "./GoalForActionCard";
import PullActionCard from "./PullActionCard";
import PullObActionCard from "./PullObActionCard";
import ThrowawayAgainstActionCard from "./ThrowawayAgainstActionCard";
import ThrowawayActionCard from "./ThrowawayForActionCard";

export default function ActionCard({ action }: { action: Action }) {
  return (
    <View
      style={[
        styles.actionCardContainer,
        action.category === "defense" && styles.dLineActionSurface,
        action.name === "goal for" && styles.goalForSurface,
        action.name === "goal against" && styles.goalAgainstSurface,
      ]}
    >
      {(() => {
        switch (action.name) {
          case "catch":
            return <CatchActionCard action={action} />;
          case "d":
            return <DeActionCard action={action} />;
          case "drop":
            return <DropActionCard action={action} />;
          case "game start":
            return <GameStartActionCard action={action} />;
          case "goal against":
            return <GoalAgainstActionCard action={action} />;
          case "goal for":
            return <GoalForActionCard action={action} />;
          case "pull":
            return <PullActionCard action={action} />;
          case "pull ob":
            return <PullObActionCard action={action} />;
          case "throwaway against":
            return <ThrowawayAgainstActionCard action={action} />;
          case "throwaway for":
            return <ThrowawayActionCard action={action} />;
          default:
            return (
              <View>
                <Text
                  numberOfLines={1}
                  ellipsizeMode="tail"
                  style={{ color: Colors.textMuted }}
                >
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
    backgroundColor: Colors.surface,
    justifyContent: "center",
    borderBottomColor: Colors.border,
    borderBottomWidth: 1,
    flex: 1,
    height: 50, // would like this to be flex, but...
    padding: 6,
  },
  goalForSurface: {
    backgroundColor: Colors.winningSurface,
  },
  goalAgainstSurface: {
    backgroundColor: Colors.losingSurface,
  },
  dLineActionSurface: {
    backgroundColor: Colors.awaySurface,
  },
});
