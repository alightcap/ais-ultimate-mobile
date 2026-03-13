import { NativeStackNavigationOptions } from "@react-navigation/native-stack";
import { Colors } from "./global";

export const DefaultStackOptions: NativeStackNavigationOptions = {
  headerBackButtonDisplayMode: "minimal",
  headerStyle: {
    backgroundColor: Colors.surface,
  },
  headerTitleStyle: {
    fontWeight: "bold",
    fontSize: 20,
    color: Colors.text,
  },
  headerTintColor: Colors.brandPrimary,
  headerTitleAlign: "center",
};
