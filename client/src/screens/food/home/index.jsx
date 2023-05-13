import { ScrollView, StyleSheet, Text, View } from "react-native";
import { Images } from "../../../constants";
import { TypeItem, InfinityScroll, SearchBar } from "../../../components/food";

const typeItems = [
  {
    text: "rau củ",
    pathImage: Images.ICON_VEGETABLE,
    color: "#e6f2ea",
  },
  {
    text: "trái cây",
    pathImage: Images.ICON_FRUIT,
    color: "#ffe9e5",
  },
  {
    text: "đồ uống",
    pathImage: Images.ICON_WATER,
    color: "#fff6e3",
  },
  {
    text: "thực phẩm",
    pathImage: Images.ICON_FOOD,
    color: "#f3effa",
  },
  {
    text: "khác",
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
      <SearchBar navigation={navigation} />
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
      <InfinityScroll typeProduct={"all"} navigation={navigation} />
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
