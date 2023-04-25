import { View, Text, TextInput, StyleSheet } from "react-native";
import { BackButton, ButtonForm, HeaderPage } from "../../components/Form";
import { useRef, useState } from "react";
import colors from "../../constants/colors";

const OTPScreen = ({ navigation }) => {
  const firstInput = useRef();
  const secondInput = useRef();
  const thirdInput = useRef();
  const fourthInput = useRef();
  const [otp, setOtp] = useState({ 1: "", 2: "", 3: "", 4: "" });

  return (
    <View>
      <HeaderPage>
        <BackButton onPress={() => navigation.navigate("inputphonenumber")} />
      </HeaderPage>
      <View style={styles.container}>
        <Text style={styles.title}>Xác nhận số điện thoại</Text>
        <Text style={styles.subtitle}>
          Hãy nhập mã OTP trong tin nhắn của bạn
        </Text>

        {/* OTP Container */}
        <View style={styles.otpContainer}>
          <View style={styles.otpBox}>
            <TextInput
              style={styles.otpText}
              keyboardType="number-pad"
              maxLength={1}
              ref={firstInput}
              onChangeText={(text) => {
                setOtp({ ...otp, 1: text });
                text && secondInput.current.focus();
              }}
            />
          </View>
          <View style={styles.otpBox}>
            <TextInput
              style={styles.otpText}
              keyboardType="number-pad"
              maxLength={1}
              ref={secondInput}
              onChangeText={(text) => {
                setOtp({ ...otp, 2: text });
                text ? thirdInput.current.focus() : firstInput.current.focus();
              }}
            />
          </View>
          <View style={styles.otpBox}>
            <TextInput
              style={styles.otpText}
              keyboardType="number-pad"
              maxLength={1}
              ref={thirdInput}
              onChangeText={(text) => {
                setOtp({ ...otp, 3: text });
                text
                  ? fourthInput.current.focus()
                  : secondInput.current.focus();
              }}
            />
          </View>
          <View style={styles.otpBox}>
            <TextInput
              style={styles.otpText}
              keyboardType="number-pad"
              maxLength={1}
              ref={fourthInput}
              onChangeText={(text) => {
                setOtp({ ...otp, 4: text });
                !text && thirdInput.current.focus();
              }}
            />
          </View>
        </View>
        {/* OTP Container */}
        <View style={{ marginTop: 50 }}>
          <ButtonForm
            onPress={() => navigation.navigate("registerlocation")}
            width={80}
            text={"Tiếp theo"}
          />
        </View>
        <Text style={{ fontFamily: "inter_medium" }}>
          Bạn không nhận được mã? Hãy chờ sau 5 phút
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    marginHorizontal: 20,
    alignItems: "center",
  },
  title: {
    fontSize: 25,
    fontFamily: "inter_semi_bold",
  },
  subtitle: {
    fontSize: 15,
    fontFamily: "inter_medium",
    color: colors.DEFAULT_GREY,
  },
  otpContainer: {
    marginHorizontal: 20,
    marginTop: 30,
    justifyContent: "space-evenly",
    alignItems: "center",
    flexDirection: "row",
  },
  otpBox: {
    borderRadius: 5,
    borderColor: colors.DEFAULT_BLACK,
    borderWidth: 0.5,
    marginHorizontal: 10,
  },
  otpText: {
    fontSize: 25,
    color: colors.DEFAULT_BLACK,
    padding: 0,
    textAlign: "center",
    paddingHorizontal: 18,
    paddingVertical: 10,
  },
});

export default OTPScreen;
