import { Player } from "./types";

interface BaseAction {
  name: string;
  timeStamp: number;
  category: "offense" | "defense" | "system";
  switchPossession: boolean;
  endPoint: boolean;
}

export type Action =
  | Catch
  | Drop
  | GoalFor
  | GoalAgainst
  | ThrowawayFor
  | ThrowawayAgainst
  | Pull
  | De
  | CallahanFor
  | CallahanAgainst
  | PullOb
  | StallFor
  | StallAgainst
  | GameStart
  | Halftime
  | GameOver;

export interface Catch extends BaseAction {
  name: "catch";
  thrower: Player;
  receiver: Player;
  category: "offense";
  switchPossession: false;
  endPoint: false;
}

export interface Drop extends BaseAction {
  name: "drop";
  thrower: Player;
  receiver: Player;
  category: "offense";
  switchPossession: true;
  endPoint: false;
}

export interface GoalFor extends BaseAction {
  name: "goal for";
  category: "offense";
  thrower: Player;
  receiver: Player;
  score: { ourScore: number; theirScore: number };
  switchPossession: true;
  endPoint: true;
}

export interface GoalAgainst extends BaseAction {
  name: "goal against";
  category: "defense";
  opponentName: string;
  switchPossession: true;
  endPoint: true;
}

export interface ThrowawayFor extends BaseAction {
  name: "throwaway for";
  thrower: Player;
  category: "offense";
  switchPossession: true;
  endPoint: false;
}

export interface ThrowawayAgainst extends BaseAction {
  name: "throwaway against";
  category: "defense";
  opponentName: string;
  switchPossession: true;
  endPoint: false;
}

export interface Pull extends BaseAction {
  name: "pull";
  category: "defense";
  thrower: Player;
  hangTime: number;
  switchPossession: false;
  endPoint: false;
}

export interface De extends BaseAction {
  name: "d";
  category: "defense";
  defender: Player;
  switchPossession: true;
  endPoint: false;
}

export interface CallahanFor extends BaseAction {
  name: "callahan for";
  category: "defense";
  defender: Player;
  switchPossession: false;
  endPoint: true;
}

export interface CallahanAgainst extends BaseAction {
  name: "callahan against";
  category: "offense";
  thrower: Player;
  switchPossession: false;
  endPoint: true;
}

export interface PullOb extends BaseAction {
  name: "pull ob";
  category: "defense";
  thrower: Player;
  switchPossession: false;
  endPoint: false;
}

export interface StallFor extends BaseAction {
  name: "stall for";
  category: "offense";
  thrower: Player;
  switchPossession: true;
  endPoint: false;
}

export interface StallAgainst extends BaseAction {
  name: "stall against";
  category: "defense";
  defender: Player;
  switchPossession: true;
  endPoint: false;
}

export interface Timeout extends BaseAction {
  name: "timeout";
  category: "system";
  switchPossession: false;
  endPoint: false;
}

export interface Halftime extends BaseAction {
  name: "halftime";
  category: "system";
  switchPossession: false;
  endPoint: false;
}

export interface GameOver extends BaseAction {
  name: "game over";
  category: "system";
  switchPossession: false;
  endPoint: false;
}

export interface GameStart extends BaseAction {
  name: "game start";
  category: "system";
  switchPossession: false;
  endPoint: false;
}
