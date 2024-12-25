import { useFocusEffect } from '@react-navigation/native';
import React, { useCallback, useEffect, useState } from 'react';
import {
  BackHandler,
  Dimensions,
  Image,
  Keyboard,
  TouchableOpacity,
  View,
} from 'react-native';
import { PaperProvider } from 'react-native-paper';
import {
  DialogBox,
  StyledButton,
  StyledText,
  StyledTextInput,
} from '../components';
import { BottomSheetComponent } from '../components/BottomSheet';
import { apiURL } from '../constants/urls';
import { postData } from '../services/api/apiService';

const initialdata = {
  username: '',
  password: '',
};

const Login = ({navigation}) => {
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const [isEditDisable, setEditDisable] = useState(true);
  const [data, setData] = useState(initialdata);
  const [visible, setVisible] = useState(false);
  const screenHeight = Dimensions.get('window').height;
  const imageHeight = screenHeight * 0.55;

  const showDialog = () => setVisible(true);
  const hideDialog = () => setVisible(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardVisible(true);
      },
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardVisible(false);
      },
    );

    const backAction = () => {
      showDialog();
      return true;
    };

    BackHandler.addEventListener('hardwareBackPress', backAction);

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
      BackHandler.removeEventListener('hardwareBackPress', backAction);
    };
  }, []);

  useFocusEffect(
    useCallback(() => {
      setData(initialdata);
      setEditDisable(true);
    }, []),
  );

  const handleLogin = async () => {
    const loginData = {
      username: data.username,
      password: data.password,
    };

    try {
      const res = await postData(apiURL.LOGIN, loginData);
      setEditDisable(false);
      setData(initialdata);
      navigation.navigate('PanelAuth');
    } catch (err) {}
  };

  return (
    <PaperProvider>
      <View tw="flex-1 content-center bg-[#FE7240]">
        <DialogBox
          visible={visible}
          showDialog={showDialog}
          hideDialog={hideDialog}
          title={'Exit'}
          text={'Do you really want to Exit?'}
          btnText1={'Yes'}
          btnText2={'Cancel'}
          onPressbtn1={() => {
            BackHandler.exitApp(), setVisible(false);
          }}
          onPressbtn2={hideDialog}
        />

        {!isKeyboardVisible ? (
          <Image
            source={require('../assets/images/symbol.png')}
            style={{height: imageHeight, width: '100%'}}
            resizeMode="contain"></Image>
        ) : (
          <View tw="justify-center items-center m-10 ">
            <StyledText tw="text=[15px] font-bold">PREDINE</StyledText>
          </View>
        )}

        <BottomSheetComponent style={{justifyContent: 'center'}}>
          <StyledText
            tw="text-black font-bold text-[18px] text-center mb-2"
            text="LOGIN"></StyledText>

          <StyledTextInput
            autoCapitalize="none" 
            keyboardType="email-address"
            label="Email"
            placeholder="Enter Your Email"
            value={data.username}
            editable={isEditDisable}
            onChangeText={val => {
              setData(prev => ({...prev, username: val}));
            }}></StyledTextInput>

          <StyledTextInput
            placeholder="Enter your Password"
            label="Password"
            editable={isEditDisable}
            value={data.password}
            onChangeText={val => {
              setData(prev => ({...prev, password: val}));
            }}
            secureTextEntry={true}></StyledTextInput>

          <StyledButton
            label="LOGIN"
            onPress={() => {
              handleLogin();
            }}></StyledButton>
          <View tw="flex-row justify-center items-center ">
            <StyledText
              tw="text-black font-bold"
              text="Not Registered?"></StyledText>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('InputEmail');
              }}>
              <StyledText
                tw="text-[#FE7240] font-bold"
                text=" Click Here!"></StyledText>
            </TouchableOpacity>
          </View>
        </BottomSheetComponent>
      </View>
    </PaperProvider>
  );
};

export default Login;
