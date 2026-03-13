import {
  HeaderBackButton,
  HeaderBackButtonProps,
} from "@react-navigation/elements";
import { useRouter } from "expo-router";
import { Colors } from "../styles/global";

export default function HeaderBack(props: HeaderBackButtonProps) {
  const router = useRouter();
  return (
    <HeaderBackButton
      {...props}
      displayMode="minimal"
      tintColor={Colors.brandPrimary}
      onPress={() => router.back()}
    />
  );
}
