// DrawerNavigator.js
import React, { useEffect, useState } from "react";
import { createDrawerNavigator } from '@react-navigation/drawer';
import { getData } from "../services/api/apiService";
import { apiURL } from "../constants/urls";
import AddOwner from "../screens/Admin/AddOwner";
import ViewOwner from "../screens/Admin/ViewOwner";
import Dashboard from "../screens/Dashboard";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import DrawerText from "../components/DrawerText";

const Drawer = createDrawerNavigator();

const navigationMap = {
    'AddOwner': AddOwner,
    'ViewOwner': ViewOwner,
    'Dashboard': Dashboard
};

const iconMap = {
    "MaterialCommunityIcons": MaterialCommunityIcons
}

const DrawerNavigator = () => {
    const [panelData, setPanelData] = useState([]);

    const LeftPanel = async () => {
        try {
            const res = await getData(apiURL.LEFT_PANEL);
            console.log("res", res);
            setPanelData(res.data);
        } catch (err) {
            console.log(err);
        }
    };
    const handleLogout = () => {
        console.log('Logout pressed');

    };

    useEffect(() => {
        LeftPanel();
    }, []);

    if (!panelData.length) {
        return null;
    }

    return (
        <Drawer.Navigator
            screenOptions={{
                headerTintColor: '#fff'
            }}
            drawerContent={(props) => <DrawerText {...props}
            />}>
            {panelData
                .sort((a, b) => a.order - b.order)
                .map((each, index) => {
                    const Component = navigationMap[each.component];
                    const Icon = iconMap[each.icon_type];

                    return (
                        <Drawer.Screen
                            name={each.name}
                            component={Component}
                            key={index}

                            options={{
                                headerTitleAlign: 'center',
                                headerTitleStyle: {
                                    color: '#fff',
                                    fontSize: 20,
                                    fontWeight: 'bold',
                                },
                                headerStyle: {
                                    backgroundColor: '#FE7240',

                                },
                                drawerActiveTintColor: '#FE7240',
                                drawerIcon: ({ focused }) => (
                                    <Icon
                                        name={each.icon}
                                        size={20}
                                        color={focused ? '#FE7240' : '#000'}
                                    />
                                )
                            }}
                        />
                    );
                })}

        </Drawer.Navigator>
    );
};

export default DrawerNavigator;


{/* <Drawer.Screen */ }
// name="Logout"
// options={{
// drawerIcon: ({ focused }) => (
// <MaterialCommunityIcons
// name="logout"
// size={20}
// color={focused ? '#FE7240' : '#000'}
// />
// ),
// drawerLabel: 'Logout'
// }}
// >
// {() => (
// <DrawerText>
// {/* Custom content for logout button */}
// <MaterialCommunityIcons.Button
// name="logout"
// backgroundColor="#FFF"
// color="#FE7240"
// onPress={handleLogout}
// >
// Logout
// </MaterialCommunityIcons.Button>
// </DrawerText>
// )}
// </Drawer.Screen>