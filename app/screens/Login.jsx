import React, {useEffect, useState} from 'react';

import {
  Dimensions,
  Image,
  Keyboard,
  TouchableOpacity,
  View,
} from 'react-native';
import {StyledButton, StyledText, StyledTextInput} from '../components';
import {BottomSheetComponent} from '../components/BottomSheet';
import {apiURL} from '../constants/urls';
import {postData} from '../services/api/apiService';

const initialdata = {
  username: '',
  password: '',
};

const Login = ({navigation}) => {
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const [isEditDisable, setEditDisable] = useState(true);
  const [data, setData] = useState(initialdata);
  const screenHeight = Dimensions.get('window').height;
  const imageHeight = screenHeight * 0.55;

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
      navigation.navigate('Panel');
    } catch (err) {}
  };

  return (
    <>
      <View tw="flex-1 content-center bg-[#FE7240]">
        {!isKeyboardVisible ? (
          <Image
            source={require('../assets/images/symbol.png')}
            style={{height: imageHeight, width: '100%'}}
            resizeMode="contain"></Image>
        ) : (
          <View tw="justify-center items-center m-10 ">
            <StyledText tw="text=[15px]">PREDINE</StyledText>
          </View>
        )}

        <BottomSheetComponent style={{justifyContent: 'center'}}>
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
          <View tw="flex-row justify-center items-center ">
            <StyledText tw="text-black" text="Not Registered?"></StyledText>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('InputEmail');
              }}>
              <StyledText tw="text-[#FE7240]" text=" Click Here!"></StyledText>
            </TouchableOpacity>
          </View>
        </BottomSheetComponent>
      </View>
    </>
  );
};
export default Login;
