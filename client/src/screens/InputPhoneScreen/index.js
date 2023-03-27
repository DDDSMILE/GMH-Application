import React, { useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { BackButton, HeaderPage } from "../../components/Form";
import contrycode from "../../constants/contrycode";
import { getFlagIcon } from "../../constants/fetchApi";

const getDropdownStyle = (y) => ({ ...styles.countryDropdown, top: y + 60 });

const InputPhoneScreen = () => {
  const [selectedCountry, setSelectedCountry] = useState(
    contrycode.find((country) => country.name === "Viet Nam")
  );
  const [inputsContainerY, setInputsConatinerY] = useState(0);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [dropdownLayout, setDropdownLayout] = useState({});
  const [phoneNumber, setPhoneNumber] = useState("");

  const closeDropdown = (pageX, pageY) => {
    if (isDropdownOpen) {
      if (
        pageX < dropdownLayout?.x ||
        pageX > dropdownLayout?.x + dropdownLayout?.width ||
        pageY < dropdownLayout?.y ||
        pageY > dropdownLayout?.y + dropdownLayout?.height
      ) {
        setIsDropdownOpen(false);
      }
    }
  };

  return (
    <View>
      <HeaderPage>
        <BackButton />
      </HeaderPage>
      <View>
        <Text style={styles.title}>Hãy điền số điện thoại của bạn</Text>

        <TouchableOpacity
          style={{
            backgroundColor: "#fff",
            width: 50,
            marginRight: 10,
            borderRadius: 8,
            height: 60,
            justifyContent: "space-evenly",
            alignItems: "center",
            borderWidth: 0.5,
            borderColor: "#000",
            flexDirection: "row",
          }}
          onPress={() => setIsDropdownOpen(!isDropdownOpen)}
        >
          <Image
            source={{ uri: getFlagIcon(selectedCountry.code.toLowerCase()) }}
            style={{ height: 20, width: 20 }}
          />
          <Text
            style={{
              fontSize: 14,
              lineHeight: 14 * 1.4,
              color: "#000",
            }}
          >
            {selectedCountry.dial_code}
          </Text>
        </TouchableOpacity>
      </View>
      {isDropdownOpen && (
        <View style={getDropdownStyle(inputsContainerY)}
        ></View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  countryDropdown: {
    backgroundColor: "#fff",
    position: "absolute",
    width: 80,
    height: 50,
    marginLeft: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#fff",
    zIndex: 3,
  },
});

export default InputPhoneScreen;
