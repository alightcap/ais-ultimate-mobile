import { Dispatch, SetStateAction } from "react";

export interface Game {
  id: string;
  team: string;
  event: string | undefined;
  opponent: string;
  ourScore: number;
  theirScore: number;
  isOver: boolean;
}

export interface Player {
  id: string;
  name: string;
  number: number;
  teams: string[];
  active: boolean;
}

export interface PlayerContextType {
  player: Player;
}

export interface PlayersContextType {
  players: Player[];
  setPlayers: Dispatch<SetStateAction<Player[]>>;
  togglePlayerAvailability: (playerId: string) => void;
}

export interface Team {
  id: string;
  name: string;
  players: string[];
  games: string[];
}

export interface TeamContextType {
  team: Team;
}

export interface DataContextType {
  teams: Team[];
  players: Player[];
  games: Game[];
  addTeam: (newTeam: Team) => Promise<void>;
  deleteTeam: (teamId: string) => Promise<void>;
  updateTeam: (updatedTeam: Team) => Promise<void>;
  linkPlayerToTeam: (playerId: string, teamId: string) => Promise<void>;
  togglePlayerAvailability: (playerId: string) => void;
}

export interface TextInputFormRowProps {
  title: string;
  item: string;
  setItem: (text: string) => void;
  autoFocus?: boolean;
}
