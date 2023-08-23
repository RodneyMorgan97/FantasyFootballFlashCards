import { StatusBar } from "expo-status-bar";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { useState } from "react";
import FlashCard from "./components/FlashCard/FlashCard";
import { CardData } from "./Interface";
import playersData from "./extracted_players.json";

export default function App() {
  const [shownCard, setShownCard] = useState(0);

  const showNextCard = () => {
    setShownCard((prev) => {
      if (prev < playersData.length) return prev + 1;
      else return 0;
    });
  };

  return (
    <View style={styles.container}>
      <FlashCard {...playersData[shownCard]} increment={showNextCard} />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
