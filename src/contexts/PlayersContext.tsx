import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { Player, PlayersContextType, Team } from "../lib/types";
import { loadPlayers, savePlayers } from "../utils/storage";

const PlayersContext = createContext<PlayersContextType | undefined>(undefined);

export function PlayersProvider({
  team,
  children,
}: {
  team: Team;
  children: ReactNode;
}) {
  const [players, setPlayers] = useState<Player[]>(team.players);

  const togglePlayerAvailability = (playerId: string) => {
    setPlayers((prevPlayers) =>
      prevPlayers.map((p) =>
        p.id === playerId ? { ...p, playing: !p.playing } : p,
      ),
    );
  };

  useEffect(() => {
    loadPlayers(team).then((storedPlayers) => {
      if (storedPlayers && storedPlayers.length > 0) {
        setPlayers(storedPlayers);
      } else {
        setPlayers(team.players);
      }
    });
  }, [team]);

  useEffect(() => {
    savePlayers(team, players);
    // const saveData = async () => {
    //   await AsyncStorage.setItem(`players_${team.id}`, JSON.stringify(players));
    // };
    // saveData();
  }, [team, players]);

  return (
    <PlayersContext.Provider
      value={{ players, setPlayers, togglePlayerAvailability }}
    >
      {children}
    </PlayersContext.Provider>
  );
}

export const usePlayers = () => {
  const context = useContext(PlayersContext);
  if (context === undefined) {
    throw new Error("usePlayers must be used within a PlayersProvider");
  }
  return context;
};
