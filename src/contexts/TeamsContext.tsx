import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { teams as placeholderTeams } from "../lib/placeholder-data";
import { Team, TeamsContextType } from "../lib/types";
import { loadTeams, saveTeams } from "../utils/storage";

const TeamsContext = createContext<TeamsContextType | undefined>(undefined);

export function TeamsProvider({ children }: { children: ReactNode }) {
  const [teams, setTeams] = useState<Team[]>(placeholderTeams);
  // const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    loadTeams().then((storedTeams) => {
      if (storedTeams && storedTeams.length > 0) {
        setTeams(storedTeams);
      } else {
        saveTeams(placeholderTeams);
      }
      // setIsLoaded(true);
    });
  }, []);

  const addTeam = async (newTeam: Team) => {
    const updatedTeams = [...teams, newTeam];
    setTeams(updatedTeams);
    saveTeams(updatedTeams);
  };

  const deleteTeam = async (teamId: string) => {
    setTeams((prevTeams) => {
      const updatedTeams = prevTeams.filter((team) => team.id !== teamId);
      saveTeams(updatedTeams);

      return updatedTeams;
    });
  };

  // if (!isLoaded) return null;

  return (
    <TeamsContext.Provider value={{ teams, addTeam, deleteTeam }}>
      {children}
    </TeamsContext.Provider>
  );
}

export const useTeams = () => {
  const context = useContext(TeamsContext);
  if (context === undefined) {
    throw new Error("useTeams must be used within a TeamProvider");
  }
  return context;
};
