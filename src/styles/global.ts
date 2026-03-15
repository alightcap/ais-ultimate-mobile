import { StyleSheet } from "react-native";

const palette = {
  primaryMid: "#0054a6",
  primaryLight: "#52c6da",
  primaryDark: "#003656",
  secondaryWhite: "#fff",
  secondaryPink: "#f4eaea",

  success: "#34c759",
  danger: "#FF3b30",
  warning: "#ff9500",

  white: "#fff",
  black: "#000",
  gray100: "#f2f2f7",
  gray500: "#8e8e93",
  gray900: "#1c1c1e",
};

export const Colors = {
  background: palette.white,
  surface: palette.gray100,
  text: palette.black,
  textMuted: palette.gray500,
  border: "#c6c6c8",
  buttonPress: palette.gray500,

  brandPrimary: palette.primaryMid,
  brandAccent: palette.primaryLight,

  active: palette.success,
  archived: palette.gray500,
  error: palette.danger,
  black: palette.black,
  white: palette.white,
};

export const GlobalStyles = StyleSheet.create({
  container: {
    flex: 1,
    marginLeft: 2,
    marginRight: 2,
    backgroundColor: Colors.background,
  },
  contentContainer: {
    flex: 1,
  },
  headingText: {
    fontSize: 24,
    marginTop: 10,
    marginBottom: 10,
    textAlign: "center",
    fontWeight: "bold",
    color: Colors.text,
  },
  listContainer: {
    flex: 1,
  },
  empty: {
    textAlign: "center",
    marginTop: 50,
    color: "gray",
  },
});
