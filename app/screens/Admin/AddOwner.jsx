import {
  StyledText,
  StyledView,
  StyledTextInput,
  StyledButton,
} from '../../components';
import {getData, postData} from '../../services/api/apiService';
import {apiURL} from '../../constants/urls';
import {useEffect, useState} from 'react';
import {useForm, Controller} from 'react-hook-form';
import CustomDropdown from '../../components/CustomDropdown';
import {ScrollView} from 'react-native-gesture-handler';

const AddOwner = () => {
  const [roleData, setRoleData] = useState([]);
  const [restaurantData, setRestaurantData] = useState([]);

  const getRole = async () => {
    try {
      const res = await getData(apiURL.GET_ROLE);
      setRoleData(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const getRes = async () => {
    try {
      const res = await getData(apiURL.GET_RESTAURANT);
      setRestaurantData(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getRes();
    getRole();
  }, []);

  const {
    control,
    handleSubmit,
    reset,
    formState: {errors, isValid},
  } = useForm({mode: 'onBlur'});

  const onSubmit = async data => {
    console.log(data);

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
        res: '',
        role: '',
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
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
          }}
          render={({field: {onChange, onBlur, value}}) => (
            <StyledTextInput
              maxLength={50}
              placeholder="First Name"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
        />
        {errors.first_name && (
          <StyledText tw="text-red-500 ml-6">
            {errors.first_name.message}
          </StyledText>
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
          }}
          render={({field: {onChange, onBlur, value}}) => (
            <StyledTextInput
              maxLength={50}
              placeholder="Last Name"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
        />
        {errors.last_name && (
          <StyledText tw="text-red-500 ml-6">
            {errors.last_name.message}
          </StyledText>
        )}

        <Controller
          control={control}
          name="phone_number"
          rules={{
            required: {value: true, message: 'Phone number is required'},
            pattern: {value: /^\d{10}$/, message: 'Enter a valid phone number'},
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
          <StyledText tw="text-red-500 ml-6">
            {errors.phone_number.message}
          </StyledText>
        )}

        <Controller
          control={control}
          name="email"
          rules={{
            required: {value: true, message: 'Email is required'},
            pattern: {value: /^\S+@\S+\.\S+$/, message: 'Enter a valid email'},
          }}
          render={({field: {onChange, onBlur, value}}) => (
            <StyledTextInput
              placeholder="Email"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
        />
        {errors.email && (
          <StyledText tw="text-red-500 ml-6">{errors.email.message}</StyledText>
        )}

        <Controller
          control={control}
          name="address"
          rules={{
            required: {value: true, message: 'Address is required'},
            maxLength: {
              value: 150,
              message: 'Address cannot exceed 150 characters',
            },
          }}
          render={({field: {onChange, onBlur, value}}) => (
            <StyledTextInput
              placeholder="Address"
              maxLength={150}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
        />
        {errors.address && (
          <StyledText tw="text-red-500 ml-6">
            {errors.address.message}
          </StyledText>
        )}

        <Controller
          control={control}
          name="restaurant_name"
          rules={{
            required: {value: true, message: 'Restaurant Name is required'},
          }}
          render={({field: {onChange, onBlur, value}}) => (
            <StyledTextInput
              maxLength={50}
              placeholder="Restaurant Name"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
        />
        {errors.restaurant_name && (
          <StyledText tw="text-red-500 ml-6">
            {errors.restaurant_name.message}
          </StyledText>
        )}

        <Controller
          control={control}
          name="res"
          rules={{
            required: {value: true, message: 'Restaurant Category is required'},
            maxLength: {
              value: 50,
              message: 'Restaurant Category cannot exceed 50 characters',
            },
          }}
          render={({field: {onChange, onBlur, value}}) => (
            <CustomDropdown
              placeholder="Restaurant Category"
              data={restaurantData}
              value={value}
              onChange={onChange}
              onBlur={onBlur}
            />
          )}
        />
        {errors.res && (
          <StyledText tw="text-red-500 ml-6">{errors.res.message}</StyledText>
        )}

        <Controller
          control={control}
          name="role"
          rules={{required: {value: true, message: 'Owners Role is required'}}}
          render={({field: {onChange, onBlur, value}}) => (
            <CustomDropdown
              placeholder="Owner Role"
              data={roleData}
              value={value}
              onChange={onChange}
              onBlur={onBlur}
            />
          )}
        />
        {errors.role && (
          <StyledText tw="text-red-500 ml-6">{errors.role.message}</StyledText>
        )}
      </ScrollView>

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

export default AddOwner;
