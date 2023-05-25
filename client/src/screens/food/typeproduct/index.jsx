import { View, Text } from "react-native";
import { InfinityScroll, OrderResumeCTA } from "../../../components/food";
import { BackButton, HeaderPage } from "../../../components/form";
import { useSelector } from "react-redux";

const TypeProduct = ({ route, navigation }) => {
  const { type } = route.params;
  const { items, total } = useSelector((state) => state.order);

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
      <View style={{ height: 600 }}>
        <InfinityScroll typeProduct={type} navigation={navigation} />
      </View>
      {items.length > 0 && (
        <OrderResumeCTA
          text="Sản phẩm đã thêm"
          total={total}
          navigateTo="order"
          itemsLength={items.length}
        />
      )}
    </View>
  );
};

export default TypeProduct;
