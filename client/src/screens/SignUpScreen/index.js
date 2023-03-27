import { View, Text, StyleSheet } from "react-native";
import { ButtonForm, InputForm, PageForm } from "../../components/Form";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Fontisto from "react-native-vector-icons/Fontisto";

const SignUpScreen = () => {
  return (
    <PageForm>
      <Text style={styles.title}>Đăng ký tài khoản</Text>
      <InputForm
        icon={
          <FontAwesome
            name="user"
            size={20}
            color="#6CC51D"
            style={{ marginLeft: 3, marginRight: 20, marginTop: 3 }}
          />
        }
        label={"Tên đăng nhập"}
      />
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
      <ButtonForm text={"Tạo tài khoản"} width={150} />
      <Text
        style={{
          color: "#15BE77",
          fontSize: 13,
          textDecorationLine: "underline",
          fontWeight: 400,
          paddingBottom: 20,
        }}
      >
        Đã có tài khoản? Bấm để đăng nhập
      </Text>
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

export default SignUpScreen;
