import Ionicons from "@expo/vector-icons/Ionicons";
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Player } from "../lib/types";
import { Colors, GlobalStyles } from "../styles/global";
import ActionButton from "./ActionButton";

export default function OffenseView({
  currentLine,
}: {
  currentLine: Player[];
}) {
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>();

  return (
    <View style={GlobalStyles.contentContainer}>
      <View style={{ height: 50 }}>
        <Text>headings go here</Text>
      </View>
      <View
        style={{ flexDirection: "row", borderWidth: 1, borderColor: "red" }}
      >
        <View
          style={{ flex: 5, borderWidth: 1, borderColor: "green", margin: 2 }}
        >
          <View
            style={{
              flexDirection: "row",
              height: 50,
            }}
          >
            <View
              style={{
                flex: 1.5,
                height: "100%",
                justifyContent: "center",
                padding: 2,
              }}
            >
              <Text style={{ textAlign: "right" }}>Player Name</Text>
            </View>
            <View
              style={{
                flex: 0.25,
                height: "100%",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Ionicons name="arrow-forward" />
            </View>
            <View
              style={{
                flex: 3,
                flexDirection: "row",
              }}
            >
              <ActionButton label="Catch" />
              <ActionButton label="Drop" />
              <ActionButton label="Goal" />
            </View>
          </View>
          <View
            style={{
              flexDirection: "row",
              height: 50,
            }}
          >
            <View
              style={{
                flex: 1.5,
                height: "100%",
                justifyContent: "center",
                padding: 2,
              }}
            >
              <Text style={{ textAlign: "right" }}>
                Really long Player Name
              </Text>
            </View>
            <View
              style={{
                flex: 0.25,
                height: "100%",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Ionicons name="arrow-forward" />
            </View>
            <View
              style={{
                flex: 3,
                borderWidth: 1,
                flexDirection: "row",
                height: "100%",
              }}
            >
              {/* <View
                style={{
                  flex: 1,
                  borderWidth: 1,
                  borderRadius: 4,
                  justifyContent: "center",
                  margin: 2,
                }}
              >
                <Text style={{ textAlign: "center" }}>Catch</Text>
              </View>
              <View
                style={{
                  flex: 1,
                  borderWidth: 1,
                  borderRadius: 4,
                  justifyContent: "center",
                  margin: 2,
                }}
              >
                <Text style={{ textAlign: "center" }}>Drop</Text>
              </View>
              <View
                style={{
                  flex: 1,
                  borderWidth: 1,
                  borderRadius: 4,
                  justifyContent: "center",
                  margin: 2,
                }}
              >
                <Text style={{ textAlign: "center" }}>Goal</Text>
              </View> */}
            </View>
          </View>
        </View>
        <View
          style={{
            borderWidth: 1,
            borderColor: "blue",
            flex: 1,
            margin: 2,
          }}
        >
          <Text style={{ textAlign: "center" }}>
            {"THROWAWAY".split("").join("\n")}
          </Text>
        </View>
      </View>
    </View>
    // <View style={{ alignItems: "center", width: "100%" }}>
    //   <View
    //     style={{
    //       flexDirection: "row",
    //       marginTop: 15,
    //     }}
    //   ></View>
    //   <View style={{ flexDirection: "row" }}>
    //     <View>
    //       {currentLine.map((p) => (
    //         <View style={styles.playerRow} key={p.id}>
    //           <Pressable
    //             onPress={() => setSelectedPlayer(p)}
    //             style={{ justifyContent: "flex-end" }}
    //           >
    //             <Text style={styles.playerText}>{p.name}</Text>
    //           </Pressable>
    //           <View style={{ marginHorizontal: 5 }}>
    //             <FontAwesome6 name="arrow-right-long" />
    //           </View>
    //           <View
    //             style={{
    //               flexDirection: "row",
    //               justifyContent: "flex-end",
    //               flex: 1,
    //             }}
    //           >
    //             {p !== selectedPlayer && (
    //               <View style={{ flexDirection: "row" }}>
    //                 <ActionButton label="Catch" />
    //                 <ActionButton label="Drop" />
    //                 <ActionButton label="Goal" />
    //               </View>
    //             )}
    //           </View>
    //         </View>
    //       ))}
    //     </View>
    //     <View
    //       style={[
    //         styles.fakeButton,
    //         {
    //           minWidth: 0,
    //           width: 60,
    //           marginVertical: 2,
    //           justifyContent: "center",
    //         },
    //       ]}
    //     >
    //       <Text
    //         style={{ textAlign: "center", color: "white", fontWeight: "600" }}
    //       >
    //         {"Throwaway".split("").join("\n")}
    //       </Text>
    //     </View>
    //   </View>
    // </View>
  );
}

const styles = StyleSheet.create({
  buttonText: {
    color: "white",
    textAlign: "center",
  },
  fakeButton: {
    backgroundColor: Colors.brandPrimary,
    padding: 8,
    paddingVertical: 12,
    borderRadius: 5,
    fontWeight: 600,
    marginHorizontal: 2,
    width: 60,
  },
  playerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    marginVertical: 2,
  },
  playerText: {
    textAlign: "right",
    color: Colors.brandPrimary,
    fontWeight: "900",
    fontSize: 16,
  },
});
