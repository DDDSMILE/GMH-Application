import { FlatList, ScrollView, StyleSheet, Text, View } from "react-native";
import SearchBar from "../../components/SearchBar";
import { Images } from "../../constants";
import TypeItem from "../../components/TypeItem";
import dishes from "../../assets/data/dishes";
import ProductItem from "../../components/ProductItem";

const typeItems = [
  {
    text: "Rau, củ",
    pathImage: Images.ICON_VEGETABLE,
    color: "#e6f2ea",
  },
  {
    text: "Trái cây",
    pathImage: Images.ICON_FRUIT,
    color: "#ffe9e5",
  },
  {
    text: "Nước",
    pathImage: Images.ICON_WATER,
    color: "#fff6e3",
  },
  {
    text: "Thực phẩm",
    pathImage: Images.ICON_FOOD,
    color: "#f3effa",
  },
  {
    text: "Khác",
    pathImage: Images.ICON_OTHER,
    color: "#dcf4f5",
  },
];

const Home = () => {
  return (
    <View style={{ paddingVertical: 20, paddingHorizontal: 10 }}>
      <SearchBar />
      <View>
        <Text style={styles.title}>Loại sản phẩm</Text>
        <ScrollView horizontal={true}>
          {typeItems.map((item) => (
            <TypeItem
              key={item.text}
              text={item.text}
              pathImage={item.pathImage}
              color={item.color}
            />
          ))}
        </ScrollView>
      </View>
      <Text style={styles.title}>Sản phẩm nổi bật</Text>

      <ScrollView horizontal={true}>
        {dishes?.map((dish, index) => {
          <ProductItem
            key={index}
            name={dish.name}
            price={dish.price}
            photo={dish.photo}
          />;
        })}
      </ScrollView>
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

export default Home;
