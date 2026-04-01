import { Href, useRouter } from "expo-router";
import { CaretRightIcon } from "phosphor-react-native";
import { ReactNode } from "react";
import { Pressable, StyleSheet, View, ViewStyle } from "react-native";
import { Colors } from "../styles/global";

export default function NavCard({
  children,
  route,
  viewStyle,
}: {
  children: ReactNode;
  route: Href;
  viewStyle?: ViewStyle;
}) {
  const router = useRouter();

  return (
    <Pressable
      onPress={() => router.push(route)}
      style={[styles.navCard, viewStyle]}
    >
      <View style={styles.navCardView}>
        {children}
        <CaretRightIcon color={Colors.brandPrimary} weight="bold" />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  navCard: {
    backgroundColor: Colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
    padding: 8,
    minHeight: 56,
    justifyContent: "center",
  },
  navCardView: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
