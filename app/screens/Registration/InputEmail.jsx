import React, {useEffect, useState} from 'react';
import {
  View,
  Image,
  Keyboard,
  TouchableOpacity,
  Alert,
  BackHandler,
} from 'react-native';
import {BottomSheetComponent} from '../../components/BottomSheet';
import {
  StyledText,
  StyledTextInput,
  StyledButton,
  DialogBox,
  StyledButtonTrans,
} from '../../components';
import {PaperProvider} from 'react-native-paper';
import {apiURL} from '../../constants/urls';
import {postData, getData} from '../../services/api/apiService';

const InputEmail = ({navigation}) => {
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const [isEditDisable, setEditDisable] = useState(true);
  const [email, setEmail] = useState('');
  const [visible, setVisible] = useState(false);

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
    };
  }, []);

  const verifyEmail = async () => {
    const data = {
      email: email.email,
    };
    console.log('email', data);
    try {
      const res = await postData(apiURL.VERIFY_EMAIL, data);
      console.log(res);
      setEditDisable(false);
      setEmail('');
      navigation.navigate('VerifyOTP', {email: email});
    } catch (err) {
      console.log(err);
    }
  };
  const checkEmail = async () => {
    const data = {
      email: email.email,
    };
    console.log('dta', data);
    try {
      const res = await getData(apiURL.CHECK_EMAIL_VERF, data);
      console.log(res);
      setEditDisable(false);
      setEmail('');
      navigation.navigate('Register', {email: email});
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
            tw="self-center"></Image>
        ) : (
          <View tw="justify-center items-center m-10">
            <StyledText tw="text=[15px]">PREDINE</StyledText>
          </View>
        )}
        <DialogBox
          visible={visible}
          showDialog={showDialog}
          hideDialog={hideDialog}
        />

        <BottomSheetComponent>
          <StyledText
            tw="text-black font-bold text-[18px] text-center mb-2"
            text="EMAIL VERIFICATION"></StyledText>
          <StyledTextInput
            style={{marginBottom: 0}}
            label="Email"
            placeholder="Enter Your Email"
            value={email}
            // editable={isEditDisable}
            onChangeText={val => {
              setEmail(prev => ({...prev, email: val}));
            }}></StyledTextInput>

          <StyledButton
            label="VERIFY EMAIL"
            onPress={() => {
              console.log('button pressed');
              verifyEmail();
            }}></StyledButton>
          <StyledButtonTrans
            label={'Continue Registration Process'}
            onPress={() => {
              checkEmail();
            }}></StyledButtonTrans>
          <View tw="flex-1 justify-end mb-8 mt-1">
            <View tw="flex-row justify-center">
              <StyledText
                tw="text-black"
                text="Already Registered?"></StyledText>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('Login');
                }}>
                <StyledText
                  tw="text-[#FE7240]"
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
