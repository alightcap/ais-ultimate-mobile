import { Dispatch, SetStateAction } from "react";

export interface Player {
  id: number;
  name: string;
  number: number;
}

export interface Team {
  id: number;
  name: string;
  players: Player[];
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
