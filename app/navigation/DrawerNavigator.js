// DrawerNavigator.js
import {createDrawerNavigator} from '@react-navigation/drawer';
import React, {useEffect, useState} from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import DrawerText from '../components/DrawerText';
import {apiURL} from '../constants/urls';
import AddOwner from '../screens/Admin/AddOwner';
import RestauratConfig from '../screens/Admin/RestaurantConfig/RestaurantConfig';
import OwnerList from '../screens/Admin/ViewOwner/OwnerList';
import ShowOrders from '../screens/Chef/ShowOrders';
import Dashboard from '../screens/Dashboard';
import ManageOrders from '../screens/Owner-Chef/ManageOrders';
import AddChef from '../screens/Owner/AddChef';
import AddMenu from '../screens/Owner/AddMenu';
import MenuConfig from '../screens/Owner/MenuConfig/MenuConfig';
import Orders from '../screens/Owner/Orders';
import Profile from '../screens/Owner/Profile/Profile';
import ViewMenu from '../screens/Owner/ViewMenu';
import OrderSummary from '../screens/User/OrderSummary';
import PrivacyPolicy from '../screens/User/Privacy Policy/PrivacyPolicy';
import UserDashboard from '../screens/User/UserDashboard';
import UserProfile from '../screens/User/UserProfile';
import {getData} from '../services/api/apiService';
const Drawer = createDrawerNavigator();

const navigationMap = {
  AddOwner: AddOwner,
  OwnerList: OwnerList,
  Dashboard: Dashboard,
  RestaurantConf: RestauratConfig,
  AddMenu: AddMenu,
  Profile: Profile,
  MenuConfig: MenuConfig,
  ViewMenu: ViewMenu,
  AddChef: AddChef,
  UserProfile: UserProfile,
  OrderSummary: OrderSummary,
  UserDashboard: UserDashboard,
  PrivacyPolicy: PrivacyPolicy,
  Orders: Orders,
  ShowOrders: ShowOrders,
  ManageOrders: ManageOrders,
};

const iconMap = {
  MaterialCommunityIcons: MaterialCommunityIcons,
  AntDesign: AntDesign,
};

export const LeftPanel = async () => {
  try {
    const res = await getData(apiURL.LEFT_PANEL);
    return res.data;
  } catch (err) {
    console.log(err);
    return [];
  }
};

const DrawerNavigator = () => {
  const [panelData, setPanelData] = useState([]);

  useEffect(() => {
    const fetchPanelData = async () => {
      const data = await LeftPanel();
      setPanelData(data);
    };
    fetchPanelData();
  }, []);

  if (!panelData.length) {
    return null;
  }

  return (
    <Drawer.Navigator
      screenOptions={{
        headerTintColor: '#fff',
        drawerLabelStyle: {
          fontSize: 15,
          fontWeight: 'bold',
        },
      }}
      drawerContent={props => <DrawerText {...props} />}>
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
                  fontSize: 22,
                  fontWeight: 'bold',
                },
                headerStyle: {
                  backgroundColor: '#FE7240',
                },
                drawerActiveTintColor: '#FE7240',
                drawerInactiveTintColor: '#000',
                drawerIcon: ({focused}) => (
                  <Icon
                    name={each.icon}
                    size={20}
                    color={focused ? '#FE7240' : '#000'}
                  />
                ),
                headerShown:
                  each.component === 'UserDashboard' ||
                  each.component === 'ShowOrders' ||
                  each.compoenent === 'RestaurantMenu' ||
                  each.component === 'Dashboard'
                    ? false
                    : true,
              }}
            />
          );
        })}
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
