import { Catch } from "@/src/lib/actions";
import { Colors } from "@/src/styles/global";
import { ArrowBendUpRightIcon, HandsClappingIcon } from "phosphor-react-native";
import { Text, View } from "react-native";

export default function CatchActionCard({
  catchAction,
}: {
  catchAction: Catch;
}) {
  return (
    <View
      style={{
        flexDirection: "row",
        paddingHorizontal: 2,
        paddingVertical: 9,
        margin: 2,
        backgroundColor: Colors.surface,
        alignItems: "center",
      }}
    >
      <View style={{ paddingHorizontal: 2 }}>
        <HandsClappingIcon color={Colors.brandPrimary} weight="fill" />
      </View>
      <Text>{catchAction.thrower.name}</Text>
      <View style={{ marginHorizontal: 8 }}>
        <ArrowBendUpRightIcon color={Colors.brandPrimary} />
      </View>
      <Text>{catchAction.receiver.name}</Text>
    </View>
  );
}
