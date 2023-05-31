import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { BackButton, HeaderPage } from "../../../components/form";
import { MaterialIcons } from "@expo/vector-icons";
import { useState, useEffect } from "react";
import { DismissKeyboardView, Input } from "../../../components/common";
import { useSelector } from "react-redux";
import * as Location from "expo-location";
import colors from "../../../constants/colors";
import { changeAddress } from "../../../services/user";
import FlashMessage, { showMessage } from "react-native-flash-message";

const Addresses = ({ navigation }) => {
  const { user } = useSelector((state) => state.auth);

  const [newAddress, setNewAddress] = useState({
    new_address: user.address,
  });

  const convertAddressToCoordinates = async (address) => {
    try {
      const response = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
          address
        )}.json?access_token=pk.eyJ1IjoidGhhaXJ5byIsImEiOiJjbGk2dmt6bmczZzNiM2VudGRkc2xhY2dxIn0.j5FbXoxE7wJOwi9STKSLBw&limit=1`
      );
      const data = await response.json();
      if (data.features.length > 0) {
        const { center } = data.features[0];
        return { lat: center[1], lng: center[0] };
      }
      return null;
    } catch (error) {
      console.error("Error converting address to coordinates:", error);
      return null;
    }
  };

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }
    })();
  }, []);

  const handleGetLocation = async () => {
    // DEFAULT LOCATION
    const DEFAULT_LOCATION = {
      latitude: 16.059948395515388,
      longitude: 108.20970310839263,
    };

    let adrs = await Location.reverseGeocodeAsync(DEFAULT_LOCATION);
    const { name, streetNumber, street, subregion, region } = adrs[0];
    const address = `${
      name || streetNumber
    }, ${street}, ${subregion}, ${region}`;
    setNewAddress({ new_address: address });
    showMessage({
      message: "Lấy tọa độ thành công",
      type: "success",
    });
  };

  const handleChange = async () => {
    const { new_address } = newAddress;
    const { lat, lng } = await convertAddressToCoordinates(new_address);

    await changeAddress({ address: new_address, lat: lat, lng: lng });
    showMessage({
      message: "Lưu thanh đổi",
      type: "success",
    });
  };

  return (
    <DismissKeyboardView style={styles.container}>
      <FlashMessage position="top" />
      <HeaderPage>
        <BackButton onPress={() => navigation.goBack()} />
        <View style={{ alignItems: "center", marginTop: 45 }}>
          <Text style={{ fontSize: 18, fontFamily: "inter_medium" }}>
            Thay đổi địa chỉ
          </Text>
        </View>
      </HeaderPage>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.inputContainer}>
          <Input
            label="Địa chỉ"
            value={newAddress.new_address}
            onChangeText={(text) =>
              setNewAddress((prev) => ({ ...prev, new_address: text }))
            }
            placeholder="Nhập thông tin..."
            autoComplete="street-address"
            autoCorrect={false}
          />
        </View>

        <TouchableOpacity
          style={styles.addressPinPoint}
          onPress={handleGetLocation}
        >
          <View style={styles.addressPinPointLeft}>
            <MaterialIcons name="location-on" size={24} color="#000" />
            <Text style={styles.addressPinPointLeftText}>Bật định vị</Text>
          </View>
          <MaterialIcons name="keyboard-arrow-right" size={24} color="#000" />
        </TouchableOpacity>

        <View style={styles.separatorBar}></View>

        <TouchableOpacity onPress={handleChange}>
          <View style={styles.saveBtn}>
            <Text style={styles.saveBtnText}>Lưu thay đổi</Text>
          </View>
        </TouchableOpacity>
      </ScrollView>
    </DismissKeyboardView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 10,
  },
  inputContainer: {
    marginBottom: 20,
  },
  addressPinPoint: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    paddingHorizontal: 8,
    paddingVertical: 16,
    borderRadius: 4,
    backgroundColor: "#fce42d",
    marginBottom: 20,
  },
  addressPinPointLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  addressPinPointLeftText: {
    fontSize: 12,
    fontFamily: "inter_medium",
    color: "#000",
    marginLeft: 10,
  },
  separatorBar: {
    width: "100%",
    height: 1,
    backgroundColor: "#000",
    marginTop: 6,
    marginBottom: 20,
  },
  saveBtn: {
    width: "100%",
    padding: 16,
    borderRadius: 4,
    backgroundColor: colors.GREEN_LOGO_TWO,
    alignItems: "center",
    justifyContent: "center",
  },
  saveBtnText: {
    fontSize: 14,
    fontFamily: "inter_semi_bold",
    color: "#fff",
  },
});

export default Addresses;
