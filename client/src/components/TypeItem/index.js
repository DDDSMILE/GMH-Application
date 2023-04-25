import { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet, ActivityIndicator } from "react-native";
import axios from "axios";

const TypeItem = ({ text, pathImage, color }) => {
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
        margin: 2,
        padding: 2,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <View backgroundColor={color} style={styles.content}>
        {pathImage && <Image source={pathImage} />}
      </View>
      <Text style={{ fontFamily: "inter_medium", color: "#868889" }}>
        {text}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  content: {
    width: 60,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
  },
});

export default TypeItem;
