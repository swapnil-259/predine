import {useFocusEffect} from '@react-navigation/native';
import {useCallback, useState} from 'react';
import {Controller, useForm} from 'react-hook-form';
import {Modal, PaperProvider, Portal} from 'react-native-paper';
import {
  OwnerDetailsCard,
  StyledButton,
  StyledText,
  StyledView,
} from '../../components';
import CustomImagePicker from '../../components/CustomFilePicker';
import {apiURL} from '../../constants/urls';
import {getData, postData} from '../../services/api/apiService';
const Profile = () => {
  const [ownerData, setOwnerData] = useState([]);
  const [visible, setVisible] = useState(false);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  const onSubmit = async data => {
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
      image: '',
    },
  });

  return (
    <PaperProvider>
      <StyledView tw="flex-1 bg-white">
        {ownerData.length === 0 ? (
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
        )}
      </StyledView>
    </PaperProvider>
  );
};

export default Profile;
