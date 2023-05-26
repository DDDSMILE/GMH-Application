import { View, Keyboard } from "react-native";

const DismissKeyboardView = ({ children, style }) => {
  return (
    <View style={style} onPress={Keyboard.dismiss} accessible={false}>
      {children}
    </View>
  );
};

export default DismissKeyboardView;
