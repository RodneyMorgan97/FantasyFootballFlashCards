import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import type { CardData } from "../../Interface";
import { useState, useEffect } from "react";
import FlippableCard from "../FlippableCard/FlippableCard";

interface FlashCardProps extends CardData {
  increment: () => void;
}
export default function FlashCard({
  name,
  positionalRanking,
  team,
  byeWeek,
  rank,
  increment,
}: FlashCardProps) {
  const showOnFront = {
    name: true,
    positionalRanking: false,
    team: false,
    byeWeek: false,
    rank: false,
  };

  const [imgURL, setImgURL] = useState("");

  const [frontCardData, setFrontCardData] = useState<Array<string> | undefined>(
    []
  );

  const [backCardData, setBackCardData] = useState<Array<string> | undefined>(
    []
  );

  useEffect(() => {
    getFrontCardData();
    getBackCardData();
    // getPlayerHeadshot();
  }, []);

  const formatNameForNFLURL = (name: string) => {
    // Convert the name to lowercase
    let formattedName = name.toLowerCase();

    // Replace spaces and apostrophes with dashes
    formattedName = formattedName.replace(/[\s']/g, "-");

    return formattedName;
  };

  const getPlayerHeadshot = async () => {
    const response = await fetch(
      `https://www.nfl.com/players/${formatNameForNFLURL(name)}`,
      {
        headers: {
          Accept: "text/html",
        },
      }
    );

    const content = await response.text();

    const pattern = /\/t_headshot_desktop\/league\/(\w+)/;
    const matches = content.match(pattern);

    let filename = "";
    let url = "";
    if (matches && matches[1]) {
      filename = matches[1];
    }

    if (filename != "") {
      url = `https://static.www.nfl.com/image/private/t_headshot_desktop/league/${filename}`;
      setImgURL(url);
      console.log(url);
    }
  };

  const getFrontCardData = () => {
    let renderList: Array<string> = [];

    // get keys that match the side of the card that is showing
    for (const key in showOnFront) {
      if (showOnFront[key as keyof typeof showOnFront] === true) {
        const propValue = { name, positionalRanking, team, byeWeek, rank }[
          key as keyof CardData
        ];
        renderList.push(String(propValue));
      }
    }

    setFrontCardData(renderList);
  };

  const getBackCardData = () => {
    let renderList: Array<string> = [];

    // get keys that match the side of the card that is showing
    for (const key in showOnFront) {
      if (showOnFront[key as keyof typeof showOnFront] === false) {
        const propValue = { name, positionalRanking, team, byeWeek, rank }[
          key as keyof CardData
        ];
        renderList.push(String(propValue));
      }
    }

    setBackCardData(renderList);
  };
  // define styles for the flash card
  const styles = StyleSheet.create({
    cardContainer: {
      width: "80%",
      height: "20%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      borderWidth: 2,
      borderColor: "black",
    },
    innerTextData: {
      display: "flex",
      borderWidth: 1,
      borderColor: "green",
    },
  });

  return (
    // <TouchableOpacity style={styles.cardContainer} onPress={flipCard}>
    //   <View style={styles.innerTextData}>
    //     {imgURL != "" ?? (
    //       <View>
    //         <Image
    //           source={{ uri: imgURL }}
    //           alt="icons"
    //           style={{ width: 100, height: 100 }}
    //         />
    //       </View>
    //     )}
    //     {showCardData()}
    //   </View>
    // </TouchableOpacity>
    <View>
      {Array.isArray(frontCardData) && Array.isArray(backCardData) ? (
        <View>
          <FlippableCard frontData={frontCardData} backData={backCardData} />
        </View>
      ) : (
        <Text>Loading!!!</Text>
      )}
    </View>
  );
}
