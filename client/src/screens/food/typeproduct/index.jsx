import { View, Text } from "react-native";
import { InfinityScroll } from "../../../components/food";
import { BackButton, HeaderPage } from "../../../components/form";

const TypeProduct = ({ route, navigation }) => {
  const { type } = route.params;

  return (
    <View>
      <HeaderPage>
        <BackButton onPress={() => navigation.goBack()} />
        <View style={{ alignItems: "center", marginTop: 45 }}>
          <Text style={{ fontSize: 18, fontFamily: "inter_medium" }}>
            {type}
          </Text>
        </View>
      </HeaderPage>
      <InfinityScroll typeProduct={type} navigation={navigation} />
    </View>
  );
};

export default TypeProduct;
