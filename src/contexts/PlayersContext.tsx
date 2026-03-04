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
  useEffect(() => {
    setPlayers(team.players);
  }, [team]);
  return (
    <PlayersContext.Provider value={{ players, setPlayers }}>
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
