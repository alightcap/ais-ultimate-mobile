import AsyncStorage from "@react-native-async-storage/async-storage";

const TEAMS_KEY = "@my_app_teams";

export const saveTeams = async (teams: any[]) => {
  try {
    const jsonValue = JSON.stringify(teams);
    await AsyncStorage.setItem(TEAMS_KEY, jsonValue);
  } catch (e) {
    console.error("Faled to save teams:", e);
  }
};

export const loadTeams = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem(TEAMS_KEY);
    return jsonValue != null ? JSON.parse(jsonValue) : [];
  } catch (e) {
    console.error("Failed to load teams:", e);
    return [];
  }
};
