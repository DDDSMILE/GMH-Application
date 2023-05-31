import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { BackButton, HeaderPage } from "../../../components/form";
import { DismissKeyboardView, Input } from "../../../components/common";
import colors from "../../../constants/colors";
import FlashMessage, { showMessage } from "react-native-flash-message";
import { changePassword } from "../../../services/user";

const ManagePasswordScreen = ({ navigation }) => {
  const dispatch = useDispatch();

  const [formState, setFormState] = useState({
    old_password: "",
    new_password: "",
  });

  const [formError, setFormError] = useState("");
  const [loading, setLoading] = useState(false);

  const [isValidPassword, setIsValidPassword] = useState(true);

  const handleChange = () => {
    const passwordPattern =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (passwordPattern.test(formState.new_password)) {
      setIsValidPassword(true);
      changePassword({
        old_password: formState.old_password,
        new_password: formState.new_password,
      });
      showMessage({
        message: "Thay đổi thành công",
        type: "success",
      });
    } else {
      setIsValidPassword(false);
      showMessage({
        message: "Không thành công",
        type: "danger",
      });
    }
  };

  return (
    <DismissKeyboardView style={styles.container}>
      <FlashMessage position="top" />
      <HeaderPage>
        <BackButton onPress={() => navigation.goBack()} />
        <View style={{ alignItems: "center", marginTop: 45 }}>
          <Text style={{ fontSize: 18, fontFamily: "inter_medium" }}>
            Thay đổi thông tin
          </Text>
        </View>
      </HeaderPage>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.item}>
          <Input
            label="Mật khẩu cũ"
            value={formState.old_password}
            onChangeText={(text) =>
              setFormState((prev) => ({ ...prev, old_password: text }))
            }
            placeholder="Vui lòng nhập mật khẩu cũ.."
            placeholderTextColor={colors.GRAY_VARIANT}
            autoCapitalize="words"
            autoCorrect={false}
          />

          <MaterialCommunityIcons
            name="key"
            size={24}
            color={colors.GREEN_LOGO_TWO}
          />
        </View>
        <View style={styles.item}>
          <Input
            label="Mật khẩu mới"
            value={formState.new_password}
            onChangeText={(text) =>
              setFormState((prev) => ({ ...prev, new_password: text }))
            }
            placeholder="Nhập mật khẩu mới..."
            placeholderTextColor={colors.GRAY_VARIANT}
            autoCapitalize="words"
            autoCorrect={false}
          />
          <MaterialCommunityIcons
            name="key-chain"
            size={24}
            color={colors.GREEN_LOGO_TWO}
          />
        </View>

        {!isValidPassword && (
          <Text style={{ color: "red" }}>Mật khẩu mới không hợp lệ!</Text>
        )}

        {formError !== "" && (
          <View style={styles.errorContainer}>
            <MaterialIcons name="error-outline" size={18} color="red" />
            <Text style={styles.errorText}>{formError}</Text>
          </View>
        )}

        <View style={styles.separatorBar}></View>

        <TouchableOpacity onPress={handleChange}>
          <View style={styles.saveBtn}>
            {loading ? (
              <ActivityIndicator size="small" color="#000" />
            ) : (
              <Text style={styles.saveBtnText}>Lưu thay đổi</Text>
            )}
          </View>
        </TouchableOpacity>
      </ScrollView>
    </DismissKeyboardView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 10,
  },
  avatarItem: {
    marginBottom: 22,
  },
  item: {
    flexDirection: "row",
    alignItems: "flex-end",
    marginBottom: 22,
  },
  itemTitle: {
    fontSize: 12,
    fontFamily: "inter_regular",
    textTransform: "uppercase",
    color: "#000",
    marginBottom: 14,
  },
  itemContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  previewImg: {
    width: 75,
    height: 75,
    borderRadius: "50%",
    marginRight: 20,
  },
  changeImgOptions: {},
  changeImgOption: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  changeImgText: {
    fontSize: 14,
    fontFamily: "inter_extra_bold",
    color: "#000",
    marginLeft: 8,
  },
  itemLeft: {
    flex: 1,
  },
  itemLeftLabel: {
    fontSize: 12,
    fontFamily: "inter_extra_bold",
    textTransform: "uppercase",
    color: "#000",
    marginBottom: 8,
  },
  itemLeftText: {
    width: "100%",
    fontSize: 14,
    fontFamily: "inter_extra_bold",
    color: "#000",
  },
  separatorBar: {
    width: "100%",
    height: 1,
    backgroundColor: "#000",
    marginTop: 12,
    marginBottom: 18,
  },
  saveBtn: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 16,
    borderRadius: 4,
    backgroundColor: colors.GREEN_LOGO_TWO,
  },
  saveBtnText: {
    fontSize: 14,
    fontFamily: "inter_semi_bold",
    color: "#fff",
  },
  errorContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 6,
    marginBottom: 10,
  },
  errorText: {
    fontSize: 12,
    fontFamily: "inter_medium",
    color: "red",
    marginLeft: 8,
  },
});

export default ManagePasswordScreen;
