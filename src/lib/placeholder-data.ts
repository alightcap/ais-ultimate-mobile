import { Team } from "./types";

export const teams: Team[] = [
  {
    id: 0,
    name: "2026 Varsity Open AIS Eagles",
    hasDownloads: true,
    hasUploads: true,
    players: [
      {
        id: 0,
        name: "a",
        number: 15,
      },
      {
        id: 1,
        name: "b",
        number: 65,
      },
    ],
  },
  {
    id: 1,
    name: "2026 Junior Varsity Women's AIS Eagles",
    hasDownloads: false,
    hasUploads: true,
    players: [],
  },
  {
    id: 2,
    name: "2025 MS Open AIS Eagles",
    hasDownloads: true,
    hasUploads: false,
    players: [],
  },
  {
    id: 3,
    name: "2024 MS Open AIS Eagles",
    hasDownloads: false,
    hasUploads: false,
    players: [],
  },
];
