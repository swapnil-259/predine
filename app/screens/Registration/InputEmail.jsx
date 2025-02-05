import React, {useEffect, useState} from 'react';
import {
  BackHandler,
  Dimensions,
  Image,
  Keyboard,
  TouchableOpacity,
  View,
} from 'react-native';
import {Button, PaperProvider} from 'react-native-paper';
import {DialogBox, StyledText, StyledTextInput} from '../../components';
import {BottomSheetComponent} from '../../components/BottomSheet';
import {apiURL} from '../../constants/urls';
import {postData} from '../../services/api/apiService';

const InputEmail = ({navigation}) => {
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const [isEditDisable, setEditDisable] = useState(true);
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState(''); // State for email validation error
  const [visible, setVisible] = useState(false);
  const screenHeight = Dimensions.get('window').height;
  const imageHeight = screenHeight * 0.55;

  const showDialog = () => setVisible(true);
  const hideDialog = () => setVisible(false);

  const validateEmail = email => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

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
    };
  }, []);

  const verifyEmail = async () => {
    if (!validateEmail(email)) {
      setEmailError('Please enter a valid email address');
      return;
    }
    setEmailError('');

    const data = {email: email};

    try {
      const res = await postData(apiURL.VERIFY_EMAIL, data);
      setEditDisable(false);
      setEmail('');
      if (res.email_verified && !res.user_registered) {
        navigation.navigate('Register', {email});
      } else if (!res.email_verified && !res.user_registered) {
        navigation.navigate('VerifyOTP', {email});
      } else if (res.email_verified && res.user_registered) {
        navigation.navigate('Logout');
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <PaperProvider>
      <View tw="flex-1 justify-center bg-[#FE7240]">
        {!isKeyboardVisible ? (
          <Image
            source={require('../../assets/images/symbol.png')}
            style={{height: imageHeight, width: '100%'}}
            resizeMode="contain"></Image>
        ) : (
          <View tw="justify-center items-center m-10">
            <StyledText tw="text=[15px]" text={'PREDINE'}></StyledText>
          </View>
        )}
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
        <BottomSheetComponent>
          <StyledText
            tw="text-black font-bold text-[22px] text-center mb-2"
            text="EMAIL VERIFICATION"></StyledText>

          <StyledTextInput
            style={{marginBottom: 0}}
            label="Email"
            placeholder="Enter Your Email"
            value={email}
            onChangeText={val => setEmail(val)}></StyledTextInput>

          {emailError ? (
            <StyledText tw="pl-8 text-red-500" text={emailError}></StyledText>
          ) : null}

          <Button
            mode="contained"
            onPress={() => {
              verifyEmail();
            }}
            style={{backgroundColor: '#FE7240', margin: 20}}
            labelStyle={{
              color: '#fff',
              fontWeight: 'bold',
              fontSize: 16,
            }}>
            {'VERIFY EMAIL'}
          </Button>

          {/* <StyledButtonTrans
            label={'Continue Registration Process'}
            onPress={() => checkEmail()}></StyledButtonTrans> */}

          <View tw="flex-1 justify-end mb-8 mt-1">
            <View tw="flex-row justify-center">
              <StyledText
                tw="text-black font-bold text-[17px]"
                text="Already Registered?"></StyledText>
              <TouchableOpacity onPress={() => navigation.navigate('Logout')}>
                <StyledText
                  tw="text-[#FE7240] font-bold text-[17px]"
                  text=" Back to Login!"></StyledText>
              </TouchableOpacity>
            </View>
          </View>
        </BottomSheetComponent>
      </View>
    </PaperProvider>
  );
};

export default InputEmail;
