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
}

export interface Drop {
  name: "drop";
  time: number;
  thrower: Player;
  receiver: Player;
}

export interface Goal {
  name: "goal";
  time: number;
  thrower: Player;
  receiver: Player;
}

export interface Throwaway {
  name: "throwaway";
  time: number;
  thrower: Player;
}

export interface Pull {
  name: "pull";
  time: number;
  thrower: Player;
  hangTIme: number;
}

export interface De {
  name: "d";
  time: number;
  defender: Player;
}

export interface Callahan {
  name: "callahan";
  time: number;
  defender: Player;
}

export interface PullOb {
  name: "pull ob";
  time: number;
  thrower: Player;
}

export interface Stall {
  name: "stall";
  time: number;
  thrower: Player;
}

export interface Timeout {
  name: "timeout";
  time: number;
}

export interface Halftime {
  name: "halftime";
  time: number;
}

export interface GameOver {
  name: "game over";
  time: number;
}

export interface GameStart {
  name: "game start";
  time: number;
}
