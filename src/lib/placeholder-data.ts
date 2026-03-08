import { Game, Player, Team } from "./types";
{
  /* separate teams games and players make teams have game ids and player ids*/
}

export const games: Game[] = [];

export const players: Player[] = [
  {
    id: "41lye44",
    name: "Seth L",
    number: 15,
    teams: ["j0v81y1"],
    active: true,
    isArchived: false,
  },
  {
    id: "5yewgrb",
    name: "Calder Z",
    number: 65,
    teams: ["j0v81y1"],
    active: false,
    isArchived: false,
  },
];

export const teams: Team[] = [
  {
    id: "j0v81y1",
    name: "2026 Varsity Open AIS Eagles",
    players: ["41lye44", "5yewgrb"],
    games: [],
    isArchived: false,
  },
  {
    id: "sg6uydo",
    name: "2026 Junior Varsity Women's AIS Eagles",
    players: [],
    games: [],
    isArchived: false,
  },
  {
    id: "0pk3iv9",
    name: "2025 MS Open AIS Eagles",
    players: [],
    games: [],
    isArchived: false,
  },
  {
    id: "v7f8lbf",
    name: "2024 MS Open AIS Eagles",
    players: [],
    games: [],
    isArchived: true,
  },
];
