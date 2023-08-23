import { View, Text, StyleSheet, Button, Pressable } from "react-native";
import React from "react";
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

interface Props {
  frontData: Array<string>;
  backData: Array<string>;
}
const FlippableCard = (props: Props) => {
  const spin = useSharedValue<number>(0);
  const rStyle = useAnimatedStyle(() => {
    const spinVal = interpolate(spin.value, [0, 1], [0, 180]);
    return {
      transform: [
        {
          rotateY: withTiming(`${spinVal}deg`, { duration: 500 }),
        },
      ],
    };
  }, []);

  const bStyle = useAnimatedStyle(() => {
    const spinVal = interpolate(spin.value, [0, 1], [180, 360]);
    return {
      transform: [
        {
          rotateY: withTiming(`${spinVal}deg`, { duration: 500 }),
        },
      ],
    };
  }, []);
  return (
    <Pressable
      onPress={() => (spin.value = spin.value ? 0 : 1)}
      style={{ marginTop: 30, alignItems: "center" }}
    >
      <View>
        <Animated.View style={[styles.front, rStyle]}>
          {props.frontData.map((value, index) => {
            return <Text key={index}>{value}</Text>; // Display the value
          })}
        </Animated.View>
        <Animated.View style={[styles.back, bStyle]}>
          {props.backData.map((value, index) => {
            return <Text key={index}>{value}</Text>; // Display the value
          })}
        </Animated.View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  front: {
    height: 400,
    width: 250,
    backgroundColor: "#D8D9CF",
    borderRadius: 16,
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    backfaceVisibility: "hidden",
  },
  back: {
    height: 400,
    width: 250,
    backgroundColor: "#FF8787",
    borderRadius: 16,
    backfaceVisibility: "hidden",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default FlippableCard;
