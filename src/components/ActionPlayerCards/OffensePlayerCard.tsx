import { ArrowRightIcon } from "phosphor-react-native";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { OffensePlayerProps } from "../../lib/types";
import { Colors } from "../../styles/global";
import ActionButton from "../ActionButton";

export default function OffensePlayerCard({
  playerProps,
}: {
  playerProps: OffensePlayerProps;
}) {
  const { player, hasDisc, showButtons, onPress, onCatch, onDrop, onGoal } =
    playerProps;
  const isEmpty = player.id.startsWith("empty");

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.rowContainer}>
        <Pressable
          style={styles.nameView}
          onPress={isEmpty ? undefined : onPress}
        >
          <Text
            style={[
              styles.nameText,
              hasDisc && styles.activePlayer,
              isEmpty && { opacity: 0 },
            ]}
          >
            {player.name}
          </Text>
        </Pressable>
        <View style={styles.arrowView}>
          {!isEmpty && (
            <ArrowRightIcon size={16} weight={hasDisc ? "fill" : "regular"} />
          )}
        </View>
        <View style={styles.buttonView}>
          {showButtons && !isEmpty && (
            <>
              <ActionButton label="Catch" onPress={onCatch} />
              <ActionButton label="Drop" onPress={onDrop} />
              <ActionButton label="Goal" onPress={onGoal} />
            </>
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  activePlayer: {
    fontStyle: "italic",
    fontWeight: "900",
  },
  arrowView: {
    flex: 0.25,
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonView: {
    flex: 3,
    flexDirection: "row",
    gap: 2,
  },
  rowContainer: {
    flexDirection: "row",
    flex: 1,
    gap: 6,
  },
  nameView: {
    flex: 1.75,
    height: "100%",
    justifyContent: "center",
  },
  nameText: {
    textAlign: "right",
    fontWeight: "700",
    color: Colors.brandPrimary,
  },
});
