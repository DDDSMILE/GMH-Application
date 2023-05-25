import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import { HeaderPage, BackButton, ButtonForm } from "../../../components/form";
import { getSupplier } from "../../../services/suppliers";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addItem } from "../../../store/order.slice";
import { VNDCurrencyFormatting } from "../../../utils";
import colors from "../../../constants/colors";

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

      <ScrollView showsVerticalScrollIndicator={false} style={{ padding: 15 }}>
        <View style={styles.foodItem}>
          <Image
            style={styles.foodItemImg}
            resizeMode="cover"
            source={{ uri: item.photo }}
          />
        </View>
        <View style={styles.foodItemData}>
          <Text style={styles.foodItemDataHeadingText}>{item.name}</Text>
          <Text style={styles.foodItemDataHeadingPrice}>
            Giá: {VNDCurrencyFormatting(item.price)}
          </Text>
        </View>
        <View style={styles.supplierItemContainer}>
          <View>
            <Text style={styles.supplierItemName}>Thông tin chi tiết: </Text>
          </View>
          <View style={styles.supplierItem}>
            <Image
              style={styles.foodItemImg}
              resizeMode="cover"
              source={{ uri: restaurant.photo }}
            />
            <View style={styles.supplierItemData}>
              <View style={styles.supplierItemList}>
                <Text style={styles.supplierItemDetail}>Tên nhà cung cấp</Text>
                <Text>{restaurant.name}</Text>
              </View>
              <View style={styles.supplierItemList}>
                <Text style={styles.supplierItemDetail}>Địa chỉ</Text>
                <Text>{restaurant.address}</Text>
              </View>
              <View style={styles.supplierItemList}>
                <Text style={styles.supplierItemDetail}>Thời gian mở cửa</Text>
                <Text>{restaurant.open_time}</Text>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.logoutContainer}>
          <TouchableOpacity onPress={handleAddToOrder}>
            <View style={styles.logoutBtn}>
              <Text style={styles.logoutText}>Thêm vào giỏ</Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  foodItem: {
    margin: 3,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  },
  foodItemImg: {
    width: 150,
    height: 150,
    borderRadius: 8,
  },
  foodItemData: {
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
  },
  foodItemDataHeadingText: {
    fontSize: 16,
    fontFamily: "inter_semi_bold",
    color: "#000",
  },
  foodItemDataHeadingPrice: {
    fontSize: 14,
    fontFamily: "inter_medium",
    color: colors.GRAY_VARIANT,
  },
  supplierItemContainer: {
    paddingTop: 12,
    borderTopWidth: 3,
    borderTopColor: colors.GRAY,
    display: "flex",
    justifyContent: "center",
  },
  supplierItem: {
    margin: 3,
    flexDirection: "row",
    flex: 5,
  },
  supplierItemData: {
    paddingLeft: 20,
    display: "flex",
    flex: 5,
  },
  supplierItemName: {
    fontSize: 16,
    fontFamily: "inter_semi_bold",
    color: "#000",
  },
  supplierItemDetail: {
    fontSize: 14,
    fontFamily: "inter_semi_bold",
    color: colors.GRAY_VARIANT,
  },
  supplierItemList: {
    marginBottom: 5,
  },
  logoutContainer: {
    paddingTop: 15,
  },
  logoutBtn: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    paddingVertical: 16,
    backgroundColor: colors.GREEN_LOGO_TWO,
    borderRadius: 4,
  },
  logoutText: {
    fontSize: 14,
    fontFamily: "inter_medium",
    color: "#fff",
  },
});

export default DetailScreen;
