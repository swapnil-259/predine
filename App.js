import React, { useEffect } from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import BootSplash from "react-native-bootsplash";

const Stack = createNativeStackNavigator();
import Dashboard from "./app/screens/Dashboard";


const App = () => {

  return (
    <NavigationContainer onReady={() => {
      BootSplash.hide({ fade: true })
    }} >
      <Stack.Navigator screenOptions={{
        headerShown: false, statusBarColor: 'transparent',
        statusBarTranslucent: true,
      }}>
        <Stack.Screen name="Dashboard" component={Dashboard}></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  )
}
export default App;