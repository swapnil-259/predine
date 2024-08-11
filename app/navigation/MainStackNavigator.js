import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { useEffect, useState } from "react";
import { TouchableOpacity } from "react-native";
import BootSplash from "react-native-bootsplash";
import Toast from "react-native-toast-message";
import AntDesign from 'react-native-vector-icons/AntDesign';
import Loader from "../components/Loader";
import { apiURL } from "../constants/urls";
import { LoaderProvider } from "../context/LoaderContext";
import useLoaderInterceptor from "../hooks/useLoaderInterceptor";
import ViewOwner from "../screens/Admin/ViewOwner/ViewOwner";
import Login from "../screens/Login";
import InputEmail from "../screens/Registration/InputEmail";
import MainRegister from "../screens/Registration/MainRegister";
import VerifyOTP from "../screens/Registration/VerifyOTP";
import axiosInstance, { baseURL } from "../services/api/axios";
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
                    <Stack.Screen name="Logout" component={Login} options={{ headerShown: false }} />
                    <Stack.Screen name="PanelAuth" component={DrawerNaviagtor} options={{ headerShown: false }} />
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
                    <Stack.Screen name="View Owner" component={ViewOwner} options={{
                        headerTitleAlign: 'center',
                        headerTitleStyle: {
                            color: '#fff',
                            fontSize: 20,
                            fontWeight: 'bold',
                        },
                        headerStyle: {
                            backgroundColor: '#FE7240',

                        },
                        headerTintColor: '#fff'

                    }} />
                    <Stack.Screen
                        onReady={() => {
                            BootSplash.hide({ fade: true });
                        }}
                        name="Register"
                        component={MainRegister}
                        options={{
                            headerShown: true, headerTitleAlign: 'center', headerLeft: () => null, headerStyle: {
                                backgroundColor: '#FE7240',
                            },
                            headerTintColor: '#fff'
                        }}
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
                    <Stack.Screen name="PanelAuth" component={DrawerNaviagtor} options={{ headerShown: false }} />
                    <Stack.Screen name="Logout" component={Login} options={{ headerShown: false }} />
                    <Stack.Screen name="View Owner" component={ViewOwner} options={{
                        headerTitleAlign: 'center',
                        headerTitleStyle: {
                            color: '#fff',
                            fontSize: 20,
                            fontWeight: 'bold',
                        },
                        headerStyle: {
                            backgroundColor: '#FE7240',

                        },
                        headerTintColor: '#fff'

                    }} />

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