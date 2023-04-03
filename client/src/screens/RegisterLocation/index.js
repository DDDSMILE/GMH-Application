import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { BackButton, ButtonForm, HeaderPage } from "../../components/Form";
import { Images } from "../../constants";
import colors from "../../constants/colors";
import { Display } from "../../utils";

const RegisterLocation = () => {
  return (
    <View>
      <HeaderPage>
        <BackButton />
      </HeaderPage>
      <View style={styles.container}>
        <Text style={styles.title}>Cập nhật vị trí của bạn</Text>
        <Text style={styles.subtitle}>
          Hãy bật định vị hoặc cho chúng tôi biết{"\n"}
          địa điểm bạn muốn giao hàng
        </Text>
        <View style={styles.panel}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginVertical: 5,
            }}
          >
            <Image
              style={{
                height: 30,
                width: 30,
                marginRight: 7,
              }}
              source={Images.PINLOGO}
            />
            <Text style={{ fontFamily: "inter_medium" }}>Vị trí của bạn</Text>
          </View>
          <TouchableOpacity style={styles.locationButton}>
            <Text style={{ fontFamily: "inter_semi_bold" }}>
              Cài đặt vị trí
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <View
        style={{ alignItems: "center", marginVertical: Display.setWidth(60) }}
      >
        <ButtonForm text={"Hoàn thành"} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    marginVertical: 20,
  },
  title: {
    fontSize: 25,
    fontFamily: "inter_medium",
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 14,
    fontFamily: "inter_regular",
  },
  panel: {
    backgroundColor: colors.DEFAULT_WHITE,
    borderRadius: 10,
    paddingTop: 20,
    paddingHorizontal: 20,
    width: "100%",
    marginVertical: 30,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 5,
  },
  locationButton: {
    paddingVertical: 20,
    paddingHorizontal: 20,
    alignItems: "center",
    backgroundColor: "#f6f6f6",
    marginVertical: 10,
    borderRadius: 10,
  },
});

export default RegisterLocation;
