import React, {useEffect, useState} from 'react';
import {BackHandler} from 'react-native';
import {DialogBox} from '../components';
import {PaperProvider} from 'react-native-paper';
import {StyledText, StyledView} from '../components';

const Dashboard = () => {
  const [visible, setVisible] = useState(false);

  const showDialog = () => setVisible(true);
  const hideDialog = () => setVisible(false);

  useEffect(() => {
    const backAction = () => {
      showDialog();
      return true;
    };
    BackHandler.addEventListener('hardwareBackPress', backAction);
  }, []);
  return (
    <PaperProvider>
      <StyledView tw="flex-1 justify-center items-center">
        <DialogBox
          visible={visible}
          showDialog={showDialog}
          hideDialog={hideDialog}
        />
        <StyledText tw="font-bold text-black text-lg">
          Welcome to Predine!
        </StyledText>
      </StyledView>
    </PaperProvider>
  );
};
export default Dashboard;
