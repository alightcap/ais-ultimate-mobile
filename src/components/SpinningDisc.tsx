import { DiscIcon } from "phosphor-react-native";
import { useEffect, useRef } from "react";
import { Animated, Easing } from "react-native";
import { Colors } from "../styles/global";

export default function SpinningDisc() {
  const spinValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const spinAnimation = Animated.loop(
      Animated.timing(spinValue, {
        toValue: 1,
        duration: 2000,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    );
    spinAnimation.start();
    return () => spinAnimation.stop();
  }, [spinValue]);

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  return (
    <Animated.View style={{ transform: [{ rotate: spin }] }}>
      <DiscIcon color={Colors.brandPrimary} weight="fill" size={100} />
    </Animated.View>
  );
}
