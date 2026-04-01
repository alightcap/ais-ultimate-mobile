import { View } from "react-native";
import { DefensePlayerProps, OffensePlayerProps } from "../../lib/types";
import DefensePlayerCard from "./DefensePlayerCard";
import OffensePlayerCard from "./OffensePlayerCard";

export default function GameActionPlayerCard({
  playerProps,
  situation,
}: {
  playerProps: OffensePlayerProps | DefensePlayerProps;
  situation: "offense" | "defense";
}) {
  return (
    <View>
      {(() => {
        switch (situation) {
          case "offense":
            return (
              <OffensePlayerCard
                playerProps={playerProps as OffensePlayerProps}
              />
            );
          case "defense":
            return (
              <DefensePlayerCard
                playerProps={playerProps as DefensePlayerProps}
              />
            );
        }
      })()}
    </View>
  );
}
