import BigButton from "@/src/components/BigButton";
import EditButton from "@/src/components/EditButton";
import HalfTimeToggle from "@/src/components/HalfTimeToggle";
import HardCapPicker from "@/src/components/HardCapInput";
import PointCapToggle from "@/src/components/PointCapToggle";
import ScoreBoard from "@/src/components/ScoreBoard";
import StartOnToggle from "@/src/components/StartingOnToggle";
import { useData } from "@/src/contexts/DataContext";
import { HalfTimeMode, StartingOnMode } from "@/src/lib/types";
import { Colors, GlobalStyles } from "@/src/styles/global";
import { getDateTimeString } from "@/src/utils/dates";
import Ionicons from "@expo/vector-icons/Ionicons";
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { useCallback, useMemo, useRef, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

export default function GameIndex() {
  const router = useRouter();
  const { games, teams, updateGame } = useData();
  const { gameId } = useLocalSearchParams<{ gameId: string }>();

  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ["40%"], []);
  const openSheet = () => bottomSheetRef.current?.expand();
  const closeSheet = () => bottomSheetRef.current?.close();

  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
        opacity={0.5}
      />
    ),
    [],
  );

  const currentGame = games.find((g) => g.id === gameId);

  const currentTeam = teams.find((t) => t.id === currentGame?.teamId);

  const [startingOn, setStartingOn] = useState<StartingOnMode>(
    currentGame?.startingOn ?? "offense",
  );
  const [pointCap, setPointCap] = useState<number>(currentGame?.pointCap ?? 13);
  const [hardCap, setHardCap] = useState<number>(currentGame?.hardCap ?? 75);
  const [halfAt, setHalfAt] = useState<HalfTimeMode>(
    currentGame?.halfAt ?? "points",
  );

  if (!currentGame) return;

  const { timeStamp, eventName, opponentName } = currentGame;

  const handleStartingOnChange = async (newMode: StartingOnMode) => {
    setStartingOn(newMode);

    await updateGame({
      ...currentGame!,
      startingOn: newMode,
    });
  };

  const handlePointCapChange = async (newPointCap: number) => {
    setPointCap(newPointCap);
    await updateGame({ ...currentGame!, pointCap: newPointCap });
  };

  const handleHardCapChange = async (newHardCap: number) => {
    setHardCap(newHardCap);
    await updateGame({ ...currentGame!, hardCap: newHardCap });
  };

  const handleHalfAtChange = async (newHalfAt: HalfTimeMode) => {
    setHalfAt(newHalfAt);
    await updateGame({ ...currentGame!, halfAt: newHalfAt });
  };

  return (
    <View style={GlobalStyles.container}>
      <Stack.Screen
        options={{
          headerRight: () => (
            <EditButton
              route={{
                pathname: "/games/[gameId]/editGame",
                params: { gameId: gameId },
              }}
            />
          ),
        }}
      />
      <View style={GlobalStyles.titleContainer}>
        <Text style={GlobalStyles.headingText}>{currentTeam!.name}</Text>
        <ScoreBoard
          ourScore={currentGame.ourScore}
          theirScore={currentGame.ourScore}
          style={[GlobalStyles.headingText, { color: "white" }]}
        />
      </View>
      <View style={GlobalStyles.contentContainer}>
        <View style={styles.rowItem}>
          <Text style={styles.itemHeadingText}>Date</Text>
          <Text style={styles.itemText}>{getDateTimeString(timeStamp)}</Text>
        </View>
        <View style={styles.rowItem}>
          <Text style={styles.itemHeadingText}>Opponent</Text>
          <Text style={styles.itemText}>{opponentName}</Text>
        </View>
        <View style={styles.rowItem}>
          <Text style={styles.itemHeadingText}>Event</Text>
          <Text>{eventName}</Text>
        </View>
        <View style={styles.rowItem}>
          <Text style={styles.itemHeadingText}>Weather</Text>
          <Text>weatherKit</Text>
        </View>
        <Pressable
          onPress={() =>
            router.push({
              pathname: "../teams/[teamId]/roster",
              params: { teamId: currentTeam!.id },
            })
          }
        >
          <View style={styles.rowItem}>
            <Text style={styles.itemHeadingText}>Roster</Text>
            <Ionicons name="chevron-forward" size={20} color="black" />
          </View>
        </Pressable>
        <View style={styles.rowItem}>
          <Text style={styles.itemHeadingText}>Statistics</Text>
          <Text>Nav Arrow</Text>
        </View>
        <View style={styles.rowItem}>
          <Text style={styles.itemHeadingText}>Recap</Text>
          <Text>Nav Arrow</Text>
        </View>
        <View style={GlobalStyles.titleContainer}>
          <Text style={GlobalStyles.headingText}>Settings</Text>
        </View>
        <View style={styles.rowItem}>
          <Text style={styles.itemHeadingText}>Starting on</Text>
          <StartOnToggle
            currentMode={startingOn}
            onModeChange={handleStartingOnChange}
            style={styles.itemText}
          />
        </View>
        <View style={styles.rowItem}>
          <Text style={styles.itemHeadingText}>Point Cap</Text>
          <PointCapToggle
            currentPointCap={pointCap}
            onPointCapChange={handlePointCapChange}
            style={styles.itemText}
          />
        </View>
        <View>
          <Pressable onPress={openSheet} style={styles.rowItem}>
            <Text style={styles.itemHeadingText}>Time Cap</Text>
            <Text style={[styles.itemText, styles.interactiveText]}>
              {hardCap} min
            </Text>
          </Pressable>
        </View>
        <View style={styles.rowItem}>
          <Text style={styles.itemHeadingText}>Half At</Text>
          <HalfTimeToggle
            currentHalfTimeMode={halfAt}
            onHalfTimeModeChange={handleHalfAtChange}
            style={styles.itemText}
          />
        </View>
        {/* <View style={styles.rowItem}>
        <Text style={styles.itemHeadingText}>Timeouts</Text>
        <Text>per half/floaters/taken</Text>
      </View> */}
      </View>
      <BigButton
        title="Action"
        onPress={() =>
          router.push({
            pathname: "/games/[gameId]/action",
            params: { gameId: gameId },
          })
        }
      />

      <BottomSheet
        ref={bottomSheetRef}
        index={-1}
        snapPoints={snapPoints}
        enablePanDownToClose
        backdropComponent={renderBackdrop}
        backgroundStyle={{ backgroundColor: Colors.surface }}
        handleIndicatorStyle={{ backgroundColor: Colors.border }}
      >
        <BottomSheetView style={styles.sheetContent}>
          <View style={styles.sheetHeader}>
            <Text style={styles.sheetTitle}>Set Hard Cap</Text>
            <Pressable onPress={closeSheet}>
              <Text style={{ color: Colors.brandPrimary, fontWeight: "bold" }}>
                Done
              </Text>
            </Pressable>
          </View>
          <HardCapPicker value={hardCap} onValueChange={handleHardCapChange} />
        </BottomSheetView>
      </BottomSheet>
    </View>
  );
}

const styles = StyleSheet.create({
  rowItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 6,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
    alignItems: "center",
    backgroundColor: Colors.surface,
    minHeight: 40,
  },
  itemText: {
    fontSize: 19,
  },
  interactiveText: {
    backgroundColor: Colors.brandPrimary,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    color: Colors.white,
    padding: 4,
    paddingHorizontal: 8,
    borderRadius: 5,
    fontWeight: "600",
  },
  scoreText: {
    fontSize: 19,
  },
  itemHeadingText: {
    fontWeight: "bold",
    fontSize: 18,
  },
  sheetContent: {
    padding: 20,
    alignItems: "center",
  },
  sheetHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 20,
  },
  sheetTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
});
