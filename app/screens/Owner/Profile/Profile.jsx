import {useFocusEffect} from '@react-navigation/native';
import {useCallback, useState} from 'react';
import {useForm} from 'react-hook-form';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {PaperProvider} from 'react-native-paper';
import {NavigationCard, StyledView} from '../../../components';
import {apiURL} from '../../../constants/urls';
import {getData, postData} from '../../../services/api/apiService';
import ViewProfileCard from './ViewProfileCard';
const Profile = () => {
  const [ownerData, setOwnerData] = useState([]);
  const [visibleModal, setVisibleModal] = useState(null);

  const showModal = modalName => setVisibleModal(modalName);
  const hideModal = () => {
    setVisibleModal(null);
    reset({
      image: '',
      acc_holder_name: '',
      ifsc_code: '',
      acc_number: '',
      conf_acc_number: '',
      old_password: '',
      new_password: '',
      conf_password: '',
    });
  };
  const onSubmit = async data => {
    if (visibleModal === 'addBankDetails') {
      data = {
        acc_holder_name: data.acc_holder_name,
        ifsc_code: data.ifsc_code,
        acc_number: data.acc_number,
      };
      try {
        const response = await postData(apiURL.ADD_BANK_DETAILS, data);
        console.log('res', response);
        hideModal();
        reset({
          acc_holder_name: '',
          ifsc_code: '',
          acc_number: '',
          conf_acc_number: '',
        });
      } catch (err) {
        console.log('errr', err);
      }
    } else if (visibleModal === 'changePassword') {
      data = {
        old_password: data.old_password,
        new_password: data.new_password,
      };
      try {
        const response = await postData(apiURL.CHANGE_PASSWORD, data);
        hideModal();
        reset({
          old_password: '',
          new_password: '',
          conf_password: '',
        });
        console.log(response);
      } catch (err) {
        console.log(err);
      }
    } else if (visibleModal === 'changeImage') {
      const formData = new FormData();
      if (data.image && data.image.uri) {
        const imageUri = data.image.uri.replace('file://', '');

        formData.append('image', {
          uri: `file://${imageUri}`,
          name: data.image.fileName,
          type: data.image.type || 'image/jpeg',
        });
      }

      try {
        const response = await postData(apiURL.CHANGE_RES_PIC, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        reset({
          image: '',
        });
        hideModal();
        getProfileData();
        console.log(response.data);
      } catch (err) {
        console.error(err);
        hideModal();
        reset({
          image: '',
        });
      }
    }
  };
  const getProfileData = async () => {
    try {
      const res = await getData(apiURL.OWNER_DATA);
      console.log(res.data);
      setOwnerData(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useFocusEffect(
    useCallback(() => {
      getProfileData();
      reset({
        image: '',
        acc_holder_name: '',
        ifsc_code: '',
        acc_number: '',
        conf_acc_number: '',
        old_password: '',
        new_password: '',
        conf_password: '',
      });
    }, [reset]),
  );

  const {
    control,
    handleSubmit,
    reset,
    getValues,
    formState: {errors, isValid},
  } = useForm({
    mode: 'onBlur',
    defaultValues: {
      image: '',
      acc_holder_name: '',
      ifsc_code: '',
      acc_number: '',
      conf_acc_number: '',
      old_password: '',
      new_password: '',
      conf_password: '',
    },
  });

  return (
    <PaperProvider>
      <StyledView tw="flex-1 bg-white">
        <TouchableOpacity
          style={{
            margin: 20,
            marginBottom: 0,
          }}
          onPress={() => showModal('viewProfile')}>
          <NavigationCard
            title={'View Profile'}
            iconName={'account'}></NavigationCard>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            margin: 20,
            marginBottom: 0,
          }}
          onPress={() => showModal('changePassword')}>
          <NavigationCard title={'Change Password'} iconName={'key'} />
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            margin: 20,
            marginBottom: 0,
          }}
          onPress={() => showModal('changeImage')}>
          <NavigationCard
            title={'Change Restaurant Image'}
            iconName={'border-color'}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            margin: 20,
          }}
          onPress={() => showModal('addBankDetails')}>
          <NavigationCard title={'Add Bank Details'} iconName={'bank'} />
        </TouchableOpacity>
        <ViewProfileCard
          visibleModal={visibleModal}
          hideModal={hideModal}
          ownerData={ownerData}
          control={control}
          handleSubmit={handleSubmit}
          reset={reset}
          onSubmit={onSubmit}
          errors={errors}
          isValid={isValid}
          getValues={getValues}></ViewProfileCard>
      </StyledView>
    </PaperProvider>
  );
};

export default Profile;

{
  /* {ownerData.length === 0 ? (
          <StyledView tw=" flex-1 justify-center align-center">
            <StyledText tw="text-black text-center font-bold text-[18px]">
              Loading data...
            </StyledText>
          </StyledView>
        ) : (
          <StyledView>
            <OwnerDetailsCard
              data={ownerData}
              isEdit={false}></OwnerDetailsCard>
            <Portal>
              <Modal
                visible={visible}
                onDismiss={() => {
                  hideModal();
                  reset();
                }}
                contentContainerStyle={{
                  backgroundColor: 'white',
                  height: 300,
                  margin: 30,
                }}>
                <Controller
                  control={control}
                  name="image"
                  rules={{
                    required: {value: true, message: 'Dish Image is required'},
                  }}
                  render={({field: {onChange, onBlur, value}}) => (
                    <CustomImagePicker
                      onChange={onChange}
                      onBlur={onBlur}
                      value={value}
                    />
                  )}
                />
                {errors.image && (
                  <StyledText style={{color: 'red', marginLeft: 6}}>
                    {errors.image.message}
                  </StyledText>
                )}
                <StyledButton
                  onPress={handleSubmit(onSubmit)}
                  tw="mt-6"
                  label="SUBMIT"
                  disabled={!isValid}>
                  <StyledText tw="text-white">Register</StyledText>
                </StyledButton>
              </Modal>
            </Portal>

            <StyledView
              style={{flexDirection: 'row', justifyContent: 'center'}}>
              <StyledButton
                onPress={showModal}
                tw="mr-2"
                label={'Edit Restaurant Image'}></StyledButton>
              <StyledButton tw="mr-2" label={'Change Password'}></StyledButton>
            </StyledView>
          </StyledView>
        )} */
}
