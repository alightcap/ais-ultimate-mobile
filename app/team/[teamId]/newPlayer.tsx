import { StyleSheet, Text, View } from "react-native";

export default function NewPlayer() {
  return (
    <View>
      <Text style={styles.heading}>New Player</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  heading: {
    marginTop: 10,
    fontSize: 18,
    textAlign: "center",
  },
});
