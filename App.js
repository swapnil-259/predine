import React, { useEffect } from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import BootSplash from "react-native-bootsplash";
import { TouchableOpacity } from "react-native";
import AntDesign from 'react-native-vector-icons/AntDesign';
const Stack = createNativeStackNavigator();
import Login from "./app/screens/Login";
import Dashboard from "./app/screens/Dashboard";
import Toast from "react-native-toast-message";
import VerifyOTP from "./app/screens/Registration/VerifyOTP";
import InputEmail from "./app/screens/Registration/InputEmail";
import useLoaderInterceptor from "./app/services/api/interceptor";
import { LoaderProvider } from "./app/context/LoaderContext";
import Loader from "./app/components/Loader";


const App = () => {
  return (
    <LoaderProvider>
      <MainApp />
    </LoaderProvider>
  );
};

const MainApp = ({ navigation }) => {
  useLoaderInterceptor();

  return (
    <NavigationContainer onReady={() => {
      BootSplash.hide({ fade: true });
    }}>

      <Loader />
      <Stack.Navigator >

        <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
        <Stack.Screen name="Dashboard" component={Dashboard} />
        <Stack.Screen name="InputEmail" component={InputEmail} options={{ headerShown: false }} />
        <Stack.Screen name="VerifyOTP" component={VerifyOTP}
          options={({ navigation }) => ({
            headerTitleAlign: 'center',
            headerLeft: () => (
              <TouchableOpacity onPress={() => navigation.goBack()} >
                <AntDesign name="arrowleft" size={25} color="black" />
              </TouchableOpacity>
            ),
          })} />
      </Stack.Navigator>
      <Toast />
    </NavigationContainer>
  );
};

export default App;
