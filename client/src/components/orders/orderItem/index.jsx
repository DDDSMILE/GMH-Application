import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";
import { VNDCurrencyFormatting } from "../../../utils";

const OrderItem = ({ order, index }) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity onPress={() => navigation.navigate("detail", { order })}>
      <View style={styles.container}>
        <View style={styles.orderData}>
          <Image
            style={styles.orderDataImg}
            resizeMode="contain"
            source={{ uri: order.items[0].item.photo }}
          />
          <View style={styles.orderDataContent}>
            <View style={styles.orderDataTop}>
              <Text style={styles.orderDataTopTitle}>Đơn hàng</Text>
              <Text style={styles.orderDataTopSubtitle}>
                {VNDCurrencyFormatting(order.total)}
              </Text>
            </View>
            <View style={styles.orderDataBottom}>
              <Text style={styles.orderDataBottomPrice}>
                Trạng thái: {order.status}
              </Text>
              <Text style={styles.orderDataBottomPayment}>
                {new Date(order.updatedAt).toLocaleString()}
              </Text>
            </View>
          </View>
        </View>
        <MaterialIcons name="keyboard-arrow-right" size={24} color="#000" />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
  },
  orderData: {
    flexDirection: "row",
    alignItems: "center",
  },
  orderDataImg: {
    width: 45,
    height: 45,
    borderRadius: 8,
    marginRight: 16,
  },
  orderDataContent: {},
  orderDataTop: {
    flexDirection: "row",
    alignItems: "flex-end",
    marginBottom: 8,
    height: 20,
    maxWidth: 148,
  },
  orderDataTopTitle: {
    fontSize: 15,
    fontFamily: "inter_medium",
    color: "#000",
    marginRight: 8,
  },
  orderDataTopSubtitle: {
    fontSize: 12,
    fontFamily: "inter_medium",
    color: "#000",
  },
  orderDataBottom: {
    flexDirection: "column",
    alignItems: "flex-end",
  },
  orderDataBottomPrice: {
    fontSize: 14,
    fontFamily: "inter_medium",
    color: "#000",
    marginRight: 8,
  },
  orderDataBottomPayment: {
    fontSize: 12,
    fontFamily: "inter_medium",
    color: "#000",
  },
});

export default OrderItem;
