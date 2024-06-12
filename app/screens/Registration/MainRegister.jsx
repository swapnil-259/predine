import React from 'react';
import {useForm, Controller} from 'react-hook-form';
import {
  StyledView,
  StyledText,
  StyledTextInput,
  StyledButton,
} from '../../components';

const MainRegister = ({navigation, route}) => {
  const {
    control,
    handleSubmit,
    formState: {errors, isValid},
    getValues, // Destructure getValues from useForm
  } = useForm({mode: 'onBlur'});

  const onSubmit = data => {
    navigation.navigate('Dashboard');
  };

  // Custom validation function for confirm password
  const validateConfirmPassword = value => {
    const password = getValues('password');
    return value === password || 'Passwords do not match';
  };

  return (
    <StyledView tw="flex-1 bg-white pt-4 ">
      <Controller
        control={control}
        name="firstName"
        rules={{required: 'First name is required'}}
        render={({field: {onChange, onBlur, value}}) => (
          <StyledTextInput
            placeholder="First Name"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            tw="mb-2"
          />
        )}
      />
      {errors.firstName && (
        <StyledText tw="text-red-500">{errors.firstName.message}</StyledText>
      )}

      <Controller
        control={control}
        name="lastName"
        rules={{required: 'Last name is required'}}
        render={({field: {onChange, onBlur, value}}) => (
          <StyledTextInput
            placeholder="Last Name"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            tw="mb-2"
          />
        )}
      />
      {errors.lastName && (
        <StyledText tw="text-red-500">{errors.lastName.message}</StyledText>
      )}

      <Controller
        control={control}
        name="phoneNumber"
        rules={{
          required: 'Phone number is required',
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
            tw="mb-2"
          />
        )}
      />
      {errors.phoneNumber && (
        <StyledText tw="text-red-500">{errors.phoneNumber.message}</StyledText>
      )}

      <Controller
        control={control}
        name="password"
        rules={{required: 'Password is required'}}
        render={({field: {onChange, onBlur, value}}) => (
          <StyledTextInput
            placeholder="Password"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            secureTextEntry
            tw="mb-2"
          />
        )}
      />
      {errors.password && (
        <StyledText tw="text-red-500">{errors.password.message}</StyledText>
      )}

      <Controller
        control={control}
        name="confirmPassword"
        rules={{
          required: 'Confirm password is required',
          validate: validateConfirmPassword, // Use custom validation function
        }}
        render={({field: {onChange, onBlur, value}}) => (
          <StyledTextInput
            placeholder="Confirm Password"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            secureTextEntry
            tw="mb-2"
          />
        )}
      />
      {errors.confirmPassword && (
        <StyledText tw="text-red-500">
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
