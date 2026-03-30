import { ArrowRightIcon } from "phosphor-react-native";
import { StyleSheet, Text, View } from "react-native";
import { Colors } from "../styles/global";
import ActionButton from "./ActionButton";

export default function DefensePlayerCard({
  name,
  isEmpty,
  isPulling,
  onD,
  onPull,
}: {
  name: string;
  isEmpty: boolean;
  isPulling: boolean;
  onD: () => void;
  onPull: () => void;
}) {
  return (
    <View style={{ flex: 1 }}>
      <View style={styles.rowContainer}>
        <View style={styles.nameView}>
          <Text style={[styles.nameText, isEmpty && { opacity: 0 }]}>
            {name}
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
