import { useRouter } from "expo-router";
import { Pressable } from "react-native";
import { Team } from "../lib/types";
import NavCard from "./NavCard";

export default function TeamCard({ team }: { team: Team }) {
  const router = useRouter();

  return (
    <Pressable onPress={() => router.push(`/team/${team.id}`)}>
      <NavCard title={team.name} />
    </Pressable>
  );
}
