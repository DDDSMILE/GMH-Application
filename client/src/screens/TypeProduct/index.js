import { View, Text } from "react-native";
import InfinityScroll from "../../components/InfinityScroll";
import { BackButton, HeaderPage } from "../../components/Form";

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
      <InfinityScroll type={type} />
    </View>
  );
};

export default TypeProduct;
