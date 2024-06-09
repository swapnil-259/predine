import React, {useEffect} from 'react';
import {Text, View, Alert, BackHandler} from 'react-native';
import {styled} from 'nativewind';
import {DialogBox} from '../components';
const StyledText = styled(Text);
const StyledView = styled(View);

const Dashboard = () => {
  const [visible, setVisible] = useState(false);

  const showDialog = () => setVisible(true);
  const hideDialog = () => setVisible(false);
  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );
    const backAction = () => {
      showDialog();
      return true;
    };
  }, []);
  return (
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
  );
};
export default Dashboard;
