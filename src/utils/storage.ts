import AsyncStorage from "@react-native-async-storage/async-storage";

const KEYS = {
  TEAMS: "@teams",
  PLAYERS: "@players",
  GAMES: "@games",
};

export const loadData = async (key: string) => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue != null ? JSON.parse(jsonValue) : [];
  } catch (e) {
    console.error(`Error loading ${key}:`, e);
    return [];
  }
};

export const saveData = async (key: string, value: any) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
  } catch (e) {
    console.error(`Error saving ${key}:`, e);
  }
};

export { KEYS };
