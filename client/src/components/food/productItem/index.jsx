import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import colors from "../../../constants/colors";
import { Display } from "../../../utils";
import { Button } from "react-native-elements";
import { Colors } from "../../../constants";

const ProductItem = ({ navigation, item }) => {
  return (
    <TouchableOpacity style={styles.container}>
      <View style={styles.image}>
        {item.photo && (
          <Image
            source={{ uri: item.photo }}
            style={{ width: 120, aspectRatio: 1 }}
          />
        )}
      </View>
      <View style={styles.content}>
        <Text
          style={{
            fontSize: 14,
            fontFamily: "inter_semi_bold",
            height: 45,
          }}
        >
          {item.name}
        </Text>
        <Text
          style={{
            fontSize: 15,
            fontFamily: "inter_medium",
            color: "#808080",
            paddingBottom: 10,
          }}
        >
          {item.price.toLocaleString("vi", {
            style: "currency",
            currency: "VND",
          })}
        </Text>

        <Button
          size="md"
          buttonStyle={{
            borderColor: colors.GREEN_TEXT_ONE,
            borderWidth: 2,
            width: Display.setWidth(30),
          }}
          titleStyle={{
            fontFamily: "inter_medium",
            color: colors.GREEN_TEXT_TWO,
            fontSize: 13,
          }}
          title="Xem chi tiết"
          type="outline"
          onPress={() => {
            navigation.navigate("detail", { item: item });
          }}
        />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 3,
    marginBottom: 15,
    display: "flex",
    height: Display.setHeight(20),
    flexDirection: "row",
    backgroundColor: colors.DEFAULT_WHITE,
    justifyContent: "center",
    padding: 15,
  },
  content: {
    paddingLeft: 10,
    width: Display.setWidth(50),
  },
  box: {
    flexDirection: "row",
    alignItems: "center",
  },
  button: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: Colors.GREEN_TEXT_TWO,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontFamily: "inter_extra_bold",
    color: "#fff",
  },
  quantity: {
    marginHorizontal: 10,
    fontFamily: "inter_extra_bold",
    fontSize: 16,
    color: Colors.GREEN_TEXT_TWO,
  },
});

export default ProductItem;
