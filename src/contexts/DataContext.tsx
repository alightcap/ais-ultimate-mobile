import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { ActivityIndicator, View } from "react-native";
import {
  games as placeholderGames,
  players as placeholderPlayers,
  teams as placeholderTeams,
} from "../lib/placeholder-data";
import { DataContextType, Game, Player, Team } from "../lib/types";
import { KEYS, loadData, saveData } from "../utils/storage";

const DataContext = createContext<DataContextType | undefined>(undefined);

export function DataProvider({ children }: { children: ReactNode }) {
  const [teams, setTeams] = useState<Team[]>([]);
  const [players, setPlayers] = useState<Player[]>([]);
  const [games, setGames] = useState<Game[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const init = async () => {
      const [storedTeams, storedPlayers, storedGames] = await Promise.all([
        loadData(KEYS.TEAMS),
        loadData(KEYS.PLAYERS),
        loadData(KEYS.GAMES),
      ]);

      setTeams(storedTeams.length ? storedTeams : placeholderTeams);
      setPlayers(storedPlayers.length ? storedPlayers : placeholderPlayers);
      setGames(storedGames.length ? storedGames : placeholderGames);
      setIsLoading(false);
    };
    init();
  }, []);

  const linkPlayerToTeam = async (playerId: string, teamId: string) => {
    const updatedTeams = teams.map((team) => {
      if (team.id === teamId && !team.players.includes(playerId)) {
        return { ...team, player: [...team.players, playerId] };
      }
      return team;
    });

    setTeams(updatedTeams);
    await saveData(KEYS.TEAMS, updatedTeams);
  };

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  const addTeam = async (newTeam: Team) => {
    const updatedTeams = [...teams, newTeam];
    setTeams(updatedTeams);
    saveData(KEYS.TEAMS, updatedTeams);
  };

  const deleteTeam = async (teamId: string) => {
    const nextTeams = teams.filter((t) => t.id !== teamId);
    const nextPlayers = players.map((p) => ({
      ...p,
      teams: p.teams.filter((id) => id !== teamId),
    }));

    setTeams(nextTeams);
    setPlayers(nextPlayers);

    await Promise.all([
      saveData(KEYS.TEAMS, nextTeams),
      saveData(KEYS.PLAYERS, nextPlayers),
    ]);
  };

  const updateTeam = async (updatedTeam: Team) => {
    setTeams((prevTeams) => {
      const updatedTeams = prevTeams.map((team) =>
        team.id === updatedTeam.id ? updatedTeam : team,
      );
      saveData(KEYS.TEAMS, updatedTeams);
      return updatedTeams;
    });
  };

  const togglePlayerAvailability = (playerId: string) => {
    setPlayers((prevPlayers) =>
      prevPlayers.map((p) =>
        p.id === playerId ? { ...p, active: !p.active } : p,
      ),
    );
  };

  return (
    <DataContext.Provider
      value={{
        teams,
        players,
        games,
        addTeam,
        deleteTeam,
        updateTeam,
        linkPlayerToTeam,
        togglePlayerAvailability,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

export const useData = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error("useData must be used within a DataProvider");
  }
  return context;
};
