import Ionicons from "@expo/vector-icons/Ionicons";
import { StyleSheet, Text, TextStyle, View } from "react-native";
import { Colors } from "../styles/global";
import ActionButton from "./ActionButton";

export default function DefensePlayerCard({
  name,
  onD,
  textStyle,
}: {
  name: string;
  onD: () => void;
  textStyle?: TextStyle;
}) {
  return (
    <View style={styles.container}>
      <View style={styles.nameView}>
        <Text style={[styles.nameText, textStyle]}>{name}</Text>
      </View>
      <View style={styles.arrowView}>
        <Ionicons name="arrow-forward" />
      </View>
      <View style={styles.buttonView}>
        <ActionButton label="D" onPress={onD} />
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
  container: {
    backgroundColor: Colors.surface,
    flexDirection: "row",
    height: 50,
  },
  nameText: {
    textAlign: "right",
    fontWeight: "900",
  },
  nameView: {
    flex: 1.5,
    height: "100%",
    justifyContent: "center",
    padding: 2,
  },
});
