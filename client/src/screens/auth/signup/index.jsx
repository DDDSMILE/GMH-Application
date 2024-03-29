import { View, Text, StyleSheet } from "react-native";
import { ButtonForm, InputForm, PageForm } from "../../../components/form";
import Feather from "react-native-vector-icons/Feather";
import { Colors } from "../../../constants";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { storeData } from "../../../utils/asyncStorage";

const SignUpScreen = ({ navigation }) => {
  const { loading, error } = useSelector((state) => state.auth);
  const [isShowPassword, setIsShowPassword] = useState();

  const [formState, setFormState] = useState({
    name: "",
    password: "",
  });
  const [formError, setFormError] = useState("");
  const [isDisableState, setDisableState] = useState(true);

  useEffect(() => {
    const { name, password } = formState;

    const checkPasswordValidity = (value) => {
      const isNonWhiteSpace = /^\S*$/;
      if (!isNonWhiteSpace.test(value)) {
        return "Mật khẩu không được chứa khoảng trắng";
      }

      const isContainsUppercase = /^(?=.*[A-Z]).*$/;
      if (!isContainsUppercase.test(value)) {
        return "Mật khẩu phải có ít nhất một ký tự chữ hoa";
      }

      const isContainsLowercase = /^(?=.*[a-z]).*$/;
      if (!isContainsLowercase.test(value)) {
        return "Mật khẩu phải có ít nhất một ký tự chữ thường";
      }

      const isContainsNumber = /^(?=.*[0-9]).*$/;
      if (!isContainsNumber.test(value)) {
        return "Mật khẩu phải chứa ít nhất một chữ số";
      }

      const isContainsSymbol =
        /^(?=.*[~`!@#$%^&*()--+={}\[\]|\\:;"'<>,.?/_₹]).*$/;
      if (!isContainsSymbol.test(value)) {
        return "Mật khẩu phải chứa ít nhất một kí hiệu đặt biệt";
      }

      const isValidLength = /^.{8,24}$/;
      if (!isValidLength.test(value)) {
        return "Mật khẩu phải dài từ 8 đến 24 ký tự.";
      }

      return null;
    };

    const message = checkPasswordValidity(password);

    if (password.length > 0) {
      if (!message) {
        setFormError("Mật khẩu của bạn hợp lệ và mạnh");
      } else {
        setFormError(message);
      }
    }
    formState.name.length > 3 && !Boolean(checkPasswordValidity(password))
      ? setDisableState(false)
      : setDisableState(true);
  }, [formState]);

  const handleRegister = () => {
    const { name, password } = formState;
    storeData("register_name", name);
    storeData("register_password", password);
    navigation.navigate("registerlocation");
  };

  return (
    <PageForm>
      <Text style={styles.title}>Đăng ký tài khoản</Text>
      <InputForm
        value={formState.name}
        onChangeText={(text) =>
          setFormState((prev) => ({ ...prev, name: text }))
        }
        icon={
          <Feather
            name="user"
            size={20}
            color={Colors.GREEN_LOGO_TWO}
            style={{ marginLeft: 3, marginRight: 20, marginTop: 3 }}
          />
        }
        label={"Tên đăng nhập"}
      />
      <InputForm
        value={formState.password}
        onChangeText={(text) =>
          setFormState((prev) => ({ ...prev, password: text }))
        }
        icon={
          <Feather
            name="lock"
            size={20}
            color={Colors.GREEN_LOGO_TWO}
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
      {formError !== "" && (
        <View>
          <Text style={{ color: "red" }}>{formError}</Text>
        </View>
      )}
      <ButtonForm
        onPress={() => handleRegister()}
        disable={isDisableState}
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
