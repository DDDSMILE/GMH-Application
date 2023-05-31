import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { BackButton, HeaderPage } from "../../../components/form";
import { VNDCurrencyFormatting, VNDFormattedDate } from "../../../utils";
import colors from "../../../constants/colors";
import { useEffect, useState } from "react";
import ShortDistance from "../../../utils/shortDistance";
import GeocodeAddress from "../../../utils/geocodeAddress";

const DetailScreen = ({ navigation, route }) => {
  const { order } = route.params;
  const addresses = Array.from(
    new Set(order.items.map((item) => item.item.addressItem))
  );
  const { shipper } = route.params.order;
  const [totalDistanceAndTime, setTotalDistanceAndTime] = useState({});

  async function calculateTotalDistanceAndTime() {
    const speed = 40; // Vận tốc (km/h)

    const supplierLocations = [];
    for (let i = 0; i < addresses.length; i++) {
      const supplierLocation = await GeocodeAddress(addresses[i]);
      supplierLocations.push(supplierLocation);
    }
    const sortedAddresses = [...supplierLocations];

    const distances = [];
    const times = [];

    for (let i = 0; i < sortedAddresses.length - 1; i++) {
      const distance = ShortDistance(
        sortedAddresses[i].lat,
        sortedAddresses[i].lng,
        sortedAddresses[i + 1].lat,
        sortedAddresses[i + 1].lng
      );
      distances.push(distance);

      const time = Math.round((distance / speed) * 60);
      times.push(time);
    }

    const totalDistance = distances.reduce((acc, curr) => acc + curr, 0);
    const totalTime = times.reduce((acc, curr) => acc + curr, 0);

    const result = {
      distances: distances,
      times: times,
      totalDistance: totalDistance,
      totalTime: totalTime,
    };

    setTotalDistanceAndTime(result);
  }

  useEffect(() => {
    calculateTotalDistanceAndTime();
  }, []);

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
              {addresses.map((adr, index) => (
                <View key={index} style={{ paddingBottom: 4 }}>
                  <View style={styles.addressSelectedRight}>
                    <View style={styles.addressSelectedTag}>
                      <Text style={styles.addressSelectedTagText}>
                        Địa chỉ {index + 1}
                      </Text>
                    </View>
                  </View>
                  <Text style={styles.addressSelectedStreet}>{adr}</Text>
                </View>
              ))}
              {totalDistanceAndTime.totalDistance > 0 &&
                Object.keys(totalDistanceAndTime).length > 0 && (
                  <View style={styles.productSelectedTag}>
                    <Text style={styles.productSelectedTagText}>
                      Tổng {totalDistanceAndTime.totalDistance.toFixed(2)} km x{" "}
                      {totalDistanceAndTime.totalTime} phút (có thể trễ 10-15
                      phút vấn đề ngoại cảnh)
                    </Text>
                  </View>
                )}
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
                <Text style={styles.paymentOptionText}>Thanh toán:</Text>
              </View>
              <View style={styles.paymentRight}>
                <Text style={styles.paymentRightText}>Tổng tiền</Text>
                <Text style={styles.paymentRightFee}>
                  {VNDCurrencyFormatting(order.total)}+Ship:
                  {VNDCurrencyFormatting(30000)}
                </Text>
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate("food", { screen: "payment" })
                  }
                >
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
        {shipper && (
          <View style={styles.orderDetails}>
            <View>
              <Text style={styles.orderDataTitle}>
                Thông tin người giao hàng:
              </Text>
              <View style={styles.orderDataItem}>
                <Text style={styles.orderDataItemText}>Tên người giao</Text>
                <Text style={styles.orderDataItemText}>{shipper.name}</Text>
              </View>
              <View style={styles.orderDataItem}>
                <Text style={styles.orderDataItemText}>Số điện thoại</Text>
                <Text style={styles.orderDataItemText}>
                  {shipper.phone_number}
                </Text>
              </View>
              <View style={styles.orderDataItem}>
                <Text style={styles.orderDataItemText}>Địa chỉ</Text>
                <Text style={styles.orderDataItemText}>{shipper.address}</Text>
              </View>
            </View>
          </View>
        )}
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
  productSelectedTag: {
    marginRight: 4,
    backgroundColor: colors.GREEN_TEXT_TWO,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    maxWidth: 300,
  },
  productSelectedTagText: {
    fontSize: 12,
    fontFamily: "inter_semi_bold",
    color: "#fff",
  },
});

export default DetailScreen;
