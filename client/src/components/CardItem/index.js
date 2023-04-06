import { View, Text, Image, StyleSheet } from "react-native";
import { Display } from "../../utils";

const CardItem = ({ text, pathImage, color }) => {
  return (
    <View style={styles.content} backgroundColor={color}>
      <Text style={styles.text}>{text}</Text>
      {pathImage && <Image style={styles.image} source={pathImage} />}
    </View>
  );
};

const styles = StyleSheet.create({
  content: {
    display: "flex",
    flexDirection: "row",
    width: Display.setWidth(45),
    height: Display.setHeight(7),
    margin: 7,
    marginBottom: 10,
    alignItems: "center",
    justifyContent: "center",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 10,
  },
  text: {
    fontFamily: "inter_semi_bold",
    paddingRight: 20,
    fontSize: 17,
  },
  image: {
    width: 40,
    height: 40,
  },
});

export default CardItem;
