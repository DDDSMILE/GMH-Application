import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
} from "react-native";
import { BackButton, HeaderPage } from "../../../components/form";
import { OrderResumeCTA } from "../../../components/food";
import { useDispatch, useSelector } from "react-redux";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { addOrder } from "../../../store/orders.slice";

const CheckoutScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const { items, total, addresses } = useSelector((state) => state.order);
  const { address, _id } = useSelector((state) => state.auth.user);

  const formattedDate = () => {
    const currentDate = new Date();
    const day = currentDate.getDate();
    const month = currentDate.getMonth() + 1; // Tháng bắt đầu từ 0
    const year = currentDate.getFullYear();
    const hours = currentDate.getHours();
    const minutes = currentDate.getMinutes();
    const seconds = currentDate.getSeconds();

    // Xây dựng chuỗi định dạng "dd/mm/yyyy"
    return (
      day +
      "/" +
      month +
      "/" +
      year +
      " " +
      hours +
      ":" +
      minutes +
      ":" +
      seconds
    );
  };

  const handlePlaceOrder = () => {
    const multiDirection = addresses.map((i) => i.address);

    const newOrder = {
      userId: _id,
      items: items,
      total: total,
      addresses: {
        user_address: address,
        suppliers_address: multiDirection,
      },
    };
    dispatch(addOrder({ order: newOrder }));
    navigation.navigate("home");
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

  return (
    <View style={styles.container}>
      <HeaderPage>
        <BackButton onPress={() => navigation.goBack()} />
        <View style={{ alignItems: "center", marginTop: 45 }}>
          <Text style={{ fontSize: 18, fontFamily: "inter_medium" }}>
            Thanh toán
          </Text>
        </View>
      </HeaderPage>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Address */}
        <View style={styles.addressContainer}>
          <Text style={styles.addressTitle}>Địa chỉ giao hàng</Text>
          {address ? (
            <View style={styles.addressSelected}>
              <View style={styles.addressSelectedData}>
                <Text style={styles.addressSelectedTitle}>Địa chỉ có sẵn</Text>
                <Text style={styles.addressSelectedStreet}>{address}</Text>
              </View>

              <View style={styles.addressSelectedRight}>
                <TouchableOpacity
                  onPress={() => navigation.navigate("addresses")}
                >
                  <MaterialCommunityIcons
                    style={styles.addressChangeBtn}
                    name="dots-vertical"
                    size={22}
                    color="#000"
                  />
                </TouchableOpacity>
              </View>
            </View>
          ) : (
            <TouchableOpacity onPress={() => navigation.navigate("addresses")}>
              <View style={styles.addAddressBtn}>
                <Text style={styles.addAddressBtnIcon}>+</Text>
                <Text style={styles.addAddressBtnText}>Thay đổi địa chỉ</Text>
              </View>
            </TouchableOpacity>
          )}
        </View>

        {/* Order Data & Details */}
        <View style={styles.orderData}>
          <Text style={styles.orderDataTitle}>Thông tin đơn hàng</Text>
          {/* <View style={styles.orderDataItem}>
            <Text style={styles.orderDataItemText}>Restaurant Name</Text>
            <Text style={styles.orderDataItemText}>name</Text>
          </View> */}
          <View style={styles.orderDataItem}>
            <Text style={styles.orderDataItemText}>Ngày xuất hóa đơn</Text>
            <Text style={styles.orderDataItemText}>{formattedDate()}</Text>
          </View>
        </View>

        {/* Payment Method */}
        <View>
          <View style={styles.paymentContainer}>
            <View style={styles.paymentOption}>
              <MaterialCommunityIcons
                name="credit-card-outline"
                size={24}
                color="#000"
              />
              <Text style={styles.paymentOptionText}>Thanh toán online</Text>
            </View>
            <View style={styles.paymentRight}>
              <Text style={styles.paymentRightText}>Phí:</Text>
              <Text style={styles.paymentRightFee}>0.00 đ</Text>
              <TouchableOpacity onPress={() => navigation.navigate("payment")}>
                <MaterialIcons
                  style={styles.paymentChangeBtn}
                  name="keyboard-arrow-right"
                  size={24}
                  color="#000"
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View style={styles.separatorBar} />

        <View style={styles.orderDetails}>
          <View>
            <Text style={styles.orderDataTitle}>Thông tin chi tiết</Text>
            {items.map((item) => (
              <View key={item.item.name} style={styles.orderDetailsItem}>
                <Text style={styles.orderDetailsItemText}>
                  {item.item.name}
                </Text>
                <Text style={styles.orderDetailsItemText}>x {item.qty}</Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>

      <OrderResumeCTA
        text="Sản phẩm đã thêm"
        total={total}
        navigateTo="Home"
        handlePlaceOrder={handlePlaceOrder}
        itemsLength={items.length}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 10,
  },
  addressContainer: {
    marginBottom: 20,
  },
  addressTitle: {
    fontSize: 12,
    fontFamily: "inter_medium",
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
    maxWidth: 280,
  },
  addressSelectedRight: {
    flexDirection: "row",
    alignItems: "center",
  },
  addressSelectedTag: {
    marginRight: 4,
    backgroundColor: "#000",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  addressSelectedTagText: {
    fontSize: 12,
    fontFamily: "inter_medium",
    color: "#fff",
  },
  addressChangeBtn: {
    paddingLeft: 8,
    paddingVertical: 8,
  },
  addAddressBtn: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderColor: "#000",
    borderWidth: 1,
    borderRadius: 4,
    padding: 18,
  },
  addAddressBtnIcon: {
    marginRight: 4,
    color: "#000",
    fontSize: 16,
    fontFamily: "inter_medium",
  },
  addAddressBtnText: {
    marginRight: 4,
    color: "#000",
    fontSize: 14,
    fontFamily: "inter_medium",
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
    fontFamily: "inter_medium",
    color: "#000",
    marginLeft: 8,
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
  paymentChangeBtn: {
    paddingLeft: 8,
    paddingVertical: 8,
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
  orderDataTitle: {
    fontSize: 12,
    fontFamily: "inter_medium",
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
    marginBottom: 140,
  },
  orderDetailsItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  orderDetailsItemText: {
    fontSize: 12,
    fontFamily: "inter_medium",
    color: "#000",
  },
});
export default CheckoutScreen;
