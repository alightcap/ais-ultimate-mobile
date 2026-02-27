import { Dispatch, SetStateAction } from "react";

export interface Team {
  id: number;
  teamName: string;
}

export interface TeamContextType {
  teamList: Team[];
  setTeamList: Dispatch<SetStateAction<Team[]>>;
}

export interface TextInputFormRowProps {
  title: string;
  item: string;
  setItem: (text: string) => void;
}
