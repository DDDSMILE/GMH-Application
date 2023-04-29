import { StyleSheet, Text, View } from "react-native";
import {
  BackButton,
  ButtonForm,
  HeaderPage,
  NotFoundForm,
} from "../../components/Form";
import { Images } from "../../constants";
import { Display } from "../../utils";

const EmptyOrder = ({ navigation }) => {
  return (
    <View>
      <HeaderPage>
        <BackButton onPress={() => navigation.goBack()} />
        <View style={{ alignItems: "center", marginTop: 45 }}>
          <Text style={{ fontSize: 18, fontFamily: "inter_medium" }}>
            Giỏ hàng
          </Text>
        </View>
      </HeaderPage>
      <NotFoundForm
        image={Images.BACKETIMAGE}
        title={"Chưa có gì"}
        subtitle={" Hãy đặt thêm đơn hàng tại đây"}
      />
      <View style={{ alignItems: "center", paddingTop: Display.setWidth(40) }}>
        <ButtonForm text={"Đặt hàng"} />
      </View>
    </View>
  );
};

export default EmptyOrder;
