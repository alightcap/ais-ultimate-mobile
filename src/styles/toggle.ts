import { StyleSheet } from "react-native";
import { Colors } from "./global";

export const ToggleStyles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: Colors.surface,
    borderRadius: 8,
    padding: 4,
    position: "relative",
  },
  button: {
    paddingHorizontal: 8,
    paddingVertical: 10,
    alignItems: "center",
    borderRadius: 6,
  },
  activeButton: {
    backgroundColor: Colors.brandPrimary,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  text: {
    fontWeight: "600",
    color: Colors.textMuted,
  },
  activeText: {
    color: Colors.white,
  },
});
