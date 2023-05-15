import { View, Text, TextInput, StyleSheet } from "react-native";

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
    fontSize: 12,
    fontFamily: "inter_medium",
    textTransform: "uppercase",
    color: "#c6c6c6",
    marginBottom: 8,
  },
  input: {
    width: "100%",
    fontSize: 14,
    fontFamily: "inter_extra_bold",
    color: "#000",
  },
});

export default Input;
