import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
  TextInput,
} from "react-native";
import { FlagItem } from "../../../components/auth";
import { BackButton, ButtonForm, HeaderPage } from "../../../components/form";
import countrycode from "../../../constants/countrycode";
import { getFlagIcon } from "../../../constants/fetchApi";
import colors from "../../../constants/colors";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { Display } from "../../../utils";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

const getDropdownStyle = (y) => ({ ...styles.countryDropdown, top: y + 60 });

const InputPhoneScreen = ({ navigation }) => {
  const [selectedCountry, setSelectedCountry] = useState(
    countrycode.find((country) => country.name === "Viet Nam")
  );
  const [inputsContainerY, setInputsContainerY] = useState(0);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [dropdownLayout, setDropdownLayout] = useState({});
  const [phoneNumber, setPhoneNumber] = useState("");

  const [isDisableState, setDisableState] = useState(true);
  const [formError, setFormError] = useState("");
  const [isCorrectPhoneNumber, setIsCorrectPhoneNumber] = useState(false);
  useEffect(() => {
    const checkPhoneNumberValidity = (value) => {
      const isPhoneNumber = /(84|0[3|5|7|8|9])+([0-9]{8})\b/g;
      if (!isPhoneNumber.test(value)) {
        return "Hãy điền số điện thoại của bạn";
      }
    };
    const message = checkPhoneNumberValidity(phoneNumber);
    if (!message) {
      setIsCorrectPhoneNumber(true);
      setFormError("");
    } else {
      setFormError(message);
    }
    phoneNumber.length > 11 ? setDisableState(false) : setDisableState(true);
  }, [phoneNumber]);

  const handleRegister = async () => {
    if (isCorrectPhoneNumber) {
      console.log(phoneNumber);
    }
  };

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
    <View
      style={styles.container}
      onStartShouldSetResponder={({ nativeEvent: { pageX, pageY } }) =>
        closeDropdown(pageX, pageY)
      }
    >
      <HeaderPage>
        <BackButton onPress={() => navigation.goBack()} />
      </HeaderPage>
      <Text style={styles.title}>Hãy điền số điện thoại của bạn</Text>
      <View
        style={styles.inputsContainer}
        onLayout={({
          nativeEvent: {
            layout: { y },
          },
        }) => setInputsContainerY(y)}
      >
        <TouchableOpacity
          style={styles.countryListContainer}
          onPress={() => setIsDropdownOpen(!isDropdownOpen)}
        >
          <Image
            source={{ uri: getFlagIcon(selectedCountry.code.toLowerCase()) }}
            style={styles.flatIcon}
          />
          <Text style={styles.countryCodeText}>
            {selectedCountry.dial_code}
          </Text>
          <MaterialIcons name="keyboard-arrow-down" size={18} />
        </TouchableOpacity>
        <View style={styles.phoneInputContainer}>
          <TextInput
            placeholder="Số điện thoại"
            placeholderTextColor={colors.DEFAULT_GREY}
            selectionColor={colors.DEFAULT_GREY}
            keyboardType="number-pad"
            onFocus={() => setIsDropdownOpen(false)}
            style={styles.inputText}
            onChangeText={(text) =>
              setPhoneNumber(selectedCountry?.dial_code + text)
            }
          />
        </View>
      </View>
      {isDropdownOpen && (
        <View
          style={getDropdownStyle(inputsContainerY)}
          onLayout={({
            nativeEvent: {
              layout: { x, y, height, width },
            },
          }) => setDropdownLayout({ x, y, height, width })}
        >
          <FlatList
            data={countrycode}
            keyExtractor={(item) => item.code}
            renderItem={({ item }) => (
              <FlagItem
                {...item}
                onPress={(country) => {
                  setSelectedCountry(country);
                  setIsDropdownOpen(false);
                }}
              />
            )}
          />
        </View>
      )}
      {formError !== "" && (
        <View>
          <Text>{formError}</Text>
        </View>
      )}
      <View style={{ alignItems: "center", justifyContent: "center" }}>
        <ButtonForm
          disable={isDisableState}
          onPress={() => {
            handleRegister();
            navigation.navigate("otp");
          }}
          text={"Tiếp theo"}
          width={80}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.DEFAULT_WHITE,
  },
  title: {
    fontFamily: "inter_medium",
    fontSize: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  countryDropdown: {
    backgroundColor: "#fbf7fb",
    position: "absolute",
    width: Display.setWidth(80),
    height: Display.setHeight(5),
    marginLeft: 20,
    paddingTop: 5,
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: colors.DEFAULT_GREY,
    zIndex: 3,
  },
  inputsContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 20,
    marginVertical: 50,
    backgroundColor: "#fbf7fb",
  },
  countryListContainer: {
    backgroundColor: Colors.DEFAULT_WHITE,
    width: Display.setWidth(22),
    marginRight: 5,
    borderRadius: 8,
    height: Display.setHeight(6),
    justifyContent: "space-evenly",
    alignItems: "center",
    borderWidth: 0.5,
    borderColor: "#000",
    flexDirection: "row",
  },
  countryCodeText: {
    fontFamily: "inter_medium",
    lineHeight: 14 * 1.4,
    color: colors.DEFAULT_BLACK,
  },
  flatIcon: {
    height: 20,
    width: 20,
  },
  phoneInputContainer: {
    backgroundColor: colors.DEFAULT_WHITE,
    paddingHorizontal: 10,
    borderRadius: 8,
    borderWidth: 0.5,
    borderColor: colors.DEFAULT_GREY,
    justifyContent: "center",
    flex: 1,
    backgroundColor: "#fbf7fb",
  },
  inputText: {
    fontSize: 18,
    textAlignVertical: "center",
    padding: 0,
    height: Display.setHeight(6),
    color: colors.DEFAULT_BLACK,
  },
});

export default InputPhoneScreen;
