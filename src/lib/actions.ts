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
  | GoalD
  | Throwaway
  | ThrowawayD
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

export interface Drop extends BaseAction {
  name: "drop";
  thrower: Player;
  receiver: Player;
  switchPossession: true;
  endPoint: false;
}

export interface Goal extends BaseAction {
  name: "goal";
  thrower: Player;
  receiver: Player;
  switchPossession: true;
  endPoint: true;
}

export interface GoalD extends BaseAction {
  name: "goal d";
  switchPossession: true;
  endPoint: true;
}

export interface Throwaway extends BaseAction {
  name: "throwaway";
  thrower: Player;
  switchPossession: true;
  endPoint: false;
}

export interface ThrowawayD extends BaseAction {
  name: "throwaway d";
  switchPossession: true;
  endPoint: false;
}

export interface Pull extends BaseAction {
  name: "pull";
  thrower: Player;
  hangTime: number;
  switchPossession: false;
  endPoint: false;
}

export interface De extends BaseAction {
  name: "d";
  defender: Player;
  switchPossession: true;
  endPoint: false;
}

export interface Callahan extends BaseAction {
  name: "callahan";
  defender: Player;
  switchPossession: false;
  endPoint: true;
}

export interface PullOb extends BaseAction {
  name: "pull ob";
  thrower: Player;
  switchPossession: false;
  endPoint: false;
}

export interface Stall extends BaseAction {
  name: "stall";
  thrower: Player;
  switchPossession: true;
  endPoint: false;
}

export interface Timeout extends BaseAction {
  name: "timeout";
  switchPossession: false;
  endPoint: false;
}

export interface Halftime extends BaseAction {
  name: "halftime";
  switchPossession: false;
  endPoint: false;
}

export interface GameOver extends BaseAction {
  name: "game over";
  switchPossession: false;
  endPoint: false;
}

export interface GameStart extends BaseAction {
  name: "game start";
  switchPossession: false;
  endPoint: false;
}
