import {useFocusEffect} from '@react-navigation/native';
import React, {useCallback} from 'react';
import {Controller, useForm} from 'react-hook-form';
import {ScrollView} from 'react-native-gesture-handler';
import {PaperProvider} from 'react-native-paper';
import {
  StyledButton,
  StyledText,
  StyledTextInput,
  StyledView,
} from '../../components';
import {apiURL} from '../../constants/urls';
import {postData} from '../../services/api/apiService';

const AddChef = () => {
  useFocusEffect(
    useCallback(() => {
      reset({
        first_name: '',
        last_name: '',
        phone_number: '',
        email: '',
      });
    }, [reset]),
  );

  const {
    control,
    handleSubmit,
    reset,
    formState: {errors, isValid},
  } = useForm({
    mode: 'onBlur',
    defaultValues: {
      first_name: '',
      last_name: '',
      phone_number: '',
      email: '',
    },
  });

  const onSubmit = async data => {
    try {
      const response = await postData(apiURL.ADD_CHEF, data);
      reset({
        first_name: '',
        last_name: '',
        email: '',
        phone_number: '',
      });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <PaperProvider>
      <StyledView tw="flex-1 bg-white">
        <ScrollView tw="bg-white">
          <Controller
            control={control}
            name="first_name"
            rules={{
              required: {value: true, message: 'First Name is required'},
              minLength: {
                value: 2,
                message: 'First Name must be at least 2 characters long',
              },
              maxLength: {
                value: 50,
                message: 'First Name cannot exceed 50 characters',
              },
            }}
            render={({field: {onChange, onBlur, value}}) => (
              <StyledTextInput
                maxLength={50}
                label="First Name"
                placeholder="First Name"
                onBlur={onBlur}
                onChangeText={onChange}
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
              required: {value: true, message: 'Last Name is required'},
              minLength: {
                value: 2,
                message: 'Last Name must be at least 2 characters long',
              },
              maxLength: {
                value: 50,
                message: 'Last Name cannot exceed 50 characters',
              },
            }}
            render={({field: {onChange, onBlur, value}}) => (
              <StyledTextInput
                maxLength={50}
                label="Last Name"
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
            name="email"
            rules={{
              required: {value: true, message: 'Email is required'},
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: 'Invalid email format',
              },
            }}
            render={({field: {onChange, onBlur, value}}) => (
              <StyledTextInput
                label="Email"
                placeholder="Email"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                keyboardType="email-address"
              />
            )}
          />
          {errors.email && (
            <StyledText
              tw="text-red-500 ml-6"
              text={errors.email.message}></StyledText>
          )}

          <Controller
            control={control}
            name="phone_number"
            rules={{
              required: {value: true, message: 'Phone Number is required'},
              pattern: {
                value: /^[6-9]\d{9}$/,
                message: 'Phone Number must be 10 digits',
              },
            }}
            render={({field: {onChange, onBlur, value}}) => (
              <StyledTextInput
                label="Phone Number"
                placeholder="Phone Number"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                keyboardType="numeric"
                maxLength={10}
              />
            )}
          />
          {errors.phone_number && (
            <StyledText
              tw="text-red-500 ml-6"
              text={errors.phone_number.message}></StyledText>
          )}

          {/* Submit Button */}
          <StyledButton
            onPress={handleSubmit(onSubmit)}
            tw="mt-6"
            label="SUBMIT"
            disabled={!isValid}>
            <StyledText tw="text-white">Register</StyledText>
          </StyledButton>
        </ScrollView>
      </StyledView>
    </PaperProvider>
  );
};

export default AddChef;
