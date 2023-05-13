import { StyleSheet, Text, View } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { ButtonForm } from "../../../components/form";
import { logout } from "../../../store/auth.slice";

const HomeScreen = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth.user);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <View style={{ flex: 1, padding: 50, alignContent: "center" }}>
      <Text>{user.name}</Text>
      <Text>{user.phone_number}</Text>
      <ButtonForm text={"Đăng xuất"} onPress={handleLogout} />
    </View>
  );
};

export default HomeScreen;
