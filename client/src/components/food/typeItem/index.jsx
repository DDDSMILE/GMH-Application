import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import colors from "../../../constants/colors";

const TypeItem = ({ text, pathImage, color, navigation }) => {
  return (
    <View
      style={{
        margin: 2,
        padding: 2,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <TouchableOpacity
        backgroundColor={color}
        style={styles.content}
        onPress={() => {
          navigation.navigate("type_product", { type: text });
        }}
      >
        {pathImage && <Image source={pathImage} />}
      </TouchableOpacity>
      <Text
        style={{
          fontFamily: "inter_medium",
          fontSize: 12,
          color: colors.GRAY_VARIANT,
          textTransform: "uppercase",
          textAlign: "center",
        }}
      >
        {text}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  content: {
    width: 60,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
  },
});

export default TypeItem;
