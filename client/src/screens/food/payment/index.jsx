import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { BackButton, ButtonForm, HeaderPage } from "../../../components/form";
import colors from "../../../constants/colors";

const PaymentScreen = ({ navigation }) => {
  return (
    <View>
      <HeaderPage>
        <BackButton onPress={() => navigation.goBack()} />
        <View style={{ alignItems: "center", marginTop: 45 }}>
          <Text style={{ fontSize: 18, fontFamily: "inter_medium" }}>
            Thanh toán online
          </Text>
        </View>
      </HeaderPage>
      <View>
        <View style={{ alignItems: "center", paddingTop: 10 }}>
          <Image
            style={{ width: 300, height: 500, borderRadius: 8 }}
            source={{
              uri: "https://res.cloudinary.com/du93troxt/image/upload/v1684833358/343297211_791334718947540_8624720576045066549_n_noawmf.jpg",
            }}
          />
        </View>
        <View style={styles.logoutContainer}>
          <TouchableOpacity onPress={() => navigation.navigate("home")}>
            <View style={styles.logoutBtn}>
              <Text style={styles.logoutText}>Hoàn thành</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default PaymentScreen;

const styles = StyleSheet.create({
  logoutContainer: {
    paddingTop: 15,
    alignContent: "center",
    paddingHorizontal: 45,
  },
  logoutBtn: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    paddingVertical: 16,
    backgroundColor: colors.GREEN_LOGO_TWO,
    borderRadius: 6,
  },
  logoutText: {
    fontSize: 14,
    fontFamily: "inter_medium",
    color: "#fff",
  },
});
