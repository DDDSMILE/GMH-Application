import {
  View,
  Text,
  Image,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";

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
          navigation.navigate("typeproduct", { type: text });
        }}
      >
        {pathImage && <Image source={pathImage} />}
      </TouchableOpacity>
      <Text style={{ fontFamily: "inter_medium", color: "#868889" }}>
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
