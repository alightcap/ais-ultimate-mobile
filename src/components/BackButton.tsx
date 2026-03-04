import AntDesign from "@expo/vector-icons/AntDesign";
import { router } from "expo-router";
import { Pressable } from "react-native";

export default function BackButton() {
  return (
    <Pressable onPress={() => router.back()}>
      <AntDesign name="left" size={24} color="black" />
    </Pressable>
  );
}
