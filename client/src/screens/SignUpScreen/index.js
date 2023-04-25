import { View, Text, StyleSheet } from "react-native";
import { ButtonForm, InputForm, PageForm } from "../../components/Form";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Fontisto from "react-native-vector-icons/Fontisto";
import Feather from "react-native-vector-icons/Feather";
import { Colors } from "../../constants";
import { useState } from "react";

const SignUpScreen = ({ navigation }) => {
  const [isShowPassword, setIsShowPassword] = useState();

  return (
    <PageForm>
      <Text style={styles.title}>Đăng ký tài khoản</Text>
      <InputForm
        icon={
          <FontAwesome
            name="user"
            size={20}
            color={Colors.GREEN_TEXT_TWO}
            style={{ marginLeft: 3, marginRight: 20, marginTop: 3 }}
          />
        }
        label={"Tên đăng nhập"}
      />
      <InputForm
        icon={
          <Fontisto
            name="locked"
            size={20}
            color={Colors.GREEN_TEXT_TWO}
            style={{ marginLeft: 3, marginRight: 20, marginTop: 3 }}
          />
        }
        label={"Mật khẩu"}
        inputType="password"
        isShowPassword={isShowPassword}
        lastIcon={
          <Feather
            size={20}
            name={isShowPassword ? "eye" : "eye-off"}
            color={Colors.DEFAULT_GREY}
            style={{ marginLeft: 3, marginRight: 20, marginTop: 3 }}
            onPress={() => setIsShowPassword(!isShowPassword)}
          />
        }
      />
      <ButtonForm
        onPress={() => {
          navigation.navigate("inputphonenumber");
        }}
        disable={false}
        text={"Tạo tài khoản"}
        width={150}
      />
      <Text
        style={{
          color: "#15BE77",
          fontSize: 13,
          textDecorationLine: "underline",
          fontFamily: "inter_regular",
          paddingBottom: 20,
        }}
        onPress={() => {
          navigation.navigate("signin");
        }}
      >
        Đã có tài khoản? Bấm để đăng nhập
      </Text>
    </PageForm>
  );
};

const styles = StyleSheet.create({
  title: {
    fontFamily: "inter_medium",
    fontSize: 20,
    paddingBottom: 20,
  },
});

export default SignUpScreen;
