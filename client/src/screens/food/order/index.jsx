import { useEffect } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {
  decreaseItem,
  increaseItem,
  removeItem,
} from "../../../store/order.slice";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { OrderResumeCTA } from "../../../components/food";
import { BackButton, HeaderPage } from "../../../components/form";
import { VNDCurrencyFormatting } from "../../../utils";

const OrderScreen = ({ navigation }) => {
  const { items, total, addresses } = useSelector((state) => state.order);

  useEffect(() => {
    if (items.length === 0) navigation.goBack();
  }, [items]);

  return (
    <View style={styles.container}>
      <HeaderPage>
        <BackButton onPress={() => navigation.goBack()} />
        <View style={{ alignItems: "center", marginTop: 45 }}>
          <Text style={{ fontSize: 18, fontFamily: "inter_medium" }}>
            Giỏ hàng
          </Text>
        </View>
      </HeaderPage>
      <FlatList
        data={items}
        renderItem={({ item }) => <OrderItem item={item} />}
        keyExtractor={(item) => item.item.name}
        ListEmptyComponent={() => (
          <Text style={styles.emptyText}>Your order is empty</Text>
        )}
        showsVerticalScrollIndicator={false}
        style={styles.orderList}
      />

      <OrderResumeCTA
        text="Sản phẩm đã thêm"
        total={total}
        navigateTo="checkout"
        itemsLength={items.length}
      />
    </View>
  );
};

const OrderItem = ({ item }) => {
  const dispatch = useDispatch();

  return (
    <View style={styles.orderItem}>
      <Image
        style={styles.orderItemImg}
        resizeMode="cover"
        source={{ uri: item.item.photo }}
      />
      <View style={styles.orderItemData}>
        <View style={styles.orderItemDataHeading}>
          <Text style={styles.orderItemDataHeadingText}>
            {item.qty} x {item.item.name}
          </Text>
          <Text style={styles.orderItemDataHeadingPrice}>
            {VNDCurrencyFormatting(item.item.price)}
          </Text>
        </View>
        <View style={styles.orderItemDataActions}>
          <View style={styles.orderItemIncDec}>
            <TouchableOpacity
              onPress={() =>
                dispatch(
                  decreaseItem({
                    item: item.item,
                  })
                )
              }
            >
              <View style={styles.orderItemDecBtn}>
                <Text style={styles.orderItemDecText}>-</Text>
              </View>
            </TouchableOpacity>
            <Text style={styles.orderItemIncDecQty}>{item.qty}</Text>
            <TouchableOpacity
              onPress={() => dispatch(increaseItem({ item: item.item }))}
            >
              <View style={styles.orderItemIncBtn}>
                <Text style={styles.orderItemIncText}>+</Text>
              </View>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            onPress={() =>
              dispatch(
                removeItem({
                  item: item.item,
                  name: item.item.name,
                })
              )
            }
          >
            <MaterialCommunityIcons
              name="trash-can-outline"
              size={22}
              color="#000"
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default OrderScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 10,
  },
  orderList: {
    marginBottom: 105,
  },
  orderItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 22,
  },
  orderItemImg: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 18,
  },
  orderItemData: {
    flex: 1,
  },
  orderItemDataHeading: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
  },
  orderItemDataHeadingText: {
    fontSize: 14,
    fontFamily: "inter_medium",
    color: "#000",
  },
  orderItemDataHeadingPrice: {
    fontSize: 14,
    fontFamily: "inter_medium",
    color: "#000",
  },
  orderItemDataActions: {
    flexDirection: "row",
    alignItems: "center",
  },
  orderItemIncDec: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 32,
  },
  orderItemDecBtn: {
    alignItems: "center",
    justifyContent: "center",
    borderColor: "#000",
    borderWidth: 1,
    width: 24,
    height: 24,
  },
  orderItemDecText: {
    fontSize: 18,
    fontFamily: "inter_medium",
    color: "#000",
  },
  orderItemIncDecQty: {
    fontSize: 16,
    fontFamily: "inter_medium",
    color: "#000",
    marginHorizontal: 12,
  },
  orderItemIncBtn: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#000",
    borderColor: "#000",
    borderWidth: 1,
    width: 24,
    height: 24,
  },
  orderItemIncText: {
    fontSize: 14,
    fontFamily: "inter_medium",
    color: "#fff",
  },
});
