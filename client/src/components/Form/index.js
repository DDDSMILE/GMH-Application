import { LinearGradient } from "expo-linear-gradient";
import {
  Text,
  StyleSheet,
  ImageBackground,
  View,
  Image,
  TextInput,
} from "react-native";
import MaskedView from "@react-native-masked-view/masked-view";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Colors, Images } from "../../constants";
import colors from "../../constants/colors";
import { Display } from "../../utils";

const PageForm = ({ children }) => {
  return (
    <View style={styles.page}>
      <ImageBackground
        style={{
          height: 350,
          width: "100%",
          opacity: 0.9,
        }}
        source={Images.PATTERNBG}
      >
        <View style={styles.content}>
          <Image style={styles.logo} source={Images.LOGO} />
          <MaskedView
            style={{ height: 40 }}
            maskElement={<Text style={styles.title}>GMH</Text>}
          >
            <LinearGradient
              colors={["#53E88B", "#15BE77"]}
              start={{ x: 1, y: 1 }}
              end={{ x: 0, y: 0.33 }}
              style={{ flex: 1 }}
            />
          </MaskedView>
          <Text style={styles.subtitle}>Go to market help you</Text>
        </View>
      </ImageBackground>
      <View style={styles.container}>{children}</View>
    </View>
  );
};

const ButtonForm = ({ text, width, onPress }) => {
  return (
    <LinearGradient
      colors={[Colors.GREEN_TEXT_ONE, Colors.GREEN_TEXT_TWO]}
      style={styles.btn}
      width={width && Display.setWidth(width)}
    >
      <Text style={styles.btnText} onPress={onPress}>
        {text}
      </Text>
    </LinearGradient>
  );
};

const InputForm = ({
  label,
  icon,
  inputType,
  keyboardType,
  lastIcon,
  isShowPassword,
  onChangeText,
}) => {
  return (
    <View style={styles.formInput}>
      {icon}
      {inputType === "password" ? (
        <TextInput
          placeholder={label}
          keyboardType={keyboardType}
          style={{ flex: 1, paddingVertical: 0 }}
          secureTextEntry={isShowPassword ? false : true}
          onChangeText={onChangeText}
        />
      ) : (
        <TextInput
          placeholder={label}
          keyboardType={keyboardType}
          style={{ flex: 1, paddingVertical: 0 }}
          onChangeText={onChangeText}
        />
      )}
      {lastIcon}
    </View>
  );
};

const HeaderPage = ({ children }) => {
  return (
    <View>
      <ImageBackground
        style={{
          height: 100,
          width: "100%",
          opacity: 0.5,
        }}
        source={Images.PATTERNBG}
      >
        {children}
      </ImageBackground>
    </View>
  );
};

const BackButton = () => {
  return (
    <View
      style={{
        width: 45,
        height: 45,
        backgroundColor: "#feefdf",
        position: "absolute",
        left: 25,
        top: 38,
        borderRadius: 15,
      }}
    >
      <Ionicons
        name="chevron-back-outline"
        size={30}
        color={"#da6217"}
        style={{ left: 5, top: 5 }}
      />
    </View>
  );
};

const NotFoundForm = ({ children, image, title, subtitle }) => {
  return (
    <View>
      {children}
      <View style={styles.contentNotFound}>
        <Image source={image} />
        <View
          style={{
            alignItems: "center",
            paddingTop: 40,
            justifyContent: "center",
          }}
        >
          <Text style={styles.titleNotFound}>{title}</Text>
          <Text style={styles.subtitleNotFound}>{subtitle}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  /* PageForm */
  page: {
    backgroundColor: colors.DEFAULT_WHITE,
    flex: 1,
  },
  content: {
    paddingTop: 50,
  },
  logo: {
    marginLeft: "auto",
    marginRight: "auto",
    width: 150,
    aspectRatio: 1,
  },
  title: {
    fontSize: 30,
    fontFamily: "viga_regular",
    textAlign: "center",
  },
  subtitle: {
    fontFamily: "inter_semi_bold",
    fontSize: 14,
    textAlign: "center",
  },
  container: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  /* ButtonForm */
  btn: {
    alignItems: "center",
    justifyContent: "center",
    width: Display.setWidth(40),
    height: Display.setHeight(7),
    marginTop: "auto",
    borderRadius: 15,
    marginBottom: 20,
  },
  btnText: {
    color: "#fff",
    fontFamily: "inter_bold",
    fontSize: 16,
  },
  /* Input Form */
  formInput: {
    flexDirection: "row",
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
    paddingBottom: 8,
    marginBottom: 25,
  },
  /* NotFoundForm */
  contentNotFound: {
    alignItems: "center",
    justifyContent: "center",
    paddingTop: Display.setWidth(40),
  },
  titleNotFound: {
    fontSize: 28,
    fontFamily: "inter_bold",
  },
  subtitleNotFound: {
    fontSize: 17,
    paddingTop: 10,
    fontFamily: "inter_regular",
    color: colors.DEFAULT_GREY,
  },
});

export {
  PageForm,
  ButtonForm,
  InputForm,
  HeaderPage,
  BackButton,
  NotFoundForm,
};
