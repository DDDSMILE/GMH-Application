import { View, Text } from "react-native";
import { Input } from "react-native-elements";
import AntDesign from "react-native-vector-icons/AntDesign";
import Ionicons from "react-native-vector-icons/Ionicons";

const SearchBar = () => {
  return (
    <View>
      <Input
        placeholder="Tìm kiếm..."
        leftIcon={<AntDesign name="search1" size={24} />}
        rightIcon={<Ionicons name="filter" size={24} />}
      />
    </View>
  );
};

export default SearchBar;
