import { Player } from "./types";

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

export interface Catch {
  name: "catch";
  time: number;
  thrower: Player;
  receiver: Player;
  switchPossession: false;
  endPoint: false;
}

export interface Drop {
  name: "drop";
  time: number;
  thrower: Player;
  receiver: Player;
  switchPossession: true;
  endPoint: false;
}

export interface Goal {
  name: "goal";
  time: number;
  thrower: Player;
  receiver: Player;
  switchPossession: true;
  endPoint: true;
}

export interface Throwaway {
  name: "throwaway";
  time: number;
  thrower: Player;
  switchPossession: true;
  endPoint: false;
}

export interface Pull {
  name: "pull";
  time: number;
  thrower: Player;
  hangTIme: number;
  switchPossession: false;
  endPoint: false;
}

export interface De {
  name: "d";
  time: number;
  defender: Player;
  switchPossession: true;
  endPoint: false;
}

export interface Callahan {
  name: "callahan";
  time: number;
  defender: Player;
  switchPossession: false;
  endPoint: true;
}

export interface PullOb {
  name: "pull ob";
  time: number;
  thrower: Player;
  switchPossession: false;
  endPoint: false;
}

export interface Stall {
  name: "stall";
  time: number;
  thrower: Player;
  switchPossession: true;
  endPoint: false;
}

export interface Timeout {
  name: "timeout";
  time: number;
  switchPossession: false;
  endPoint: false;
}

export interface Halftime {
  name: "halftime";
  time: number;
  switchPossession: false;
  endPoint: false;
}

export interface GameOver {
  name: "game over";
  time: number;
  switchPossession: false;
  endPoint: false;
}

export interface GameStart {
  name: "game start";
  time: number;
  switchPossession: false;
  endPoint: false;
}
