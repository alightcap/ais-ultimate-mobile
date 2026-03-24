import { getId } from "../utils/uniqueId";
import { Game, Player, Point, Team } from "./types";

export const createNewGame = (params: {
  teamId: string;
  opponentName: string;
  eventName?: string;
}): Game => {
  return {
    id: getId(),
    teamId: params.teamId,
    opponentName: params.opponentName,
    eventName: params.eventName || "",
    currentLine: [],
    points: [initialPoint()],
    ourScore: 0,
    theirScore: 0,
    hasPossession: true,
    isArchived: false,
    isOver: false,
    isUploaded: false,
    timeStamp: Date.now(),
    halfAt: "points",
    startingOn: "offense",
    pointCap: 13,
    hardCap: 90,
  };
};

export const createNewTeam = (params: {
  name: string;
  shortName?: string;
}): Team => {
  return {
    id: getId(),
    name: params.name,
    shortName: params.shortName || "",
    playerIDs: [],
    gameIDs: [],
    isArchived: false,
  };
};

export const createUnknownPlayer = (teamId: string): Player => {
  return {
    id: `${teamId}-unknown`,
    name: "UNKNOWN",
    active: true,
    isArchived: false,
    teamIDs: [teamId],
  };
};

export const initialPoint = (): Point => {
  return {
    number: 1,
    actions: [],
  };
};
