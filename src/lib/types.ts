import { Dispatch, SetStateAction } from "react";

export interface Game {
  id: string;
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
  playing: boolean;
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
  players: Player[];
  games: Game[];
}

export interface TeamContextType {
  team: Team;
}

export interface TeamsContextType {
  teams: Team[];
  addTeam: (team: Team) => Promise<void>;
  deleteTeam: (teamId: string) => Promise<void>;
}

export interface TextInputFormRowProps {
  title: string;
  item: string;
  setItem: (text: string) => void;
}
