import {
  ActivityIndicator,
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import SearchBar from "../../components/SearchBar";
import { Images } from "../../constants";
import TypeItem from "../../components/TypeItem";
import dishes from "../../assets/data/dishes";
import ProductItem from "../../components/ProductItem";
import { Display } from "../../utils";
import colors from "../../constants/colors";
import { useEffect, useState } from "react";
import { getDishes } from "../../services/dishes";
import axios from "axios";
import InfinityScroll from "../../components/InfinityScroll";

const typeItems = [
  {
    text: "Rau củ",
    pathImage: Images.ICON_VEGETABLE,
    color: "#e6f2ea",
  },
  {
    text: "Trái cây",
    pathImage: Images.ICON_FRUIT,
    color: "#ffe9e5",
  },
  {
    text: "Đồ Uống",
    pathImage: Images.ICON_WATER,
    color: "#fff6e3",
  },
  {
    text: "Thực Phẩm",
    pathImage: Images.ICON_FOOD,
    color: "#f3effa",
  },
  {
    text: "Khác",
    pathImage: Images.ICON_OTHER,
    color: "#dcf4f5",
  },
];

const HomeScreen = ({ navigation }) => {
  return (
    <View
      style={{
        paddingVertical: 50,
        paddingHorizontal: 10,
        backgroundColor: "#f1eff1",
        flex: 1,
      }}
    >
      <SearchBar />
      <View style={{ paddingVertical: 20 }}>
        <Text style={styles.title}>Loại sản phẩm</Text>
        <ScrollView horizontal>
          {typeItems.map((item) => (
            <TypeItem
              key={item.text}
              text={item.text}
              pathImage={item.pathImage}
              color={item.color}
              navigation={navigation}
            />
          ))}
        </ScrollView>
      </View>
      <Text style={styles.title}>Sản phẩm nổi bật</Text>
      <InfinityScroll type={"all"} />
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontFamily: "inter_bold",
    fontSize: 18,
    paddingBottom: 20,
  },
});

export default HomeScreen;
