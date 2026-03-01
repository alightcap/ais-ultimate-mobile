import AntDesign from "@expo/vector-icons/AntDesign";
import { router } from "expo-router";
import { Pressable, StyleSheet } from "react-native";

export default function BackButton() {
  return (
    <Pressable onPress={() => router.back()} style={styles.backButton}>
      <AntDesign name="left" size={24} color="black" />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  backButton: {
    justifyContent: "center",
  },
});
