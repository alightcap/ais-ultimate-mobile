import Ionicons from "@expo/vector-icons/Ionicons";
import { Pressable, StyleSheet, Text, TextStyle, View } from "react-native";
import { Colors } from "../styles/global";
import ActionButton from "./ActionButton";

export default function OffensePlayerCard({
  name,
  hasDisc,
  textStyle,
  onPress,
}: {
  name: string;
  hasDisc: boolean;
  textStyle?: TextStyle;
  onPress?: () => void;
}) {
  return (
    <View style={styles.container}>
      <Pressable style={styles.nameView} onPress={onPress}>
        <Text style={[styles.nameText, textStyle]}>{name}</Text>
      </Pressable>
      <View style={styles.arrowView}>
        <Ionicons name="arrow-forward" />
      </View>
      <View style={styles.buttonView}>
        {!hasDisc && (
          <>
            <ActionButton label="Catch" />
            <ActionButton label="Drop" />
            <ActionButton label="Goal" />
          </>
        )}
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
    flex: 3,
    flexDirection: "row",
  },
  container: {
    backgroundColor: Colors.surface,
    flexDirection: "row",
    height: 50,
  },
  nameView: {
    flex: 1.5,
    height: "100%",
    justifyContent: "center",
    padding: 2,
  },
  nameText: {
    textAlign: "right",
    fontWeight: "900",
    color: Colors.brandPrimary,
  },
});
