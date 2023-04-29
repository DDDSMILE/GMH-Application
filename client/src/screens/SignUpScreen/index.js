import { View, Text, StyleSheet } from "react-native";
import { ButtonForm, InputForm, PageForm } from "../../components/Form";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Fontisto from "react-native-vector-icons/Fontisto";
import Feather from "react-native-vector-icons/Feather";
import { Colors } from "../../constants";
import { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFocusEffect } from "@react-navigation/native";

const SignUpScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);
  const [isShowPassword, setIsShowPassword] = useState();

  const [formState, setFormState] = useState({
    name: "",
    password: "",
  });
  const [formError, setFormError] = useState("");

  const handleRegister = async () => {
    const { name, password } = formState;

    console.log(formState);

    if (!name || !password) {
      setFormError("Phải điền hết tất cả");
      setTimeout(() => {
        setFormError("");
      }, 4000);
      return;
    }
  };

  useFocusEffect(
    useCallback(() => {
      setFormError("");
      setFormState({
        name: "",
        password: "",
      });
    }, [])
  );

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
            color={Colors.GREEN_TEXT_TWO}
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
          handleRegister();
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
