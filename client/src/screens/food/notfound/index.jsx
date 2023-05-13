import { View, Text } from "react-native";
import React from "react";
import { ButtonForm, NotFoundForm } from "../../../components/form";
import { Images } from "../../../constants";
import { Display } from "../../../utils";

const NotFound = () => {
  return (
    <View>
      <NotFoundForm
        image={Images.NOTWIFI}
        title={"Không có kết nối"}
        subtitle={`Hãy kiểm tra kết nối internet của bạn`}
      />
      <View style={{ alignItems: "center", paddingTop: Display.setWidth(40) }}>
        <ButtonForm text={"Thử lại"} />
      </View>
    </View>
  );
};

export default NotFound;
