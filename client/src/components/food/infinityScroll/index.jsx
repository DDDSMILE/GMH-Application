import { ActivityIndicator, FlatList, View } from "react-native";
import ProductItem from "../productItem";
import { useEffect, useState } from "react";
import { getDishes } from "../../../services/dishes";

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
    const timeoutId = setTimeout(() => {
      setDishes([]);
      getDishesPerPage();
    }, 1000);
    return () => {
      clearTimeout(timeoutId);
    };
  }, [minPrice, maxPrice, sortOrder, typeProduct]);

  return (
    <View
      style={{
        justifyContent: "center",
        alignItems: "center",
        paddingBottom: 50,
      }}
    >
      {dishes ? (
        <FlatList
          data={dishes}
          renderItem={({ item }) => (
            <ProductItem navigation={navigation} item={item} />
          )}
          keyExtractor={(item, key) => key}
          ListFooterComponent={renderLoader}
          onEndReached={loadMoreItem}
          onEndReachedThreshold={0}
        />
      ) : (
        <Text>Loading...</Text>
      )}
    </View>
  );
};

export default InfinityScroll;
