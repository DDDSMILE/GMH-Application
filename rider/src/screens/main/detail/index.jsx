import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { BackButton, HeaderPage } from "../../../components/form";
import { VNDCurrencyFormatting, VNDFormattedDate } from "../../../utils";
import colors from "../../../constants/colors";
import { useDispatch, useSelector } from "react-redux";
import { acceptOrder } from "../../../services/orders";
import { useEffect, useState } from "react";
import { getUser } from "../../../services/user";

const DetailScreen = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { order } = route.params;
  const [client, setClient] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      const { data } = await getUser(order.userId);
      setClient(data);
    };
    fetchUser();
  }, []);

  const handleAcceptOrder = async () => {
    const newOrder = {
      shipperId: user._id,
      orderId: order._id,
    };
    await acceptOrder(newOrder);
    Alert.alert(
      "Đặt hàng thành công!",
      "Đơn hàng của bạn đang được chuẩn bị, bạn có muốn kiếm tra lại?",
      [
        {
          text: "Xem đơn hàng",
          onPress: () => navigation.navigate("orders", { screen: "home" }),
        },
        { text: "Đóng" },
      ],
      { userInterfaceStyle: "light" }
    );
  };

  // Chuyển đổi từ độ sang radian
  const toRad = (value) => {
    return (value * Math.PI) / 180;
  };

  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const earthRadius = 6371; // Đường kính trái đất (đơn vị: km)

    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRad(lat1)) *
        Math.cos(toRad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    const distance = earthRadius * c;
    return distance;
  };
  const distancePersonAToPersonB = calculateDistance(
    client.lat,
    client.lng,
    user.lat,
    user.lng
  );

  return (
    <View style={styles.container}>
      <HeaderPage>
        <BackButton onPress={() => navigation.goBack()} />
        <View style={{ alignItems: "center", marginTop: 45 }}>
          <Text style={{ fontSize: 18, fontFamily: "inter_medium" }}>
            Đơn hàng
          </Text>
        </View>
      </HeaderPage>
      <ScrollView style={styles.order} showsVerticalScrollIndicator={false}>
        {/* Address */}
        <View style={styles.addressContainer}>
          <Text style={styles.addressTitle}>Địa chỉ nơi cung cấp</Text>

          <View style={styles.addressSelected}>
            <View style={styles.addressSelectedData}>
              {order.products.map((product, index) => (
                <View key={index} style={{ paddingBottom: 4 }}>
                  <View style={styles.addressSelectedRight}>
                    <View style={styles.addressSelectedTag}>
                      <Text style={styles.addressSelectedTagText}>
                        Địa chỉ {index + 1}
                      </Text>
                    </View>
                  </View>
                  <Text style={styles.addressSelectedStreet}>
                    {product.addressItem.name_address}
                  </Text>
                  <View style={styles.productSelectedTag}>
                    <Text style={styles.productSelectedTagText}>
                      Sản phẩm cần mua
                    </Text>
                  </View>
                  {product.addressItem.goods.map((item, index) => (
                    <Text style={styles.productSelectedStreet} key={index}>
                      {item.item.name} x {item.qty}
                    </Text>
                  ))}
                </View>
              ))}
            </View>
          </View>
        </View>

        {/* Payment Method */}
        <View>
          <View>
            <View style={styles.paymentContainer}>
              <View style={styles.paymentOption}>
                <MaterialCommunityIcons
                  name="credit-card-outline"
                  size={24}
                  color={colors.GREEN_LOGO_TWO}
                />
                <Text style={styles.paymentOptionText}>Hóa đơn:</Text>
              </View>
              <View style={styles.paymentRight}>
                <Text style={styles.paymentRightText}>Tổng tiền</Text>
                <Text style={styles.paymentRightFee}>
                  {VNDCurrencyFormatting(order.total)}
                </Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.separatorBar}></View>

        {/* Order Data & Details */}
        <View style={styles.orderData}>
          <Text style={styles.orderDataTitle}>Chi tiết đơn hàng</Text>
          <View style={styles.orderDataItem}></View>
          <View style={styles.orderDataItem}>
            <Text style={styles.orderDataItemText}>Thời gian đặt hàng</Text>
            <Text style={styles.orderDataItemText}>
              {VNDFormattedDate(order.updatedAt)}
            </Text>
          </View>
        </View>

        <View style={styles.orderDetails}>
          <View>
            <Text style={styles.orderDataTitle}>Các sản phẩm</Text>
            {order.items.map((item) => (
              <View key={item.item.name} style={styles.orderDataItem}>
                <Text style={styles.orderDataItemText}>{item.item.name}</Text>
                <Text style={styles.orderDataItemText}>x {item.qty}</Text>
              </View>
            ))}
          </View>
        </View>
        {/* Order Data & Details */}
        <View style={styles.orderData}>
          <Text style={styles.orderDataTitle}>Người đặt hàng</Text>
          <View style={styles.orderDataItem}>
            <Text style={styles.orderDataItemText}>Tên khách hàng</Text>
            <Text style={styles.orderDataItemText}>{client.name}</Text>
          </View>
          <View style={styles.orderDataItem}>
            <Text style={styles.orderDataItemText}>Địa chỉ</Text>
            <Text style={styles.orderDataItemText}>{client.address}</Text>
          </View>
          <View style={styles.orderDataItem}>
            <Text style={styles.orderDataItemText}>Khách hàng cách xa bạn</Text>
            <Text style={styles.orderDataItemText}>
              {distancePersonAToPersonB}
            </Text>
          </View>
        </View>

        <View style={styles.logoutContainer}>
          <TouchableOpacity onPress={handleAcceptOrder}>
            <View style={styles.logoutBtn}>
              <Text style={styles.logoutText}>Nhận đơn hàng</Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 10,
  },
  order: {},
  addressContainer: {
    marginBottom: 20,
  },
  addressTitle: {
    fontSize: 14,
    fontFamily: "inter_semi_bold",
    textTransform: "uppercase",
    color: "#000",
    marginBottom: 12,
  },
  addressSelected: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  addressSelectedData: {},
  addressSelectedTitle: {
    fontSize: 16,
    fontFamily: "inter_medium",
    color: "#000",
    marginBottom: 4,
  },
  addressSelectedStreet: {
    fontSize: 12,
    fontFamily: "inter_medium",
    color: "#000",
    maxWidth: 320,
  },
  addressSelectedRight: {},
  addressSelectedTag: {
    marginRight: 4,
    backgroundColor: colors.GREEN_LOGO_TWO,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  addressSelectedTagText: {
    fontSize: 13,
    fontFamily: "inter_semi_bold",
    color: "#fff",
  },
  productSelectedTag: {
    marginRight: 4,
    backgroundColor: colors.GREEN_TEXT_TWO,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    maxWidth: 200,
  },
  productSelectedTagText: {
    fontSize: 12,
    fontFamily: "inter_semi_bold",
    color: "#fff",
  },
  productSelectedStreet: {
    fontSize: 12,
    fontFamily: "inter_medium",
    color: "#000",
    maxWidth: 200,
  },
  paymentContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  paymentOption: {
    flexDirection: "row",
    alignItems: "center",
  },
  paymentOptionText: {
    fontSize: 14,
    fontFamily: "inter_semi_bold",
    color: "#000",
    marginLeft: 8,
  },
  paymentRight: {
    fontSize: 14,
    fontFamily: "inter_medium",
    color: "#000",
    marginRight: 4,
  },
  paymentRight: {
    flexDirection: "row",
    alignItems: "center",
  },
  paymentRightText: {
    fontSize: 14,
    fontFamily: "inter_medium",
    color: "#000",
    marginRight: 4,
  },
  paymentRightFee: {
    fontSize: 14,
    fontFamily: "inter_medium",
    color: "#000",
    marginRight: 4,
  },
  separatorBar: {
    width: "100%",
    height: 1,
    backgroundColor: "#000",
    marginVertical: 20,
  },
  orderData: {
    marginBottom: 20,
  },
  orderDataItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  orderDataTitle: {
    fontSize: 13,
    fontFamily: "inter_bold",
    textTransform: "uppercase",
    color: "#000",
    marginBottom: 12,
  },
  orderDataItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  orderDataItemText: {
    fontSize: 12,
    fontFamily: "inter_medium",
    color: "#000",
  },
  orderDetails: {
    marginBottom: 20,
  },
  logoutContainer: {
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: "#000",
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
