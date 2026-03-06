import AsyncStorage from "@react-native-async-storage/async-storage";
import { Player, Team } from "../lib/types";

const TEAMS_KEY = "@my_app_teams";

export const loadPlayers = async (team: Team) => {
  try {
    const jsonValue = await AsyncStorage.getItem(`players_${team.id}`);
    return jsonValue != null ? JSON.parse(jsonValue) : [];
  } catch (e) {
    console.error("Failed to load players:", e);
    return [];
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

export const saveTeams = async (teams: Team[]) => {
  try {
    const jsonValue = JSON.stringify(teams);
    await AsyncStorage.setItem(TEAMS_KEY, jsonValue);
  } catch (e) {
    console.error("Failed to save teams:", e);
  }
};

export const savePlayers = async (team: Team, players: Player[]) => {
  try {
    const jsonValue = JSON.stringify(players);
    await AsyncStorage.setItem(`players_${team.id}`, jsonValue);
  } catch (e) {
    console.error("Failed to save players:", e);
  }
};
