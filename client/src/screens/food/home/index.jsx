import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Images } from "../../../constants";
import { TypeItem, InfinityScroll, SearchBar } from "../../../components/food";
import { useSelector } from "react-redux";
import { Fontisto } from "@expo/vector-icons";
import colors from "../../../constants/colors";

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
  const { items: orderItems, total: orderTotal } = useSelector(
    (state) => state.order
  );

  const handlePlaceOrder = () => navigation.navigate("order");

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
      {orderItems.length > 0 && (
        <View style={styles.placeOrderContainer}>
          <View style={styles.placeOrderPrice}>
            <Fontisto
              name="shopping-bag"
              size={18}
              color={colors.GREEN_LOGO_TWO}
            />
            <Text style={styles.placeOrderPriceText}>
              {orderTotal.toLocaleString("vi", {
                style: "currency",
                currency: "VND",
              })}
            </Text>
          </View>
          <TouchableOpacity onPress={handlePlaceOrder}>
            <View style={styles.placeOrderCTA}>
              <Text style={styles.placeOrderCTAText}>Xem giỏ hàng</Text>
              <View style={styles.placeOrderCTAQty}>
                <Text style={styles.placeOrderCTAQtyText}>
                  {orderItems.length}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontFamily: "inter_bold",
    fontSize: 18,
    paddingBottom: 20,
  },
  placeOrderContainer: {
    position: "absolute",
    bottom: 20,
    left: 10,
    right: 10,
    backgroundColor: "#fff",
    padding: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4.59,
    elevation: 5,
    borderRadius: 10,
  },
  placeOrderPrice: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 6,
  },
  placeOrderPriceText: {
    fontSize: 14,
    fontFamily: "inter_semi_bold",
    color: "#000",
    marginLeft: 12,
  },
  placeOrderCTA: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.GREEN_LOGO_TWO,
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 10,
  },
  placeOrderCTAText: {
    fontSize: 14,
    fontFamily: "inter_semi_bold",
    color: "#fff",
    marginRight: 12,
  },
  placeOrderCTAQty: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.GREEN_LOGO_ONE,
    padding: 1,
    width: 20,
    height: 20,
    borderRadius: 4,
  },
  placeOrderCTAQtyText: {
    fontSize: 12,
    fontFamily: "inter_semi_bold",
    color: "#fff",
  },
});

export default HomeScreen;
