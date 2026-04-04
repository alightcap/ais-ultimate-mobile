import { KeyboardTypeOptions } from "react-native";
import { Action } from "./actions";

export interface DataContextType {
  addGame: (newGame: Game) => Promise<void>;
  addPlayer: (newPlayer: Player) => Promise<void>;
  addTeam: (newTeam: Team) => Promise<void>;
  games: Game[];
  linkPlayersToTeam: (playerIds: string[], teamId: string) => Promise<void>;
  players: Player[];
  teams: Team[];
  toggleArchiveEntity: (
    type: "teams" | "players" | "games",
    id: string,
    isArchived: boolean,
  ) => Promise<void>;
  updateGame: (updatedGame: Game) => Promise<void>;
  updatePlayer: (updatedPlayer: Player) => Promise<void>;
  updateTeam: (updatedTeam: Team) => Promise<void>;
}

export interface DefensePlayerProps {
  player: Player;
  isPulling: boolean;
  onD: () => void;
  onPull: () => void;
}

export interface Game {
  currentLineIds: string[];
  eventName: string; //
  halfAt: HalfTimeMode;
  hardCap: number; //
  hasPossession: boolean;
  id: string; //
  isArchived: boolean;
  isOver: boolean;
  isUploaded: boolean;
  opponentName: string; //
  ourScore: number;
  pointCap: number;
  points: Point[]; //
  startingOn: StartingOnMode; //
  teamId: string;
  theirScore: number; //
  timeStamp: number;
  // common to UltiAnalytics
  //
}

export type HalfTimeMode = "first" | "points" | "time";

export interface OffensePlayerProps {
  player: Player;
  hasDisc: boolean;
  showButtons: boolean;
  onPress: () => void;
  onCatch: () => void;
  onDrop: () => void;
  onGoal: () => void;
}

export interface Player {
  active: boolean;
  id: string;
  isArchived: boolean;
  name: string;
  number?: number;
  teamIDs: string[];
}

export interface PlayerStats {
  pointsPlayed: number;
}

export interface Point {
  number: number;
  startTime: number;
  startedOn?: "offense" | "defense";
  currentLineIds?: string[];
  actions: Action[];
  result?: "clean hold" | "hold" | "clean break" | "break";
  ourScore: number;
  theirScore: number;
  endTime?: number;
}

export interface RosterData {
  playerName: string;
  pointPlayed: number;
}

export type StartingOnMode = "defense" | "offense";

export interface Team {
  gameIDs: string[];
  id: string;
  isArchived: boolean;
  name: string;
  playerIDs: string[];
  shortName: string;
}

export interface TeamListProps {
  emptyMessage: string;
  renderRightAction?: (team: Team) => React.ReactNode;
  teams: Team[];
}

export interface TextInputFormRowProps {
  autoFocus?: boolean;
  item: string;
  keyboardType?: KeyboardTypeOptions;
  placeholderText?: string;
  setItem: (text: string) => void;
  title: string;
}
