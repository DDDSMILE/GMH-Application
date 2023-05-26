import { View, Text, TextInput, StyleSheet } from "react-native";
import colors from "../../../constants/colors";

const Input = ({ label, placeholder, value, onChangeText, ...props }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        {...props}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  label: {
    fontSize: 13,
    fontFamily: "inter_semi_bold",
    textTransform: "uppercase",
    color: colors.DEFAULT_BLACK,
    marginBottom: 8,
  },
  input: {
    width: "100%",
    fontSize: 14,
    fontFamily: "inter_medium",
    color: colors.GRAY_VARIANT,
  },
});

export default Input;
