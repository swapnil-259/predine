import React, {useState} from 'react';
import OTPTextView from 'react-native-otp-textinput';
import {PaperProvider} from 'react-native-paper';
import {
  StyledButton,
  StyledButtonTrans,
  StyledText,
  StyledView,
} from '../../components';
import {apiURL} from '../../constants/urls';
import {postData} from '../../services/api/apiService';

const initialdata = {
  email: '',
  otp: '',
};

const VerifyOTP = ({route, navigation}) => {
  const email = route.params.data.email;
  console.log('email', route.params);
  const [data, setData] = useState({...initialdata, email});

  const handleOTPChange = otp => {
    console.log('otp', otp);
    setData(prevData => ({
      ...prevData,
      otp: otp,
    }));
  };

  const verifyOTP = async () => {
    const otpData = {
      email: email,
      otp: data.otp,
    };
    console.log('otpdtaa', otpData);

    try {
      const res = await postData(apiURL.VERIFY_OTP, otpData);
      console.log(res);
      setData(initialdata);
      navigation.navigate('InputEmail');
    } catch (err) {
      setData(initialdata);
      console.log(err);
    }
  };
  const resendOTP = async () => {
    const otpData = {
      email: email,
    };
    try {
      const res = await postData(apiURL.RESEND_OTP, otpData);
      console.log(res);
      setData(initialdata);
    } catch (err) {
      setData(initialdata);
      console.log(err);
    }
  };

  return (
    <PaperProvider>
      <StyledView tw="flex-1 p-12 pb-5 items-center bg-white">
        <StyledText tw="text-black mt-10 mb-2 text-15px text-center text-[16px]">
          To confirm your Email ID, please enter the otp we sent to your
          registered Email
        </StyledText>
        <StyledText tw="text-black font-bold text-[17px]">{email}</StyledText>
        <StyledView tw="p-10">
          <OTPTextView
            ref={e => (otpInput = e)}
            inputCount={6}
            offTintColor={'#000'}
            tintColor={'#000'}
            initialdata={''}
            textInputStyle={{
              width: 20,
              color: '#000',
              borderBottomWidth: 1.5,
            }}
            handleTextChange={handleOTPChange}></OTPTextView>
        </StyledView>
        <StyledButton
          label={'Submit OTP'}
          onPress={() => {
            verifyOTP();
          }}></StyledButton>
        <StyledButtonTrans
          label={'Resend Verification OTP'}
          onPress={() => {
            resendOTP();
          }}></StyledButtonTrans>
        <StyledView tw="flex-1 justify-end">
          <StyledText tw="text-black font-bold text-[14px] mt-4">
            OTP Valid for 2 minutes
          </StyledText>
        </StyledView>
      </StyledView>
    </PaperProvider>
  );
};
export default VerifyOTP;
