import Ionicons from "@expo/vector-icons/Ionicons";
import { Href, useRouter } from "expo-router";
import { Pressable } from "react-native";

export default function EditButton({ route }: { route: Href }) {
  const router = useRouter();

  return (
    <Pressable style={{ marginRight: -40 }} onPress={() => router.push(route)}>
      <Ionicons name="pencil" size={24} />
    </Pressable>
  );
}
