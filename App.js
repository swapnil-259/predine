import React, { useEffect, useState } from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import BootSplash from "react-native-bootsplash";
import { TouchableOpacity } from "react-native";
import AntDesign from 'react-native-vector-icons/AntDesign';
import Login from "./app/screens/Login";
import Dashboard from "./app/screens/Dashboard";
import Toast from "react-native-toast-message";
import VerifyOTP from "./app/screens/Registration/VerifyOTP";
import InputEmail from "./app/screens/Registration/InputEmail";
import MainRegister from "./app/screens/Registration/MainRegister";
import useLoaderInterceptor from "./app/services/api/interceptor";
import { LoaderProvider } from "./app/context/LoaderContext";
import Loader from "./app/components/Loader";
import { baseURL } from "./app/services/api/axios";
import axiosInstance from "./app/services/api/axios";
import { apiURL } from "./app/constants/urls";

const Stack = createNativeStackNavigator();

const App = () => {
  const [statusCode, setStatusCode] = useState('');

  useEffect(() => {
    checkAuthentication();
  }, []);

  const checkAuthentication = async () => {
    console.log(baseURL + apiURL.CHECK_AUTH);
    try {
      const res = await axiosInstance.get(baseURL + apiURL.CHECK_AUTH);
      console.log(res.status);
      setStatusCode(res.status);
    } catch (err) {
      console.log(err.response.status);
      setStatusCode(err.response.status);
    }
  };

  return (
    <LoaderProvider>
      <MainApp statusCode={statusCode} />
    </LoaderProvider>
  );
};

const MainApp = ({ statusCode }) => {
  console.log("Staus", statusCode)
  useLoaderInterceptor();
  return (!statusCode ? null : statusCode == 401 ? (
    <NavigationContainer onReady={() => {
      BootSplash.hide({ fade: true });
    }} >
      <Loader />
      <Stack.Navigator>
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
        <Stack.Screen name="Dashboard" component={Dashboard} options={{ headerShown: false }} />
        <Stack.Screen name="InputEmail" component={InputEmail} options={{ headerShown: false }} />
        <Stack.Screen name="VerifyOTP"
          component={VerifyOTP}
          options={({ navigation }) => ({
            headerTitleAlign: 'center',
            headerLeft: () => (
              <TouchableOpacity onPress={() => navigation.goBack()} >
                <AntDesign name="arrowleft" size={25} color="black" />
              </TouchableOpacity>
            ),
          })}
        />
        <Stack.Screen
          onReady={() => {
            BootSplash.hide({ fade: true });
          }}
          name="Register"
          component={MainRegister}
          options={{ headerShown: true, headerTitleAlign: 'center', headerLeft: () => null }}
        />
      </Stack.Navigator>

      <Toast />
    </NavigationContainer>

  ) : (
    <NavigationContainer onReady={() => {
      BootSplash.hide({ fade: true });
    }}>
      <Loader />
      <Stack.Navigator>
        <Stack.Screen name="Dashboard" component={Dashboard} options={{ headerShown: false }} />
      </Stack.Navigator>
      <Toast />
    </NavigationContainer>
  )

  );
};

export default App;
