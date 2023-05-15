import { StyleSheet, Text, View } from "react-native";
import { DismissKeyboardView, Input } from "../../../components/common";
import { BackButton, HeaderPage } from "../../../components/form";

const ManagePasswordScreen = ({ navigation }) => {
  return (
    <DismissKeyboardView style={styles.container}>
      <HeaderPage>
        <BackButton onPress={() => navigation.goBack()} />
        <View style={{ alignItems: "center", marginTop: 45 }}>
          <Text style={{ fontSize: 18, fontFamily: "inter_medium" }}>
            Thay đổi mật khẩu
          </Text>
        </View>
      </HeaderPage>
    </DismissKeyboardView>
  );
};

const styles = StyleSheet.create({});

export default ManagePasswordScreen;
