import { View, Text, Image, StyleSheet } from "react-native";
import colors from "../../constants/colors";
import { Display } from "../../utils";

const ProductItem = ({ name, photo, price }) => {
  return (
    <View style={styles.content}>
      {photo && (
        <Image source={{ uri: photo }} style={{ width: 100, aspectRatio: 1 }} />
      )}
      <Text
        style={{
          fontSize: 14,
          fontFamily: "inter_medium",
          color: colors.GREEN_TEXT_TWO,
        }}
      >
        {price.toLocaleString("vi", { style: "currency", currency: "VND" })}
      </Text>
      <Text
        style={{
          fontSize: 14,
          fontFamily: "inter_semi_bold",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {name}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  content: {
    justifyContent: "center",
    alignItems: "center",
    margin: 5,
    width: Display.setWidth(40),
    height: Display.setHeight(20),
  },
});

export default ProductItem;
