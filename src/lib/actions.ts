import { Player } from "./types";

interface BaseAction {
  name: string;
  timeStamp: number;
  switchPossession: boolean;
  endPoint: boolean;
}

export type Action =
  | Catch
  | Drop
  | Goal
  | Throwaway
  | Pull
  | De
  | Callahan
  | PullOb
  | Stall
  | GameStart
  | Halftime
  | GameOver;

export type Turnover = Drop | Throwaway | De | Stall;

export type EndPoint = Goal | Callahan;

export interface Catch extends BaseAction {
  name: "catch";
  thrower: Player;
  receiver: Player;
  switchPossession: false;
  endPoint: false;
}

export interface Drop {
  name: "drop";
  thrower: Player;
  receiver: Player;
  switchPossession: true;
  endPoint: false;
}

export interface Goal {
  name: "goal";
  thrower: Player;
  receiver: Player;
  switchPossession: true;
  endPoint: true;
}

export interface Throwaway {
  name: "throwaway";
  thrower: Player;
  switchPossession: true;
  endPoint: false;
}

export interface Pull {
  name: "pull";
  thrower: Player;
  hangTime: number;
  switchPossession: false;
  endPoint: false;
}

export interface De {
  name: "d";
  defender: Player;
  switchPossession: true;
  endPoint: false;
}

export interface Callahan {
  name: "callahan";
  defender: Player;
  switchPossession: false;
  endPoint: true;
}

export interface PullOb {
  name: "pull ob";
  thrower: Player;
  switchPossession: false;
  endPoint: false;
}

export interface Stall {
  name: "stall";
  thrower: Player;
  switchPossession: true;
  endPoint: false;
}

export interface Timeout {
  name: "timeout";
  switchPossession: false;
  endPoint: false;
}

export interface Halftime {
  name: "halftime";
  switchPossession: false;
  endPoint: false;
}

export interface GameOver {
  name: "game over";
  switchPossession: false;
  endPoint: false;
}

export interface GameStart {
  name: "game start";
  switchPossession: false;
  endPoint: false;
}
