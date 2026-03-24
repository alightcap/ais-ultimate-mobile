import { getId } from "../utils/uniqueId";
import { Game, Point } from "./types";

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

export const initialPoint = (): Point => {
  return {
    number: 1,
    actions: [],
  };
};
