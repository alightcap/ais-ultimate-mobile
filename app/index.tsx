import React from "react";
import { FlatList, Text, View } from "react-native";
import { teams } from "@/src/lib/placeholder-data";

type TeamProps = { teamName: string };

const Team = ({ teamName }: TeamProps) => (
  <Text style={{ padding: 5, backgroundColor: "skyblue" }}>{teamName}</Text>
);

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <FlatList
        data={teams}
        renderItem={({ item }) => <Team teamName={item.teamName} />}
        // keyExtractor={(item) => item.id}
      />
    </View>
  );
}
