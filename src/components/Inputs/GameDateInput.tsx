import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import { useState } from "react";
import {
  Platform,
  Pressable,
  StyleProp,
  Text,
  TextStyle,
  View,
} from "react-native";
import { Colors } from "../styles/global";
import { getDateTimeString } from "../utils/dates";

export default function GameDateInput({
  date,
  onChange,
  label,
  style,
}: {
  date: number;
  onChange: (date: number) => void;
  label: string;
  style?: StyleProp<TextStyle>;
}) {
  const [showPicker, setShowPicker] = useState(false);

  const handleDateChange = (
    event: DateTimePickerEvent,
    selectedDate?: Date,
  ) => {
    if (Platform.OS === "android") {
      setShowPicker(false);
    }

    if (selectedDate) {
      onChange(selectedDate.getTime());
    }
  };

  return (
    <View style={{ backgroundColor: Colors.surface }}>
      <View
        style={{
          padding: 8,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Text
          style={{
            fontSize: 20,
          }}
        >
          {label}
        </Text>
        <Pressable onPress={() => setShowPicker(!showPicker)}>
          <Text
            style={[
              style,
              {
                borderWidth: 2,
                padding: 2,
                borderRadius: 5,
                paddingLeft: 5,
                paddingRight: 5,
              },
            ]}
          >
            {getDateTimeString(date)}
          </Text>
        </Pressable>
      </View>
      {showPicker && (
        <DateTimePicker
          value={new Date(date)}
          mode="datetime"
          display={Platform.OS === "ios" ? "spinner" : "default"}
          onChange={handleDateChange}
        />
      )}
    </View>
  );
}
