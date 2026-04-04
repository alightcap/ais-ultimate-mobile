import { Href, useRouter } from "expo-router";
import { PencilSimpleIcon } from "phosphor-react-native";
import { Pressable } from "react-native";
import { Colors } from "../styles/global";

export default function EditButton({ route }: { route: Href }) {
  const router = useRouter();

  return (
    <Pressable onPress={() => router.push(route)}>
      <PencilSimpleIcon color={Colors.brandPrimary} />
    </Pressable>
  );
}
