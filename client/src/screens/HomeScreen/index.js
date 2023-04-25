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

const HomeScreen = () => {
  const [dishes, setDishes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const getDishesPerPage = async () => {
    setIsLoading(true);
    try {
      const { data } = await axios.get(
        `http://10.0.2.2:3001/api/v1/dishes/type=all/page/${currentPage}/min=&max=/sort=`
      );
      setDishes([...dishes, ...data.dishes]);
      setIsLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  const renderLoader = () => {
    return isLoading ? (
      <View style={styles.loaderStyle}>
        <ActivityIndicator size="large" color="#aaa" />
      </View>
    ) : null;
  };

  const loadMoreItem = () => {
    setCurrentPage(currentPage + 1);
  };

  useEffect(() => {
    getDishesPerPage();
  }, [currentPage]);

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
            />
          ))}
        </ScrollView>
      </View>
      <Text style={styles.title}>Sản phẩm nổi bật</Text>
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          paddingBottom: 50,
        }}
      >
        <FlatList
          data={dishes}
          renderItem={({ item }) => <ProductItem item={item} />}
          keyExtractor={(item, key) => key}
          ListFooterComponent={renderLoader}
          onEndReached={loadMoreItem}
          onEndReachedThreshold={0}
        />
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

export default HomeScreen;
