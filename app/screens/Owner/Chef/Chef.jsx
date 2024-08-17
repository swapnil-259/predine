import {useFocusEffect} from '@react-navigation/native';
import {useCallback, useState} from 'react';
import {useForm} from 'react-hook-form';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {PaperProvider} from 'react-native-paper';
import {NavigationCard, StyledView} from '../../../components';
import {apiURL} from '../../../constants/urls';
import {getData, postData} from '../../../services/api/apiService';
import ViewMenuCard from './ViewMenuCard';

const Chef = () => {
  const [visibleModal, setVisibleModal] = useState(null);
  const [chefData, setChefData] = useState([]);

  const showModal = modalName => setVisibleModal(modalName);
  const hideModal = () => {
    setVisibleModal(null);
    reset({
      first_name: '',
      last_name: '',
      email: '',
      phone_number: '',
      password: '',
      conf_password: '',
    });
  };

  useFocusEffect(
    useCallback(() => {
      reset({
        first_name: '',
        last_name: '',
        email: '',
        phone_number: '',
        password: '',
        conf_password: '',
      });
      getChefs();
    }, []),
  );

  const {
    control,
    handleSubmit,
    reset,
    getValues,

    formState: {errors, isValid},
  } = useForm({mode: 'onBlur'});

  const onSubmit = async data => {
    const {conf_password, ...payload} = data;
    console.log(payload);

    try {
      const response = await postData(apiURL.ADD_CHEF, payload);
      console.log(response);
      reset({
        first_name: '',
        last_name: '',
        email: '',
        phone_number: '',
        password: '',
        conf_password: '',
      });
      hideModal();
    } catch (err) {
      console.log(err);
    }
  };

  const getChefs = async () => {
    try {
      const response = await getData(apiURL.GET_CHEFS);
      console.log(response.data);
      setChefData(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <PaperProvider>
      <StyledView tw="flex-1 bg-white">
        <TouchableOpacity
          style={{
            margin: 20,
            marginBottom: 0,
          }}
          onPress={() => showModal('assignChef')}>
          <NavigationCard
            title={'Assign Chef'}
            iconName={'account-plus'}></NavigationCard>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            margin: 20,
            marginBottom: 0,
          }}
          onPress={() => showModal('viewAssignedChef')}>
          <NavigationCard
            title={'View Assigned Chef'}
            iconName={'chevron-right'}
          />
        </TouchableOpacity>
        <ViewMenuCard
          visibleModal={visibleModal}
          hideModal={hideModal}
          control={control}
          handleSubmit={handleSubmit}
          reset={reset}
          onSubmit={onSubmit}
          errors={errors}
          isValid={isValid}
          getValues={getValues}
          chefData={chefData}></ViewMenuCard>
        {/* <ScrollView tw="bg-white">
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
                value: /^[A-Za-z]+$/,
                message: 'First Name can only contain letters',
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
              pattern: {
                value: /^[A-Za-z]+$/,
                message: 'Last Name can only contain letters',
              },
            }}
            render={({field: {onChange, onBlur, value}}) => (
              <StyledTextInput
                maxLength={50}
                label={'Last Name'}
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
              pattern: {
                value: /^\d{10}$/,
                message: 'Enter a valid 10-digit phone number',
              },
            }}
            render={({field: {onChange, onBlur, value}}) => (
              <StyledTextInput
                placeholder="Phone Number"
                label={'Phone Number'}
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
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: 'Enter a valid email',
              },
            }}
            render={({field: {onChange, onBlur, value}}) => (
              <StyledTextInput
                placeholder="Email"
                label={'Email'}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
          />
          {errors.email && (
            <StyledText tw="text-red-500 ml-6">
              {errors.email.message}
            </StyledText>
          )}

          <Controller
            control={control}
            name="password"
            rules={{
              required: {value: true, message: 'Password is required'},
              maxLength: {
                value: 150,
                message: 'Password cannot exceed 150 characters',
              },
              pattern: {
                value:
                  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                message:
                  'Password must be at least 8 characters long, contain an uppercase letter, a lowercase letter, a number, and a special character',
              },
            }}
            render={({field: {onChange, onBlur, value}}) => (
              <StyledTextInput
                placeholder="Password"
                maxLength={150}
                label={'Password'}
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
            name="conf_password"
            rules={{
              required: {value: true, message: 'Confirm Password is required'},
              validate: value =>
                value === watch('password') || 'Passwords do not match',
            }}
            render={({field: {onChange, onBlur, value}}) => (
              <StyledTextInput
                maxLength={150}
                placeholder="Confirm Password"
                label={'Confirm Password'}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                secureTextEntry
              />
            )}
          />
          {errors.conf_password && (
            <StyledText tw="text-red-500 ml-6">
              {errors.conf_password.message}
            </StyledText>
          )}
        </ScrollView>

        <StyledButton
          onPress={handleSubmit(onSubmit)}
          tw="mt-6"
          label={'SUBMIT'}
          disabled={!isValid}>
          <StyledText tw="text-white">Register</StyledText>
        </StyledButton> */}
      </StyledView>
    </PaperProvider>
  );
};

export default Chef;
