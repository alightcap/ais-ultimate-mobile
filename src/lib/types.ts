import { Dispatch, SetStateAction } from "react";

export interface Game {
  id: string;
}

export interface Player {
  id: string;
  name: string;
  number: number;
}

export interface Team {
  id: string;
  name: string;
  players: Player[];
  games: Game[];
}

export interface TeamContextType {
  team: Team;
}

export interface TeamsContextType {
  teams: Team[];
  setTeams: Dispatch<SetStateAction<Team[]>>;
}

export interface TextInputFormRowProps {
  title: string;
  item: string;
  setItem: (text: string) => void;
}
