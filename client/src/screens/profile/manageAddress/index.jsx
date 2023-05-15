import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";
import React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { BackButton, HeaderPage } from "../../../components/form";

const ManageAddress = ({ navigation }) => {
  const address = "Sơn Trà 2832, Đà Nẵng";

  return (
    <View style={styles.container}>
      <HeaderPage>
        <BackButton onPress={() => navigation.goBack()} />
        <View style={{ alignItems: "center", marginTop: 45 }}>
          <Text style={{ fontSize: 18, fontFamily: "inter_medium" }}>
            Địa chỉ giao hàng
          </Text>
        </View>
      </HeaderPage>

      <ScrollView>
        <View>
          <View>
            <View style={styles.addressItem}>
              <View style={styles.addressData}>
                <View style={styles.addressDataTop}>
                  <Text style={styles.addressDataTopTitle}>Địa chỉ đã lưu</Text>
                </View>
                <Text style={styles.addressDataStreet}>{address}</Text>
              </View>

              <MaterialCommunityIcons
                name="dots-vertical"
                size={24}
                color="#000"
              />
            </View>
          </View>

          <View style={styles.separatorBar}></View>

          <TouchableOpacity onPress={() => navigation.navigate("addresses")}>
            <View style={styles.addAddressBtn}>
              <Text style={styles.addAddressBtnIcon}>+</Text>
              <Text style={styles.addAddressBtnText}>Thay đổi địa chỉ</Text>
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
  addressItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 12,
    borderRadius: 4,
    borderColor: "#000",
    borderWidth: 1,
    marginBottom: 14,
  },
  addressData: {},
  addressDataTop: {
    flexDirection: "row",
    alignItems: "flex-end",
    marginBottom: 10,
  },
  addressDataTopTitle: {
    fontSize: 14,
    fontFamily: "inter_medium",
    color: "#000",
    marginRight: 10,
  },
  addressDataTopTag: {
    fontSize: 12,
    fontFamily: "inter_medium",
    color: "#000",
  },
  addressDataStreet: {
    fontSize: 12,
    fontFamily: "inter_medium",
    color: "#000",
    maxWidth: 280,
  },
  separatorBar: {
    width: "100%",
    height: 1,
    backgroundColor: "#000",
    marginTop: 6,
    marginBottom: 20,
  },
  addAddressBtn: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderColor: "#000",
    borderWidth: 1,
    borderRadius: 4,
    padding: 20,
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
});

export default ManageAddress;
