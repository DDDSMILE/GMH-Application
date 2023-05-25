import { StyleSheet, Text, View, Image } from "react-native";
import { BackButton, ButtonForm, HeaderPage } from "../../../components/form";

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
      <View style={{ alignItems: "center", paddingTop: 10 }}>
        <Image
          style={{ width: 300, height: 500 }}
          source={{
            uri: "https://res.cloudinary.com/du93troxt/image/upload/v1684833358/343297211_791334718947540_8624720576045066549_n_noawmf.jpg",
          }}
        />
        <ButtonForm
          text={"Hoàn thành"}
          onPress={() => navigation.navigate("home")}
          width={150}
        />
      </View>
    </View>
  );
};

export default PaymentScreen;

const styles = StyleSheet.create({});
