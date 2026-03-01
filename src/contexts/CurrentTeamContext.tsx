import { createContext, ReactNode, useContext } from "react";
import { Team, TeamContextType } from "../lib/types";

const CurrentTeamContext = createContext<TeamContextType | undefined>(
  undefined,
);

export function CurrentTeamProvider({
  team,
  children,
}: {
  team: Team;
  children: ReactNode;
}) {
  return (
    <CurrentTeamContext.Provider value={{ team }}>
      {children}
    </CurrentTeamContext.Provider>
  );
}

export const useCurrentTeam = () => {
  const context = useContext(CurrentTeamContext);
  if (!context)
    throw new Error("useCurrentTeam must be used within CurrentTeamProvider");
  return context;
};
