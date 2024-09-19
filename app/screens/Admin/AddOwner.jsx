import {useFocusEffect} from '@react-navigation/native';
import {useCallback, useState} from 'react';
import {Controller, useForm} from 'react-hook-form';
import {ScrollView} from 'react-native-gesture-handler';
import {PaperProvider} from 'react-native-paper';
import {
  StyledButton,
  StyledText,
  StyledTextInput,
  StyledView,
} from '../../components';
import CustomDropdown from '../../components/CustomDropdown';
import {apiURL} from '../../constants/urls';
import {getData, postData} from '../../services/api/apiService';

const AddOwner = () => {
  const [roleData, setRoleData] = useState([]);
  const [restaurantData, setRestaurantData] = useState([]);

  const getRole = async () => {
    try {
      const res = await getData(apiURL.GET_ROLE);
      setRoleData(res.data);
      console.log('role', res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const getRes = async () => {
    try {
      const res = await getData(apiURL.GET_RESTAURANT);
      setRestaurantData(res.data);
      console.log('res', res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useFocusEffect(
    useCallback(() => {
      getRes();
      getRole();
      reset({
        first_name: '',
        last_name: '',
        email: '',
        phone_number: '',
        restaurant_name: '',
        address: '',
        res: null,
        role: null,
      });
    }, []),
  );

  const {
    control,
    handleSubmit,
    reset,
    formState: {errors, isValid},
  } = useForm({mode: 'onBlur'});

  const onSubmit = async data => {
    // console.log(data);

    try {
      const res = await postData(apiURL.OWNER_REGISTRATION, data);
      console.log(res);
      reset({
        first_name: '',
        last_name: '',
        email: '',
        phone_number: '',
        restaurant_name: '',
        address: '',
        res: null,
        role: null,
      });
    } catch (err) {
      console.log(err);
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
              maxLength: {
                value: 50,
                message: 'First Name cannot exceed 50 characters',
              },
              pattern: {
                value: /^[A-Za-z\s]+$/,
                message: 'First Name can only contain alphabets',
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
              maxLength: {
                value: 50,
                message: 'Last Name cannot exceed 50 characters',
              },
              pattern: {
                value: /^[A-Za-z\s]+$/,
                message: 'Last Name can only contain alphabets',
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
            name="phone_number"
            rules={{
              required: {value: true, message: 'Phone number is required'},
              pattern: {
                value: /^[6-9]\d{9}$/,
                message: 'Enter a valid 10-digit Indian mobile number',
              },
            }}
            render={({field: {onChange, onBlur, value}}) => (
              <StyledTextInput
                placeholder="Phone Number"
                label="Phone Number"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                keyboardType="phone-pad"
                maxLength={10}
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
            name="email"
            rules={{
              required: {value: true, message: 'Email is required'},
              pattern: {
                value: /^\S+@\S+\.\S+$/,
                message: 'Enter a valid email address',
              },
            }}
            render={({field: {onChange, onBlur, value}}) => (
              <StyledTextInput
                placeholder="Email"
                label="Email"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
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
            name="address"
            rules={{
              required: {value: true, message: 'Address is required'},
              maxLength: {
                value: 120,
                message: 'Address cannot exceed 120 characters',
              },
            }}
            render={({field: {onChange, onBlur, value}}) => (
              <StyledTextInput
                placeholder="Address"
                maxLength={120}
                label="Address"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
          />
          {errors.address && (
            <StyledText
              tw="text-red-500 ml-6"
              text={errors.address.message}></StyledText>
          )}

          <Controller
            control={control}
            name="restaurant_name"
            rules={{
              required: {value: true, message: 'Restaurant Name is required'},
              maxLength: {
                value: 30,
                message: 'Restaurant Name cannot exceed 30 characters',
              },
            }}
            render={({field: {onChange, onBlur, value}}) => (
              <StyledTextInput
                maxLength={30}
                placeholder="Restaurant Name"
                label="Restaurant Name"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
          />
          {errors.restaurant_name && (
            <StyledText
              tw="text-red-500 ml-6"
              text={errors.restaurant_name.message}></StyledText>
          )}

          <Controller
            control={control}
            name="res"
            rules={{
              required: {
                value: true,
                message: 'Restaurant Category is required',
              },
            }}
            render={({field: {onChange, onBlur, value}}) => (
              <CustomDropdown
                placeholder="Restaurant Category"
                data={restaurantData}
                label="Restaurant Category"
                value={value}
                onChange={onChange}
                onBlur={onBlur}
              />
            )}
          />
          {errors.res && (
            <StyledText
              tw="text-red-500 ml-6"
              text={errors.res.message}></StyledText>
          )}

          <Controller
            control={control}
            name="role"
            rules={{
              required: {value: true, message: 'Owner Role is required'},
            }}
            render={({field: {onChange, onBlur, value}}) => (
              <CustomDropdown
                placeholder="Owner Role"
                data={roleData}
                label="Owner Role"
                value={value}
                onChange={onChange}
                onBlur={onBlur}
              />
            )}
          />
          {errors.role && (
            <StyledText
              tw="text-red-500 ml-6"
              text={errors.role.message}></StyledText>
          )}
        </ScrollView>

        <StyledButton
          onPress={handleSubmit(onSubmit)}
          tw="mt-6"
          label="SUBMIT"
          disabled={!isValid}>
          <StyledText tw="text-white">Register</StyledText>
        </StyledButton>
      </StyledView>
    </PaperProvider>
  );
};

export default AddOwner;
