import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";
import { logout } from "../../../store/auth.slice";
import { useEffect, useState } from "react";
import colors from "../../../constants/colors";

const HomeScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [notifications, setNotifications] = useState(true);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <View style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Image
          style={styles.userImg}
          resizeMode="contain"
          source={{
            uri: "https://res.cloudinary.com/du93troxt/image/upload/v1682403822/shipper/aveqfofhd6pjvnqnqyrt.jpg",
          }}
        />
        <View style={styles.headerContent}>
          <Text style={styles.headerName}>{user.name}</Text>
          <Text style={styles.headerEmail}>{user.phone_number}</Text>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Thông tin người dùng</Text>

          <TouchableOpacity
            onPress={() => navigation.navigate("manage_address")}
          >
            <View style={styles.sectionItem}>
              <View style={styles.sectionItemLeft}>
                <MaterialIcons
                  name="location-on"
                  size={24}
                  color={colors.GREEN_LOGO_TWO}
                />
                <Text style={styles.sectionItemText}>Địa chỉ</Text>
              </View>
              <MaterialIcons
                name="keyboard-arrow-right"
                size={24}
                color={colors.GREEN_LOGO_TWO}
              />
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate("password")}>
            <View style={styles.sectionItem}>
              <View style={styles.sectionItemLeft}>
                <MaterialCommunityIcons
                  name="key-variant"
                  size={24}
                  color={colors.GREEN_LOGO_TWO}
                />
                <Text style={styles.sectionItemText}>Mật khẩu</Text>
              </View>
              <MaterialIcons
                name="keyboard-arrow-right"
                size={24}
                color={colors.GREEN_LOGO_TWO}
              />
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate("information")}>
            <View style={styles.sectionItem}>
              <View style={styles.sectionItemLeft}>
                <MaterialIcons
                  name="info"
                  size={24}
                  color={colors.GREEN_LOGO_TWO}
                />
                <Text style={styles.sectionItemText}>Thông tin chung</Text>
              </View>
              <MaterialIcons
                name="keyboard-arrow-right"
                size={24}
                color={colors.GREEN_LOGO_TWO}
              />
            </View>
          </TouchableOpacity>
        </View>

        {/* <View style={styles.section}>
          <Text style={styles.sectionTitle}>Thông báo</Text>

          <View style={styles.sectionItem}>
            <View style={styles.sectionItemLeft}>
              <MaterialIcons
                name="notifications"
                size={24}
                color={colors.GREEN_LOGO_TWO}
              />
              <Text style={styles.sectionItemText}>Bật thông báo</Text>
            </View>
            <TouchableOpacity onPress={() => setNotifications((prev) => !prev)}>
              <View
                style={[
                  styles.notificationsBtn,
                  notifications
                    ? {}
                    : {
                        backgroundColor: "#c8c8c8",
                        alignItems: "flex-start",
                      },
                ]}
              >
                <View style={styles.notificationsBtnCircle}></View>
              </View>
            </TouchableOpacity>
          </View>
        </View> */}

        <View style={styles.logoutContainer}>
          <TouchableOpacity onPress={handleLogout}>
            <View style={styles.logoutBtn}>
              <Text style={styles.logoutText}>Đăng xuất</Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 40,
    paddingHorizontal: 10,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
    marginBottom: 36,
  },
  userImg: {
    width: 85,
    height: 85,
    borderRadius: 50,
    marginRight: 20,
  },
  headerContent: {},
  headerName: {
    fontSize: 18,
    fontFamily: "inter_medium",
    color: "#000",
    marginBottom: 4,
  },
  headerEmail: {
    fontSize: 12,
    fontFamily: "inter_medium",
    color: colors.GRAY_VARIANT,
  },
  section: {
    marginBottom: 28,
  },
  sectionTitle: {
    fontSize: 16,
    fontFamily: "inter_semi_bold",
    color: "#868889",
    marginBottom: 28,
  },
  sectionItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
  },
  sectionItemLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  sectionItemText: {
    fontSize: 14,
    fontFamily: "inter_medium",
    color: "#000",
    marginLeft: 10,
  },
  logoutContainer: {
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: "#000",
  },
  logoutBtn: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    paddingVertical: 16,
    backgroundColor: colors.GREEN_LOGO_TWO,
    borderRadius: 4,
  },
  logoutText: {
    fontSize: 14,
    fontFamily: "inter_medium",
    color: "#fff",
  },
  notificationsBtn: {
    width: 50,
    height: 25,
    backgroundColor: colors.GREEN_LOGO_TWO,
    justifyContent: "center",
    alignItems: "flex-end",
    padding: 3,
    borderRadius: 99,
  },
  notificationsBtnCircle: {
    width: 20,
    height: 20,
    borderRadius: 50,
    backgroundColor: colors.WHITE_VARIANT,
  },
});

export default HomeScreen;
