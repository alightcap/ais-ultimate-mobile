import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { Player, PlayersContextType, Team } from "../lib/types";

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
    const loadData = async () => {
      const saved = await AsyncStorage.getItem(`players_${team.id}`);
      if (saved) {
        setPlayers(JSON.parse(saved));
      } else {
        setPlayers(team.players);
      }
    };
    loadData();
    setPlayers(team.players);
  }, [team]);

  useEffect(() => {
    const saveData = async () => {
      await AsyncStorage.setItem(`players_${team.id}`, JSON.stringify(players));
    };
    saveData();
  }, [team.id, players]);
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
