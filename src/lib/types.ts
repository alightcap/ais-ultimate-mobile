import { KeyboardTypeOptions } from "react-native";

export interface Game {
  id: string;
  timeStamp: number;
  teamId: string;
  eventName: string | undefined;
  opponentName: string;
  ourScore: number;
  theirScore: number;
  isOver: boolean;
  isArchived: boolean;
}

export interface Player {
  id: string;
  name: string;
  number: number;
  teamIDs: string[];
  active: boolean;
  isArchived: boolean;
}

export interface Team {
  id: string;
  name: string;
  playerIDs: string[];
  gameIDs: string[];
  isArchived: boolean;
}

export interface TeamListProps {
  teams: Team[];
  emptyMessage: string;
  renderRightAction?: (team: Team) => React.ReactNode;
}

export interface DataContextType {
  teams: Team[];
  players: Player[];
  games: Game[];
  addGame: (newGame: Game) => Promise<void>;
  addTeam: (newTeam: Team) => Promise<void>;
  addPlayer: (newPlayer: Player) => Promise<void>;
  linkPlayersToTeam: (playerIds: string[], teamId: string) => Promise<void>;
  toggleArchiveEntity: (
    type: "teams" | "players" | "games",
    id: string,
    isArchived: boolean,
  ) => Promise<void>;
  updateGame: (updatedGame: Game) => Promise<void>;
  updatePlayer: (updatedPlayer: Player) => Promise<void>;
  updateTeam: (updatedTeam: Team) => Promise<void>;
  togglePlayerAvailability: (playerId: string) => void;
}

export interface TextInputFormRowProps {
  title: string;
  item: string;
  setItem: (text: string) => void;
  autoFocus?: boolean;
  placeholderText?: string;
  keyboardType?: KeyboardTypeOptions;
}
