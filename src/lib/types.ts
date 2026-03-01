import { Dispatch, SetStateAction } from "react";

export interface Player {
  id: number;
  name: string;
  number: number;
}

export interface Team {
  id: number;
  name: string;
  hasUploads: boolean;
  hasDownloads: boolean;
  players: Player[];
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
