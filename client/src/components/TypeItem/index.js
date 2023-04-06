import { View, Text, Image, StyleSheet } from "react-native";

const TypeItem = ({ text, pathImage, color }) => {
  return (
    <View
      style={{
        margin: 2,
        padding: 2,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <View backgroundColor={color} style={styles.content}>
        {pathImage && <Image source={pathImage} />}
      </View>
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
