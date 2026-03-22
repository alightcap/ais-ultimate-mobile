import { Player } from "./types";

export type PointAction =
  | Catch
  | Drop
  | Goal
  | Throwaway
  | Pull
  | De
  | Callahan
  | PullOb
  | Stall
  | Halftime
  | GameOver;

export type Turnover = Drop | Throwaway | De | Stall;

export type EndPoint = Goal | Callahan;

export interface Catch {
  time: number;
  thrower: Player;
  receiver: Player;
}

export interface Drop {
  time: number;
  thrower: Player;
  receiver: Player;
}

export interface Goal {
  time: number;
  thrower: Player;
  receiver: Player;
}

export interface Throwaway {
  time: number;
  thrower: Player;
}

export interface Pull {
  time: number;
  thrower: Player;
  hangTIme: number;
}

export interface De {
  time: number;
  defender: Player;
}

export interface Callahan {
  time: number;
  defender: Player;
}

export interface PullOb {
  time: number;
  thrower: Player;
}

export interface Stall {
  time: number;
  thrower: Player;
}

export interface Timeout {
  time: number;
}

export interface Halftime {
  time: number;
}

export interface GameOver {
  time: number;
}
