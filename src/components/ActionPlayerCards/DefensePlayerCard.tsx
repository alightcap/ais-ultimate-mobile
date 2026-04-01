import { ArrowRightIcon } from "phosphor-react-native";
import { StyleSheet, Text, View } from "react-native";
import { DefensePlayerProps } from "../../lib/types";
import { Colors } from "../../styles/global";
import ActionButton from "../ActionButton";

// make a single player card component?
export default function DefensePlayerCard({
  playerProps,
}: {
  playerProps: DefensePlayerProps;
}) {
  const { player, isPulling, onD, onPull } = playerProps;
  const isEmpty = player.id.startsWith("empty");
  return (
    <View style={{ flex: 1 }}>
      <View style={styles.rowContainer}>
        <View style={styles.nameView}>
          <Text style={[styles.nameText, isEmpty && { opacity: 0 }]}>
            {player.name}
          </Text>
        </View>
        <View style={styles.arrowView}>
          {!isEmpty && <ArrowRightIcon size={16} />}
        </View>
        <View style={styles.buttonView}>
          {isPulling
            ? !isEmpty && <ActionButton label="Pull" onPress={onPull} />
            : !isEmpty && <ActionButton label="D" onPress={onD} />}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  arrowView: {
    flex: 0.25,
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonView: {
    flex: 1,
  },
  rowContainer: {
    backgroundColor: Colors.surface,
    flexDirection: "row",
    flex: 1,
    gap: 6,
  },
  nameText: {
    textAlign: "right",
    fontWeight: "900",
  },
  nameView: {
    flex: 1.75,
    height: "100%",
    justifyContent: "center",
  },
});
