import { ActivityIndicator, FlatList, View, Text } from "react-native";
import ProductItem from "../productItem";
import { useEffect, useState } from "react";
import { getDishes } from "../../../services/dishes";
import { Ionicons } from "@expo/vector-icons";

const InfinityScroll = (props) => {
  const {
    typeProduct,
    searchText = "",
    minPrice = "",
    maxPrice = "",
    sortOrder = "",
    navigation,
  } = props;
  const [dishes, setDishes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const getDishesPerPage = async () => {
    setIsLoading(true);
    try {
      let data = [];
      data = await getDishes({
        typeProduct,
        currentPage,
        searchText,
        minPrice,
        maxPrice,
        sortOrder,
      });
      setDishes([...dishes, ...data.dishes]);
      setIsLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  const renderLoader = () => {
    return isLoading ? (
      <View>
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

  useEffect(() => {
    setDishes([]);
    getDishesPerPage();
  }, [minPrice, maxPrice, sortOrder, typeProduct, searchText]);

  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setDishes([]);
    getDishesPerPage();
    setIsRefreshing(false);
  };

  return (
    <View
      style={{
        justifyContent: "center",
        alignItems: "center",
        height: 600,
      }}
    >
      {dishes.length > 0 ? (
        <FlatList
          data={dishes}
          renderItem={({ item }) => (
            <ProductItem navigation={navigation} item={item} />
          )}
          keyExtractor={(item, key) => key}
          ListFooterComponent={renderLoader}
          onEndReached={loadMoreItem}
          onEndReachedThreshold={0}
          onRefresh={handleRefresh}
          refreshing={isRefreshing}
        />
      ) : (
        <View
          style={{ flex: 0.85, justifyContent: "center", alignItems: "center" }}
        >
          <Ionicons name="ios-warning-outline" size={28} color="#000" />
          <Text
            style={{
              fontSize: 14,
              fontFamily: "inter_medium",
              color: "#000",
              marginTop: 4,
            }}
          >
            Không tồn tại sản phẩm "{searchText}"
          </Text>
        </View>
      )}
    </View>
  );
};

export default InfinityScroll;
