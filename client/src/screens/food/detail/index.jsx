import { View, Text, StyleSheet, ScrollView, Image } from "react-native";
import { HeaderPage, BackButton, ButtonForm } from "../../../components/form";
import { getSupplier } from "../../../services/suppliers";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addItem } from "../../../store/order.slice";
import { VNDCurrencyFormatting } from "../../../utils";

const DetailScreen = ({ route, navigation }) => {
  const dispatch = useDispatch();
  const { item } = route.params;
  const [restaurant, setRestaurant] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await getSupplier({ name_supplier: item.name_supplier });
      setRestaurant(data[0]);
    };
    fetchData();
  }, []);

  const handleAddToOrder = () => {
    const { address } = restaurant;
    const createOrder = {
      item: { ...item, addressItem: address },
    };
    dispatch(addItem(createOrder));
    navigation.goBack();
  };

  return (
    <View>
      <HeaderPage>
        <BackButton onPress={() => navigation.goBack()} />
        <View style={{ alignItems: "center", marginTop: 45 }}>
          <Text style={{ fontSize: 18, fontFamily: "inter_medium" }}>
            Thông tin sản phẩm
          </Text>
        </View>
      </HeaderPage>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <Image
            style={{ width: 120, aspectRatio: 1 }}
            resizeMode="cover"
            source={{ uri: item.photo }}
          />
        </View>
        <View>
          <Text>{item.type}</Text>
          <Text>{item.name}</Text>
          <Text>{item.name_supplier}</Text>
          <Text>{VNDCurrencyFormatting(item.price)}</Text>
        </View>
        <View>
          <Image
            style={{ width: 120, aspectRatio: 1 }}
            resizeMode="cover"
            source={{ uri: restaurant.photo }}
          />
          <Text>{restaurant.name}</Text>
          <Text>{restaurant.address}</Text>
          <Text>{restaurant.open_time}</Text>
        </View>
        <View>
          <ButtonForm text={"Thêm vào giỏ"} onPress={handleAddToOrder} />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 3,
    marginBottom: 15,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    padding: 15,
  },
});

export default DetailScreen;
