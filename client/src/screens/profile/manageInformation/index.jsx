import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import { MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { BackButton, HeaderPage } from "../../../components/form";
import { DismissKeyboardView, Input } from "../../../components/common";

const ManageInformationScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const [formState, setFormState] = useState({
    name: user.name,
    phone_number: user.phone_number,
  });
  const [formError, setFormError] = useState("");
  const [loading, setLoading] = useState(false);

  return (
    <DismissKeyboardView style={styles.container}>
      <HeaderPage>
        <BackButton onPress={() => navigation.goBack()} />
        <View style={{ alignItems: "center", marginTop: 45 }}>
          <Text style={{ fontSize: 18, fontFamily: "inter_medium" }}>
            Thay đổi thông tin
          </Text>
        </View>
      </HeaderPage>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.avatarItem}>
          <Text style={styles.itemTitle}>Ảnh đại diện</Text>
          <View style={styles.itemContent}>
            {/* <Image
              style={styles.previewImg}
              resizeMode="contain"
              source={{ uri: pickedUrl ? pickedUrl : user.imgUrl }}
            /> */}
            <View style={styles.changeImgOptions}>
              <TouchableOpacity>
                <View style={styles.changeImgOption}>
                  <MaterialIcons name="image" size={16} color="#000" />
                  <Text style={styles.changeImgText}>
                    Chọn trong thư viện của bạn
                  </Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity>
                <View style={styles.changeImgOption}>
                  <MaterialIcons name="camera-alt" size={16} color="#000" />
                  <Text style={styles.changeImgText}>Chụp ảnh</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View style={styles.item}>
          <Input
            label="Tên người dùng"
            value={formState.fullName}
            onChangeText={(text) =>
              setFormState((prev) => ({ ...prev, fullName: text }))
            }
            placeholder="Nhập tên người dùng..."
            placeholderTextColor="#000"
            autoCapitalize="words"
            autoComplete="name"
            autoCorrect={false}
          />
          <MaterialIcons name="person-outline" size={24} color="#000" />
        </View>

        <View style={styles.item}>
          <View style={styles.itemLeft}>
            <Text style={styles.itemLeftLabel}>Email</Text>
            <Text style={styles.itemLeftText}>{user.phone_number}</Text>
          </View>
          <MaterialCommunityIcons name="email-outline" size={24} color="#000" />
        </View>

        <View style={styles.item}>
          <Input
            label="Số điện thoại"
            value={formState.phone}
            onChangeText={(text) =>
              setFormState((prev) => ({ ...prev, phone: text }))
            }
            placeholder="Nhập số điện thoại..."
            placeholderTextColor="#000"
            keyboardType="number-pad"
            autoCapitalize="none"
            autoComplete="name"
            autoCorrect={false}
          />
          <MaterialIcons name="phone-iphone" size={24} color="#000" />
        </View>

        {formError !== "" && (
          <View style={styles.errorContainer}>
            <MaterialIcons name="error-outline" size={18} color="red" />
            <Text style={styles.errorText}>{formError}</Text>
          </View>
        )}

        <View style={styles.separatorBar}></View>

        <TouchableOpacity>
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
    fontFamily: "inter_extra_bold",
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
    backgroundColor: "#000",
  },
  saveBtnText: {
    fontSize: 14,
    fontFamily: "inter_extra_bold",
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
    fontFamily: "inter_extra_bold",
    color: "red",
    marginLeft: 8,
  },
});

export default ManageInformationScreen;
