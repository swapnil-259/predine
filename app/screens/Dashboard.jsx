import React, { useEffect, useState } from 'react';
import { BackHandler } from 'react-native';
import { Appbar, PaperProvider } from 'react-native-paper';
import { DialogBox, StyledButton, StyledText, StyledView } from '../components';
import { apiURL } from '../constants/urls';
import { LeftPanel } from '../navigation/DrawerNavigator';
import { getData } from '../services/api/apiService';

const Dashboard = ({navigation}) => {
  const [visible, setVisible] = useState(false);

  const showDialog = () => setVisible(true);
  const hideDialog = () => setVisible(false);

  useEffect(() => {
    LeftPanel();
    const backAction = () => {
      showDialog();
      return true;
    };
    BackHandler.addEventListener('hardwareBackPress', backAction);
  }, []);

  const logoutUser = async () => {
    try {
      const res = await getData(apiURL.LOGOUT);
      navigation.navigate('Logout');
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <PaperProvider>
      <StyledView tw="flex-1">
      <Appbar.Header style={{backgroundColor: '#FE7420'}}>
        <Appbar.Action
          color="#fff"
          icon="menu"
          onPress={() => {
            navigation.openDrawer();
          }}
        />
        <Appbar.Content
          title="Dashboard"
          titleStyle={{
            fontSize: 24,
            fontWeight: '800',
            textAlign: 'center',
            color: '#fff',
          }}
        />
        <Appbar.Action
          icon="logout"
          onPress={() => {
            logoutUser();
          }}
          color="#fff"
        />
      </Appbar.Header>
      <StyledView tw="flex-1 items-center justify-center">
        <DialogBox
          visible={visible}
          showDialog={showDialog}
          hideDialog={hideDialog}
          title={'Exit'}
          text={'Do you really want to Exit?'}
          btnText1={'Yes'}
          btnText2={'Cancel'}
          onPressbtn1={() => BackHandler.exitApp()}
          onPressbtn2={hideDialog}
        />
        <StyledText
          tw="font-bold text-black text-lg"
          text={'Welcome to Predine!'}></StyledText>
        <StyledButton label={'logout'} onPress={logoutUser}></StyledButton>
        </StyledView>
      </StyledView>

    </PaperProvider>
  );
};
export default Dashboard;
