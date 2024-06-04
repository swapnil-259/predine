import React, {useEffect, useState} from 'react';

import {View, Image, BackHandler, Text, Keyboard} from 'react-native';
import {BottomSheetComponent} from '../components/BottomSheet';
import {StyledTextInput, StyledButton, StyledText} from '../components';
import {postData} from '../services/apiService';
import {apiURL} from '../constants/urls';

const initialdata = {
  username: '',
  password: '',
};

const Login = ({navigation}) => {
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const [isEditDisable, setEditDisable] = useState(true);
  const [data, setData] = useState(initialdata);

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

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  const handleLogin = async () => {
    const loginData = {
      username: data.username,
      password: data.password,
    };

    try {
      const res = await postData(apiURL.LOGIN, loginData);
      setEditDisable(false);
      setData(initialdata);
      navigation.navigate('Dashboard');
    } catch (err) {}
  };

  return (
    <>
      <View tw="flex-1 content-center bg-[#FE7240]">
        {!isKeyboardVisible ? (
          <Image
            source={require('../assets/images/symbol.png')}
            tw="self-center"></Image>
        ) : (
          <View tw="justify-center items-center m-10 ">
            <StyledText tw="text=[15px]">PREDINE</StyledText>
          </View>
        )}

        <BottomSheetComponent>
          <StyledText
            tw="text-black font-bold text-[18px] text-center mb-2"
            text="LOGIN"></StyledText>

          <StyledTextInput
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
          <StyledText tw="text-black text-center" text="Not Registered?">
            <StyledText tw="text-[#FE7240]" text=" Click Here!"></StyledText>
          </StyledText>
        </BottomSheetComponent>
      </View>
    </>
  );
};
export default Login;
