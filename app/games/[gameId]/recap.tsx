import ActionCard from "@/src/components/Action Cards/ActionCard";
import { useGameSession } from "@/src/Hooks/useGameSession";
import { useLocalSearchParams } from "expo-router";
import { FlatList, Text, View } from "react-native";

export default function RecapView() {
  const { gameId } = useLocalSearchParams<{ gameId: string }>();
  const { allActions } = useGameSession(gameId);

  return (
    <View style={{ flex: 1 }}>
      <Text style={{ textAlign: "center", fontSize: 20, padding: 2 }}>
        Recap
      </Text>
      <FlatList
        // TODO: make actions editable?
        data={allActions}
        renderItem={({ item }) => <ActionCard action={item} />}
        ListEmptyComponent={<Text>There are no actions to display</Text>}
      />
    </View>
  );
}
