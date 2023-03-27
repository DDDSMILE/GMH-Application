import { View, Text, StyleSheet } from "react-native";
import { ButtonForm, InputForm, PageForm } from "../../components/Form";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Fontisto from "react-native-vector-icons/Fontisto";

const SignInScreen = () => {
  return (
    <PageForm>
      <Text style={styles.title}>Chào mừng bạn trở lại!</Text>
      <InputForm
        icon={
          <MaterialCommunityIcons
            name="email"
            size={20}
            color="#6CC51D"
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
            color="#6CC51D"
            style={{ marginLeft: 3, marginRight: 20, marginTop: 3 }}
          />
        }
        label={"Mật khẩu"}
        inputType="password"
      />
      <Text
        style={{
          color: "#15BE77",
          fontSize: 13,
          textDecorationLine: "underline",
          fontWeight: 400,
          paddingBottom: 20,
        }}
      >
        Quên mật khẩu?
      </Text>
      <Text
        style={{
          color: "#09051C",
          fontSize: 16,
          fontWeight: 400,
          paddingBottom: 20,
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
    fontSize: 20,
    fontWeight: 400,
    paddingBottom: 20,
  },
});

export default SignInScreen;
