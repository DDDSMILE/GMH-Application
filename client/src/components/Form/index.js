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

const PageForm = ({ children }) => {
  return (
    <View style={styles.page}>
      <ImageBackground
        style={{
          height: 350,
          width: "100%",
          opacity: 0.9,
        }}
        source={{
          uri: "https://res.cloudinary.com/du93troxt/image/upload/v1679647812/pattern_uxizbj.png",
        }}
      >
        <View style={styles.content}>
          <Image
            style={styles.logo}
            source={{
              uri: "https://res.cloudinary.com/du93troxt/image/upload/v1679648686/Logo_mrr43p.png",
            }}
          />
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
      {children}
    </View>
  );
};

const ButtonForm = ({ text, width }) => {
  return (
    <LinearGradient
      colors={["#AEDC81", "#6CC51D"]}
      style={styles.btn}
      width={width}
    >
      <Text style={styles.btnText}>{text}</Text>
    </LinearGradient>
  );
};

const InputForm = ({ label, icon, inputType, keyboardType }) => {
  return (
    <View style={styles.formInput}>
      {icon}
      {inputType === "password" ? (
        <TextInput
          placeholder={label}
          keyboardType={keyboardType}
          style={{ flex: 1, paddingVertical: 0 }}
          secureTextEntry={true}
        />
      ) : (
        <TextInput
          placeholder={label}
          keyboardType={keyboardType}
          style={{ flex: 1, paddingVertical: 0 }}
        />
      )}
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
        source={{
          uri: "https://res.cloudinary.com/du93troxt/image/upload/v1679647812/pattern_uxizbj.png",
        }}
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

const styles = StyleSheet.create({
  /* PageForm */
  page: {
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
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
    fontWeight: 400,
    textAlign: "center",
  },
  subtitle: {
    fontWeight: 600,
    fontSize: 14,
    textAlign: "center",
  },
  /* ButtonForm */
  btn: {
    alignItems: "center",
    justifyContent: "center",
    height: 50,
    marginTop: "auto",
    borderRadius: 15,
    marginBottom: 20,
  },
  btnText: {
    color: "#fff",
    fontWeight: 600,
    fontSize: 16,
    lineHeight: 24,
  },
  /* Input Form */
  formInput: {
    flexDirection: "row",
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
    paddingBottom: 8,
    marginBottom: 25,
  },
});

export { PageForm, ButtonForm, InputForm, HeaderPage, BackButton };
