import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";
import { VNDCurrencyFormatting, VNDFormattedDate } from "../../../utils";
import colors from "../../../constants/colors";

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
              <View style={{ display: "flex", flexDirection: "row" }}>
                <Text
                  style={{
                    fontFamily: "inter_semi_bold",
                    fontSize: 14,
                    paddingRight: 5,
                  }}
                >
                  Trạng thái
                </Text>
                <Text style={styles.orderDataBottomPrice}>{order.status}</Text>
              </View>
              <View>
                <Text style={styles.orderDataBottomPayment}>
                  {VNDFormattedDate(order.createdAt)}
                </Text>
              </View>
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
    width: 80,
    height: 80,
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
    fontSize: 13,
    fontFamily: "inter_medium",
    color: "#000",
    marginRight: 8,
  },
  orderDataTopSubtitle: {
    fontSize: 12,
    fontFamily: "inter_medium",
    color: "#fff",
    backgroundColor: colors.GREEN_LOGO_TWO,
    padding: 2,
    borderRadius: 2,
  },
  orderDataBottom: {
    flexDirection: "column",
    alignItems: "flex-end",
  },
  orderDataBottomPrice: {
    fontSize: 12,
    fontFamily: "inter_medium",
    color: "#000",
    marginRight: 8,
    backgroundColor: "#fce42d",
    padding: 3,
    borderRadius: 5,
  },
  orderDataBottomPayment: {
    fontSize: 12,
    fontFamily: "inter_medium",
    color: colors.GRAY_VARIANT,
  },
});

export default OrderItem;
