import React from 'react';
import {Text, View} from 'react-native';
import {styled} from 'nativewind';
const StyledText = styled(Text);
const StyledView = styled(View);

const Dashboard = () => {
  return (
    <StyledView tw="flex-1 justify-center items-center">
      <StyledText tw="font-bold text-black text-lg">
        Welcome to Predine!
      </StyledText>
    </StyledView>
  );
};
export default Dashboard;
