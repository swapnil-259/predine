import React, { useState, useEffect } from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { apiURL } from "../constants/urls";
import axiosInstance from "../services/api/axios";
import useLoaderInterceptor from "../services/api/interceptor";
import BootSplash from "react-native-bootsplash";
import { TouchableOpacity } from "react-native";
import AntDesign from 'react-native-vector-icons/AntDesign';
import Login from "../screens/Login";
import Dashboard from "../screens/Dashboard";
import VerifyOTP from "../screens/Registration/VerifyOTP";
import MainRegister from "../screens/Registration/MainRegister";
import InputEmail from "../screens/Registration/InputEmail";
import Toast from "react-native-toast-message";
import { baseURL } from "../services/api/axios";
import { LoaderProvider } from "../context/LoaderContext";
import Loader from "../components/Loader";
import { getData } from "../services/api/apiService";
import DrawerNaviagtor from "./DrawerNavigator";
const Stack = createNativeStackNavigator();


const MainStackNavigator = () => {
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


    const MainApp = ({ statusCode }) => {
        useLoaderInterceptor();
        return (!statusCode ? null : statusCode !== 200 ? (
            <NavigationContainer onReady={() => {
                BootSplash.hide({ fade: true });
            }} >
                <Loader />

                <Stack.Navigator>
                    <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
                    <Stack.Screen name="Panel" component={DrawerNaviagtor} options={{ headerShown: false }} />
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
                    <Stack.Screen name="Panel" component={DrawerNaviagtor} options={{ headerShown: false }} />
                </Stack.Navigator>
                <Toast />
            </NavigationContainer>
        )

        );
    };
    return (
        <LoaderProvider>
            <MainApp statusCode={statusCode} />
        </LoaderProvider>

    )
}

export default MainStackNavigator