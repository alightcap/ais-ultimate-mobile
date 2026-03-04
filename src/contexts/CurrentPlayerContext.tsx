import { createContext, ReactNode, useContext } from "react";
import { Player, PlayerContextType } from "../lib/types";

const CurrentPlayerContext = createContext<PlayerContextType | undefined>(
  undefined,
);

export function CurrentPlayerProvider({
  player,
  children,
}: {
  player: Player;
  children: ReactNode;
}) {
  return (
    <CurrentPlayerContext.Provider value={{ player }}>
      {children}
    </CurrentPlayerContext.Provider>
  );
}

export const useCurrentPlayer = () => {
  const context = useContext(CurrentPlayerContext);
  if (!context)
    throw new Error("useCurrentPlayer must be used within CurrentTeamProvider");
  return context;
};
