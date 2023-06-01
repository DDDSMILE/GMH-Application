import { View, Text, TouchableOpacity } from "react-native";
import { BackButton, HeaderPage } from "../../../components/form";
import { useState } from "react";
import Collapsible from "react-native-collapsible";
import { RadioButton, TextInput } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../../../constants";
import {
  InfinityScroll,
  OrderResumeCTA,
  SearchBar,
} from "../../../components/food";
import { useSelector } from "react-redux";
import colors from "../../../constants/colors";
import { AntDesign } from "@expo/vector-icons";

const typeItems = [
  {
    label: "rau củ",
    value: "rau củ",
  },
  {
    label: "trái cây",
    value: "trái cây",
  },
  {
    label: "đồ uống",
    value: "đồ uống",
  },
  {
    label: "thực phẩm",
    value: "thực phẩm",
  },
  {
    label: "khác",
    value: "khác",
  },
];

const SearchScreen = ({ route, navigation }) => {
  const searchText = route.params.search;
  const [collapsed, setCollapsed] = useState(true);
  const [typeProduct, setTypeProduct] = useState("all");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const { items, total } = useSelector((state) => state.order);

  const toggleCollapsible = () => {
    setCollapsed(!collapsed);
  };

  const handleSort = () => {
    sortOrder === "asc" ? setSortOrder("desc") : setSortOrder("asc");
  };
  const [search, setSearch] = useState(searchText);

  return (
    <View>
      <HeaderPage>
        <BackButton onPress={() => navigation.goBack()} />
        <View style={{ alignItems: "center", marginTop: 45 }}>
          <Text style={{ fontSize: 18, fontFamily: "inter_medium" }}>
            Tìm kiếm
          </Text>
        </View>
      </HeaderPage>
      <View
        style={{
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View
          style={{
            display: "flex",
            width: "90%",
            backgroundColor: "#e6e6ec",
            borderRadius: 10,
          }}
        >
          <TextInput
            value={search}
            onChangeText={(text) => setSearch(text)}
            placeholder="Tìm kiếm sản phẩm..."
            keyboardType="default"
            autoCorrect={false}
            autoCapitalize="none"
          />
        </View>
        <TouchableOpacity onPress={toggleCollapsible}>
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              borderColor: colors.GREEN_LOGO_TWO,
              borderWidth: 1,
              width: 120,
              height: 30,
              borderRadius: 5,
              margin: 10,
            }}
          >
            <Text
              style={{
                fontSize: 14,
                fontFamily: "inter_medium",
                color: colors.GREEN_LOGO_TWO,
              }}
            >
              Lọc sản phẩm
            </Text>
          </View>
        </TouchableOpacity>
        <Collapsible collapsed={collapsed}>
          <View
            style={{
              flexDirection: "row",
            }}
          >
            {typeItems.map((option) => (
              <View
                key={option.value}
                style={{
                  padding: 10,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    textTransform: "uppercase",
                    fontFamily: "inter_medium",
                    fontSize: 13,
                  }}
                >
                  {option.label}
                </Text>
                <RadioButton
                  value={option.value}
                  status={
                    typeProduct === option.value ? "checked" : "unchecked"
                  }
                  onPress={() => setTypeProduct(option.value)}
                />
              </View>
            ))}
          </View>
          <View style={{ marginHorizontal: 10 }}>
            <Text style={{ fontFamily: "inter_medium", fontSize: 16 }}>
              Lọc theo giá sản phẩm
            </Text>
            <View style={{ flexDirection: "row" }}>
              <TextInput
                mode="outlined"
                label="Giá thấp nhất"
                placeholder="VNĐ"
                value={minPrice}
                onChangeText={(text) => setMinPrice(text)}
                keyboardType="numeric"
                style={{ width: "45%", marginRight: 30 }}
              />
              <TextInput
                mode="outlined"
                label="Giá cao nhất"
                placeholder="VNĐ"
                value={maxPrice}
                onChangeText={(text) => setMaxPrice(text)}
                keyboardType="numeric"
                style={{ width: "45%" }}
              />
            </View>
          </View>
          <View style={{ flexDirection: "row", margin: 10 }}>
            <Text
              style={{
                marginRight: 5,
                fontFamily: "inter_medium",
                fontSize: 16,
              }}
            >
              Lọc theo giá trị tăng / giảm dần:
            </Text>
            <TouchableOpacity onPress={handleSort}>
              <Ionicons
                name={sortOrder === "asc" ? "ios-arrow-up" : "ios-arrow-down"}
                size={24}
                color={Colors.GREEN_LOGO_TWO}
              />
            </TouchableOpacity>
          </View>
        </Collapsible>
      </View>
      <InfinityScroll
        typeProduct={typeProduct}
        searchText={search}
        minPrice={minPrice}
        maxPrice={maxPrice}
        sortOrder={sortOrder}
        navigation={navigation}
      />
      {items.length > 0 && (
        <OrderResumeCTA
          text="Sản phẩm đã thêm"
          total={total}
          navigateTo="checkout"
          itemsLength={items.length}
        />
      )}
    </View>
  );
};

export default SearchScreen;
