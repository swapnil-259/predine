import React, { useEffect } from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import BootSplash from "react-native-bootsplash";

const Stack = createNativeStackNavigator();
import Login from "./app/screens/Login";
import Dashboard from "./app/screens/Dashboard";
import Toast from "react-native-toast-message";
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

const MainApp = () => {
  useLoaderInterceptor();

  return (
    <NavigationContainer onReady={() => {
      BootSplash.hide({ fade: true });
    }}>

      <Loader />
      <Stack.Navigator screenOptions={{
        headerShown: false, statusBarColor: 'transparent',
        statusBarTranslucent: true,
      }}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Dashboard" component={Dashboard} />
      </Stack.Navigator>
      <Toast />
    </NavigationContainer>
  );
};

export default App;
