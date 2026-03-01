import { createContext, ReactNode, useContext } from "react";
import { TeamContextType } from "../lib/types";
import { useTeams } from "./TeamsContext";

const CurrentTeamContext = createContext<TeamContextType | undefined>(
  undefined,
);

export function CurrentTeamProvider({
  id,
  children,
}: {
  id: number;
  children: ReactNode;
}) {
  const { teams } = useTeams();

  const team = teams.find((t) => t.id === id);

  if (!team) {
    return null;
  }

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
