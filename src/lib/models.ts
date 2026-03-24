import {Game, HalfTimeMode, StartingOnMode} from "./types";
import {getId} from "./utils/uniqueId";

export const createNewGame = (params: {teamId: string; opponentName: string; eventName?: string}): Game => {
    return {
        id : getId();
        teamId: params.teamId,
        opponentName: params.opponentName,
        eventName: params.eventName || "",
        currentLine: [],
        points: [], // potentially replace this with a default first point.
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
}