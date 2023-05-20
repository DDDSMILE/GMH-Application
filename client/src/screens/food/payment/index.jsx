import { StyleSheet, Text, View } from "react-native";
import { BackButton, HeaderPage } from "../../../components/form";

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
    </View>
  );
};

export default PaymentScreen;

const styles = StyleSheet.create({});
