export interface Game {
  id: string;
  timeStamp: number;
  teamId: string;
  event: string | undefined;
  opponent: string;
  ourScore: number;
  theirScore: number;
  isOver: boolean;
  isArchived: boolean;
}

export interface Player {
  id: string;
  name: string;
  number: number;
  teams: string[];
  active: boolean;
  isArchived: boolean;
}

export interface Team {
  id: string;
  name: string;
  players: string[];
  games: string[];
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
  addTeam: (newTeam: Team) => Promise<void>;
  archiveEntity: (
    type: "teams" | "players" | "games",
    id: string,
  ) => Promise<void>;
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
