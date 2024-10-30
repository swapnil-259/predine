import React from 'react';
import {Controller, useForm} from 'react-hook-form';
import {
  StyledButton,
  StyledText,
  StyledTextInput,
  StyledView,
} from '../../components';
import {apiURL} from '../../constants/urls';
import {postData} from '../../services/api/apiService';

const MainRegister = ({navigation, route}) => {
  const {
    control,
    handleSubmit,
    formState: {errors, isValid},
    getValues,
  } = useForm({mode: 'onBlur'});

  const onSubmit = async data => {
    data['email'] = route.params.email;
    console.log('data', route.params.email);
    try {
      const res = await postData(apiURL.USER_REGISTRATION, data);
      console.log(res);
      navigation.navigate('PanelAuth');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <StyledView tw="flex-1 bg-white pt-4">
      <Controller
        control={control}
        name="first_name"
        rules={{
          required: {
            value: true,
            message: 'First Name is required',
          },
          minLength: {
            value: 2,
            message: 'First Name must be at least 2 characters long',
          },
          maxLength: {
            value: 100,
            message: 'First Name cannot be more than 100 characters',
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
      {errors.first_name && (
        <StyledText
          tw="text-red-500 ml-6"
          text={errors.first_name.message}></StyledText>
      )}

      <Controller
        control={control}
        name="last_name"
        rules={{
          required: {
            value: true,
            message: 'Last Name is required',
          },
          minLength: {
            value: 2,
            message: 'Last Name must be at least 2 characters long',
          },
          maxLength: {
            value: 100,
            message: 'Last Name cannot be more than 100 characters',
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
      {errors.last_name && (
        <StyledText
          tw="text-red-500 ml-6"
          text={errors.last_name.message}></StyledText>
      )}

      <Controller
        control={control}
        name="phone_number"
        rules={{
          required: {value: true, message: 'Phone number is required'},
          pattern: {
            value: /^[6-9]\d{9}$/,
            message: 'Enter a valid Indian phone number',
          },
          maxLength: {
            value: 10,
            message: 'Phone number cannot be more than 10 digits',
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
      {errors.phone_number && (
        <StyledText
          tw="text-red-500 ml-6"
          text={errors.phone_number.message}></StyledText>
      )}

      <Controller
        control={control}
        name="password"
        rules={{
          required: {
            value: true,
            message: 'Password is required',
          },
          minLength: {
            value: 8,
            message: 'Password must be at least 8 characters long',
          },
          maxLength: {
            value: 16,
            message: 'Password cannot be more than 16 characters',
          },
          pattern: {
            value:
              /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/,
            message:
              'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character',
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
        <StyledText
          tw="text-red-500 ml-6"
          text={errors.password.message}></StyledText>
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
      {errors.confirm_password && (
        <StyledText
          tw="text-red-500 ml-6"
          text={errors.confirm_password.message}></StyledText>
      )}

      <StyledButton
        onPress={handleSubmit(onSubmit)}
        tw="mt-6"
        label={'SUBMIT'}
        disabled={!isValid}>
        <StyledText tw="text-white" text={'Register'}></StyledText>
      </StyledButton>
    </StyledView>
  );
};

export default MainRegister;
