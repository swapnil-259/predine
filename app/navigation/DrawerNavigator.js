// DrawerNavigator.js
import { createDrawerNavigator } from '@react-navigation/drawer';
import React, { useEffect, useState } from "react";
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import DrawerText from "../components/DrawerText";
import { apiURL } from "../constants/urls";
import AddOwner from "../screens/Admin/AddOwner";
import RestauratConfig from "../screens/Admin/RestaurantConfig";
import OwnerList from "../screens/Admin/ViewOwner/OwnerList";
import Dashboard from "../screens/Dashboard";
import { getData } from "../services/api/apiService";

const Drawer = createDrawerNavigator();

const navigationMap = {
    'AddOwner': AddOwner,
    'OwnerList': OwnerList,
    'Dashboard': Dashboard,
    'RestaurantConf': RestauratConfig,
};

const iconMap = {
    "MaterialCommunityIcons": MaterialCommunityIcons,
    "AntDesign": AntDesign

}

const DrawerNavigator = () => {
    const [panelData, setPanelData] = useState([]);

    const LeftPanel = async () => {
        try {
            const res = await getData(apiURL.LEFT_PANEL);
            setPanelData(res.data);
        } catch (err) {
            console.log(err);
        }
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


