import { FlatList, ScrollView, StyleSheet, Text, View } from "react-native";
import SearchBar from "../../components/SearchBar";
import { Images } from "../../constants";
import TypeItem from "../../components/TypeItem";
import dishes from "../../assets/data/dishes";
import ProductItem from "../../components/ProductItem";
import { Display } from "../../utils";
import colors from "../../constants/colors";

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
    <View
      style={{
        paddingVertical: 50,
        paddingHorizontal: 10,
        backgroundColor: "#f1eff1",
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
            />
          ))}
        </ScrollView>
      </View>
      <Text style={styles.title}>Sản phẩm nổi bật</Text>
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
        }}
      >
        <ScrollView>
          {dishes.map((dish) => (
            <ProductItem
              key={dish.id}
              name={dish.name}
              price={dish.price}
              photo={dish.photo}
            />
          ))}
        </ScrollView>
      </View>
      <View>
        <Text>Control</Text>
      </View>
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
