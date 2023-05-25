import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { VNDCurrencyFormatting } from "../../../utils";
import colors from "../../../constants/colors";

const OrderResumeCTA = ({
  text,
  total,
  navigateTo,
  handlePlaceOrder,
  itemsLength,
}) => {
  const navigation = useNavigation();

  const handlePress = () => {
    if (handlePlaceOrder) {
      handlePlaceOrder();
    } else {
      navigation.navigate(navigateTo);
    }
  };

  return (
    <View style={styles.orderResume}>
      <View style={styles.orderResumePrice}>
        <Text style={styles.orderResumePriceText}>Thanh toán:</Text>
        <Text style={styles.orderResumePriceAmount}>
          {VNDCurrencyFormatting(total)}
        </Text>
      </View>
      <TouchableOpacity onPress={handlePress}>
        <View style={styles.orderResumeCTA}>
          <Text style={styles.orderResumeCTAText}>{text}</Text>
          <View style={styles.orderResumeCTAQty}>
            <Text style={styles.orderResumeCTAQtyText}>{itemsLength}</Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  orderResume: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: colors.WHITE_VARIANT,
    padding: 16,
    shadowColor: colors.GRAY_VARIANT,
    shadowOffset: {
      width: 0,
      height: -1,
    },
    shadowOpacity: 0.21,
    shadowRadius: 7.68,
    elevation: 10,
  },
  orderResumePrice: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  orderResumePriceText: {
    fontSize: 14,
    fontFamily: "inter_medium",
    color: "#000",
  },
  orderResumePriceAmount: {
    fontSize: 14,
    fontFamily: "inter_medium",
    color: "#000",
  },
  orderResumeCTA: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.GREEN_LOGO_TWO,
    paddingVertical: 12,
    borderRadius: 8,
  },
  orderResumeCTAText: {
    fontSize: 16,
    fontFamily: "inter_semi_bold",
    color: "#fff",
    marginRight: 12,
  },
  orderResumeCTAQty: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.GREEN_LOGO_ONE,
    padding: 1,
    width: 20,
    height: 20,
    borderRadius: 4,
  },
  orderResumeCTAQtyText: {
    fontSize: 12,
    fontFamily: "inter_semi_bold",
    color: "#fff",
  },
});

export default OrderResumeCTA;
