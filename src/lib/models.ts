import { getId } from "../utils/uniqueId";
import {
  Action,
  Catch,
  De,
  Drop,
  GameStart,
  GoalAgainst,
  GoalFor,
  Pull,
  PullOb,
  ThrowawayAgainst,
  ThrowawayFor,
} from "./actions";
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
    currentLineIds: [],
    points: [],
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

export const createNewPlayer = (params: {
  name: string;
  teamId: string;
  number: number;
}): Player => {
  return {
    active: true,
    id: getId(),
    isArchived: false,
    name: params.name,
    number: params.number,
    teamIDs: [params.teamId],
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

export const createNewPoint = ({
  number,
  currentLineIds,
  actions = [],
}: {
  number: number;
  currentLineIds: string[];
  actions?: Action[];
}): Point => {
  return {
    number: number,
    startTime: Date.now(),
    currentLineIds: currentLineIds,
    actions: actions,
    ourScore: 0,
    theirScore: 0,
  };
};

export const createCatchEvent = ({
  thrower,
  receiver,
}: {
  thrower: Player;
  receiver: Player;
}): Catch => {
  return {
    name: "catch",
    category: "offense",
    timeStamp: Date.now(),
    thrower: thrower,
    receiver: receiver,
    switchPossession: false,
    endPoint: false,
  };
};

export const createDeEvent = ({ defender }: { defender: Player }): De => {
  return {
    name: "d",
    category: "defense",
    timeStamp: Date.now(),
    defender: defender,
    switchPossession: true,
    endPoint: false,
  };
};

export const createDropEvent = ({
  thrower,
  receiver,
}: {
  thrower: Player;
  receiver: Player;
}): Drop => {
  return {
    name: "drop",
    category: "offense",
    timeStamp: Date.now(),
    thrower: thrower,
    receiver: receiver,
    switchPossession: true,
    endPoint: false,
  };
};

export const createGoalForEvent = ({
  thrower,
  receiver,
  ourScore,
  theirScore,
}: {
  thrower: Player;
  receiver: Player;
  ourScore: number;
  theirScore: number;
}): GoalFor => {
  return {
    name: "goal for",
    category: "offense",
    timeStamp: Date.now(),
    thrower: thrower,
    receiver: receiver,
    score: { ourScore, theirScore },
    switchPossession: true,
    endPoint: true,
  };
};

export const createGoalAgainstEvent = ({
  opponentName,
  ourScore,
  theirScore,
}: {
  opponentName: string;
  ourScore: number;
  theirScore: number;
}): GoalAgainst => {
  return {
    name: "goal against",
    category: "defense",
    opponentName: opponentName,
    timeStamp: Date.now(),
    score: { ourScore, theirScore },
    switchPossession: true,
    endPoint: true,
  };
};

export const createNewPullEvent = ({
  thrower,
  hangTime,
}: {
  thrower: Player;
  hangTime: number;
}): Pull => {
  return {
    name: "pull",
    category: "defense",
    timeStamp: Date.now(),
    thrower: thrower,
    hangTime: hangTime,
    switchPossession: false,
    endPoint: false,
  };
};

export const createNewPullObEvent = ({
  thrower,
}: {
  thrower: Player;
}): PullOb => {
  return {
    name: "pull ob",
    category: "defense",
    timeStamp: Date.now(),
    thrower: thrower,
    switchPossession: false,
    endPoint: false,
  };
};

export const createStartGameEvent = ({
  startTime,
}: {
  startTime: number;
}): GameStart => {
  return {
    timeStamp: startTime,
    name: "game start",
    category: "system",
    switchPossession: false,
    endPoint: false,
  };
};

export const createThrowawayForEvent = ({
  thrower,
}: {
  thrower: Player;
}): ThrowawayFor => {
  return {
    name: "throwaway for",
    category: "offense",
    timeStamp: Date.now(),
    thrower: thrower,
    switchPossession: true,
    endPoint: false,
  };
};

export const createThrowawayAgainstEvent = (
  opponentName: string,
): ThrowawayAgainst => {
  return {
    name: "throwaway against",
    category: "defense",
    timeStamp: Date.now(),
    opponentName: opponentName,
    switchPossession: true,
    endPoint: false,
  };
};
