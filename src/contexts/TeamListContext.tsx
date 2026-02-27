import { createContext, ReactNode, useContext, useState } from "react";
import { teams } from "../lib/placeholder-data";
import { Team, TeamContextType } from "../lib/types";

const TeamListContext = createContext<TeamContextType | undefined>(undefined);

export function TeamProvider({ children }: { children: ReactNode }) {
  const [teamList, setTeamList] = useState<Team[]>(teams);
  return (
    <TeamListContext.Provider value={{ teamList, setTeamList }}>
      {children}
    </TeamListContext.Provider>
  );
}

export const useTeams = () => {
  const context = useContext(TeamListContext);
  if (context === undefined) {
    throw new Error("useTeams must be used within a TeamProvider");
  }
  return context;
};
