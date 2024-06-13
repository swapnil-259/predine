import React from 'react';
import {useForm, Controller} from 'react-hook-form';
import {
  StyledView,
  StyledText,
  StyledTextInput,
  StyledButton,
} from '../../components';
import {apiURL} from '../../constants/urls';
import {postData} from '../../services/api/apiService';

const MainRegister = ({navigation, route}) => {
  console.log('route', route.params);
  const {
    control,
    handleSubmit,
    formState: {errors, isValid},
    getValues,
  } = useForm({mode: 'onBlur'});

  const onSubmit = async data => {
    data['email'] = route.params.email;
    console.log('data', data);
    try {
      const res = await postData(apiURL.USER_REGISTRATION, data);
      console.log(res);
      navigation.navigate('Dashboard');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <StyledView tw="flex-1 bg-white pt-4 ">
      <Controller
        control={control}
        name="first_name"
        rules={{
          required: {
            value: true,
            message: 'First Name is required',
          },
        }}
        render={({field: {onChange, onBlur, value}}) => (
          <StyledTextInput
            placeholder="First Name"
            onBlur={onBlur}
            onChangeText={value => onChange(value)}
            value={value}
          />
        )}
      />
      {errors.firstName && (
        <StyledText tw="text-red-500 ml-6">
          {errors.firstName.message}
        </StyledText>
      )}

      <Controller
        control={control}
        name="last_name"
        rules={{
          required: {
            value: true,
            message: 'Last Name is required',
          },
        }}
        render={({field: {onChange, onBlur, value}}) => (
          <StyledTextInput
            placeholder="Last Name"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
      />
      {errors.lastName && (
        <StyledText tw="text-red-500 ml-6">
          {errors.lastName.message}
        </StyledText>
      )}

      <Controller
        control={control}
        name="phone_number"
        rules={{
          required: {value: true, message: 'Phone number is required'},
          pattern: {
            value: /^\d{10}$/,
            message: 'Enter a valid phone number',
          },
        }}
        render={({field: {onChange, onBlur, value}}) => (
          <StyledTextInput
            placeholder="Phone Number"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            keyboardType="phone-pad"
          />
        )}
      />
      {errors.phoneNumber && (
        <StyledText tw="text-red-500 ml-6">
          {errors.phoneNumber.message}
        </StyledText>
      )}

      <Controller
        control={control}
        name="password"
        rules={{
          required: {
            value: true,
            message: 'Password is required',
          },
        }}
        render={({field: {onChange, onBlur, value}}) => (
          <StyledTextInput
            placeholder="Password"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            secureTextEntry
          />
        )}
      />
      {errors.password && (
        <StyledText tw="text-red-500 ml-6">
          {errors.password.message}
        </StyledText>
      )}

      <Controller
        control={control}
        name="confirm_password"
        rules={{
          required: {
            value: true,
            message: 'Confirm Password is required',
          },
          validate: value =>
            value === getValues('password') || 'Passwords do not match!',
        }}
        render={({field: {onChange, onBlur, value}}) => (
          <StyledTextInput
            placeholder="Confirm Password"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            secureTextEntry
          />
        )}
      />
      {errors.confirmPassword && (
        <StyledText tw="text-red-500 ml-6">
          {errors.confirmPassword.message}
        </StyledText>
      )}

      <StyledButton
        onPress={handleSubmit(onSubmit)}
        tw="mt-6"
        label={'SUBMIT'}
        disabled={!isValid}>
        <StyledText tw="text-white">Register</StyledText>
      </StyledButton>
    </StyledView>
  );
};

export default MainRegister;
