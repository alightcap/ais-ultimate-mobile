import { Action } from "@/src/lib/actions";
import { Colors } from "@/src/styles/global";
import { Text, View } from "react-native";
import CatchActionCard from "./CatchActionCard";
import DropActionCard from "./DropActionCard";

export default function ActionCard({ action }: { action: Action }) {
  switch (action.name) {
    case "catch":
      return <CatchActionCard catchAction={action} />;
    case "drop":
      return <DropActionCard dropAction={action} />;
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
