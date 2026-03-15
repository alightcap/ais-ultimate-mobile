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

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  const addEntityToTeam = async (
    teamId: string,
    entityId: string,
    teamKey: "gameIDs" | "playerIDs",
  ) => {
    const updatedTeams = teams.map((team) => {
      if (team.id === teamId) {
        const currentIDs = team[teamKey] || [];
        const alreadyExists = currentIDs.includes(entityId);
        return {
          ...team,
          [teamKey]: alreadyExists ? currentIDs : [...currentIDs, entityId],
        };
      }
      return team;
    });

    setTeams(updatedTeams);
    await saveData(KEYS.TEAMS, updatedTeams);
  };

  const addGame = async (newGame: Game) => {
    const updatedGames = [...games, newGame];
    setGames(updatedGames);
    saveData(KEYS.GAMES, updatedGames);

    const targetTeamId = newGame.teamId;

    if (targetTeamId) {
      addEntityToTeam(targetTeamId, newGame.id, "gameIDs");
    }
  };

  const addPlayer = async (newPlayer: Player) => {
    const updatedPlayers = [...players, newPlayer];
    setPlayers(updatedPlayers);
    await saveData(KEYS.PLAYERS, updatedPlayers);

    const targetTeamId = newPlayer.teamIDs[0];

    if (targetTeamId) {
      addEntityToTeam(targetTeamId, newPlayer.id, "playerIDs");
    }
  };

  const addTeam = async (newTeam: Team) => {
    const updatedTeams = [...teams, newTeam];
    setTeams(updatedTeams);
    saveData(KEYS.TEAMS, updatedTeams);
  };

  const linkPlayersToTeam = async (playerIds: string[], teamId: string) => {
    let updatedTeams: Team[] = [];

    setTeams((prevTeams) => {
      updatedTeams = prevTeams.map((team) => {
        if (team.id === teamId) {
          const combinedIds = Array.from(
            new Set([...team.playerIDs, ...playerIds]),
          );
          return { ...team, playerIDs: combinedIds };
        }
        return team;
      });
      return updatedTeams;
    });
    if (updatedTeams.length > 0) {
      await saveData(KEYS.TEAMS, updatedTeams);
    }
  };

  const toggleArchiveEntity = async (
    type: "teams" | "players" | "games",
    id: string,
    isArchived: boolean,
  ) => {
    switch (type) {
      case "teams": {
        const updated = teams.map((t) =>
          t.id === id ? { ...t, isArchived: isArchived } : t,
        );
        setTeams(updated);
        await saveData(KEYS.TEAMS, updated);
        break;
      }
      case "players": {
        const updated = players.map((p) =>
          p.id === id ? { ...p, isArchived: isArchived } : p,
        );
        setPlayers(updated);
        await saveData(KEYS.PLAYERS, updated);
        break;
      }
      case "games": {
        const updated = games.map((g) =>
          g.id === id ? { ...g, isArchived: isArchived } : g,
        );
        setGames(updated);
        await saveData(KEYS.GAMES, updated);
        break;
      }
    }
  };

  const updateGame = async (updatedGame: Game) => {
    setGames((prevGames) => {
      const updatedGames = prevGames.map((game) =>
        game.id === updatedGame.id ? updatedGame : game,
      );
      saveData(KEYS.GAMES, updatedGames);
      return updatedGames;
    });
  };

  const updatePlayer = async (updatedPlayer: Player) => {
    setPlayers((prevPlayers) => {
      const updatedPlayers = prevPlayers.map((player) =>
        player.id === updatedPlayer.id ? updatedPlayer : player,
      );
      saveData(KEYS.PLAYERS, updatedPlayers);
      return updatedPlayers;
    });
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
        addGame,
        addTeam,
        addPlayer,
        linkPlayersToTeam,
        toggleArchiveEntity,
        updateGame,
        updatePlayer,
        updateTeam,
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
