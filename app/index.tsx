import React from "react";
import { Text, TextInput, View } from "react-native";

export default function Index() {
  const teamName = "AIS";
  const [date, onChangeDate] = React.useState("Date");
  const [opponentName, onChangeOpponentName] = React.useState("Opponent Name");
  const [ownScore, onChangeOwnScore] = React.useState("0");
  const [oppScore, onChangeOppScore] = React.useState("0");

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Submit {teamName} Game</Text>
      <View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Text style={{ marginRight: 5 }}>Date</Text>
          <TextInput
            onChangeText={onChangeDate}
            value={date}
            style={{ borderWidth: 1, padding: 10, borderRadius: 5 }}
          />
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Text style={{ marginRight: 5 }}>Opponent Name</Text>
          <TextInput
            onChangeText={onChangeOpponentName}
            value={opponentName}
            style={{ borderWidth: 1, padding: 10, borderRadius: 5 }}
          />
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Text style={{ marginRight: 5 }}>{teamName} Score</Text>
          <TextInput
            onChangeText={onChangeOwnScore}
            value={ownScore}
            style={{ borderWidth: 1, padding: 10, borderRadius: 5 }}
            keyboardType="numeric"
          />
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Text style={{ marginRight: 5 }}>Opponent Score</Text>
          <TextInput
            onChangeText={onChangeOppScore}
            value={oppScore}
            style={{ borderWidth: 1, padding: 10, borderRadius: 5 }}
            keyboardType="numeric"
          />
        </View>
      </View>
    </View>
  );
}
