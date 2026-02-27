// import { teams } from "@/src/lib/placeholder-data";
import { Link } from "expo-router";
import React from "react";
import { FlatList, Text, View } from "react-native";
import { useTeams } from "./_layout";
type TeamProps = { teamName: string };

// replace this with a link to the team page
const Team = ({ teamName }: TeamProps) => (
  <View
    style={{
      flexDirection: "row",
      justifyContent: "space-between",
      padding: 10,
      margin: 5,
      backgroundColor: "skyblue",
    }}
  >
    <Text style={{ fontSize: 20 }}>{teamName}</Text>
    <Text style={{ fontSize: 20 }}>{">"}</Text>
  </View>
);

export default function Index() {
  const { teamList } = useTeams();
  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <View style={{ flex: 1 }}>
        <FlatList
          data={teamList}
          renderItem={({ item }) => <Team teamName={item.teamName} />}
          // keyExtractor={(item) => item.id}
        />
      </View>
      <Link
        href="/newTeam"
        style={{
          textAlign: "center",
          fontSize: 18,
          backgroundColor: "skyblue",
          margin: 20,
          padding: 20,
        }}
      >
        New Team
      </Link>
    </View>
  );
}
