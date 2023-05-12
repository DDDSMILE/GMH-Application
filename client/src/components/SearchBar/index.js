import { useState } from "react";
import { View, TextInput } from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import Ionicons from "react-native-vector-icons/Ionicons";

const SearchBar = ({ navigation }) => {
  const [search, setSearch] = useState();
  return (
    <View
      style={{
        display: "flex",
        flexDirection: "row",
        width: "95%",
        backgroundColor: "#e6e6ec",
        padding: 10,
        borderRadius: 10,
      }}
    >
      <AntDesign
        name="search1"
        size={24}
        style={{ paddingHorizontal: 5, paddingRight: 15 }}
        onPress={() => navigation.navigate("search", { search: search })}
      />
      <TextInput
        value={search}
        onChangeText={(text) => setSearch(text)}
        placeholder="Tìm kiếm sản phẩm..."
        keyboardType="default"
        width={"80%"}
      />
    </View>
  );
};

export default SearchBar;
