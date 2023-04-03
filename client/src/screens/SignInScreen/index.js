import { View, Text, StyleSheet } from "react-native";
import { ButtonForm, InputForm, PageForm } from "../../components/Form";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Fontisto from "react-native-vector-icons/Fontisto";
import { Colors } from "../../constants";

const SignInScreen = () => {
  return (
    <PageForm>
      <Text style={styles.title}>Chào mừng bạn trở lại!</Text>
      <InputForm
        icon={
          <MaterialCommunityIcons
            name="email"
            size={20}
            color={Colors.GREEN_TEXT_TWO}
            style={{ marginLeft: 3, marginRight: 20, marginTop: 3 }}
          />
        }
        label={"Email"}
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
      />
      <Text
        style={{
          color: Colors.GREEN_LOGO_TWO,
          fontFamily: "inter_medium",
          fontSize: 13,
          textDecorationLine: "underline",
          paddingBottom: 20,
        }}
      >
        Quên mật khẩu?
      </Text>
      <Text
        style={{
          color: Colors.DEFAULT_BLACK,
          fontSize: 16,
          paddingBottom: 20,
          fontFamily: "inter_regular",
        }}
      >
        Bạn chưa có tài khoản?, hãy
        <Text style={{ fontWeight: 700 }}> đăng ký</Text>
      </Text>
      <ButtonForm text={"Đăng nhập"} width={150} />
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

export default SignInScreen;
