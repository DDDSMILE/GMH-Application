import { View, Text, TextInput } from "react-native";
import { Input } from "react-native-elements";
import AntDesign from "react-native-vector-icons/AntDesign";
import Ionicons from "react-native-vector-icons/Ionicons";

const SearchBar = ({ value, onChangeText }) => {
  return (
    <View
      style={{
        display: "flex",
        flexDirection: "row",
        width: "100%",
        backgroundColor: "#e6e6ec",
        padding: 10,
        borderRadius: 10,
      }}
    >
      <AntDesign
        name="search1"
        size={24}
        style={{ paddingHorizontal: 5, paddingRight: 10 }}
      />
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder="Tìm kiếm sản phẩm..."
        keyboardType="default"
        width={"80%"}
      />
      <Ionicons name="filter" size={24} style={{ paddingHorizontal: 5 }} />
    </View>
  );
};

export default SearchBar;
