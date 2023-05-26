import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  HomeScreen,
  Addresses,
  ManageAddress,
  ManageInformationScreen,
  ManagePasswordScreen,
} from "../../screens/profile";

const Stack = createNativeStackNavigator();

const ProfileNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="home"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="home" component={HomeScreen} />
      <Stack.Screen name="addresses" component={Addresses} />
      <Stack.Screen name="manage_address" component={ManageAddress} />
      <Stack.Screen name="information" component={ManageInformationScreen} />
      <Stack.Screen name="password" component={ManagePasswordScreen} />
    </Stack.Navigator>
  );
};

export default ProfileNavigator;
