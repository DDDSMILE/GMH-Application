import { FlatList, StyleSheet, Text, View } from "react-native";
import React from "react";
import { BackButton, ButtonForm, HeaderPage } from "../../components/Form";
import CardItem from "../../components/CardItem";
import { Images } from "../../constants";
import { Display } from "../../utils";

const suggestionItem = [
  {
    text: "Đồ cay",
    pathImage: Images.DISH_SPICY,
    color: "#f18f43",
  },
  {
    text: "Rau củ",
    pathImage: Images.DISH_VEGETABLE,
    color: "#60c677",
  },
  {
    text: "Ít chất béo",
    pathImage: Images.DISH_LOW_FAT,
    color: "#05a5e5",
  },
  {
    text: "Nhiều đạm",
    pathImage: Images.DISH_FISH,
    color: "#f5bbb2",
  },
  {
    text: "Món chay",
    pathImage: Images.DISH_VEGA,
    color: "#d8ebca",
  },
  {
    text: "Món mặn",
    pathImage: Images.DISH_SALTY,
    color: "#f6d2aa",
  },
  {
    text: "Trái cây",
    pathImage: Images.DISH_VEGETABLE,
    color: "#ff5368",
  },
  {
    text: "Đồ ngọt",
    pathImage: Images.DISH_CAKE,
    color: "#f0d3f3",
  },
  {
    text: "Khác",
    color: "#b1b5b5",
  },
];

const SuggestionScreen = () => {
  return (
    <View>
      <HeaderPage>
        <BackButton />
        <View style={{ alignItems: "center", marginTop: 45 }}>
          <Text style={{ fontSize: 18, fontFamily: "inter_medium" }}>
            Hôm nay ăn gì
          </Text>
        </View>
      </HeaderPage>
      <View
        style={{
          paddingTop: 30,
          alignItems: "center",
        }}
      >
        <Text
          style={{
            fontFamily: "inter_semi_bold",
            fontSize: 18,
          }}
        >
          Hãy chọn theo sở thích của bạn
        </Text>
        <View
          style={{
            paddingTop: 10,
            alignItems: "center",
          }}
        >
          <FlatList
            data={suggestionItem}
            renderItem={({ item }) => (
              <CardItem
                text={item.text}
                pathImage={item.pathImage}
                color={item.color}
              />
            )}
            numColumns={2}
            keyExtractor={(item, index) => index}
          />
        </View>
      </View>
    </View>
  );
};

export default SuggestionScreen;
