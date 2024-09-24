import {useFocusEffect} from '@react-navigation/native';
import {useCallback, useState} from 'react';
import {useForm} from 'react-hook-form';
import {ScrollView, TouchableOpacity} from 'react-native';
import {Modal, PaperProvider, Portal} from 'react-native-paper';
import {NavigationCard, StyledView} from '../../../components';
import {apiURL} from '../../../constants/urls';
import {getData, postData} from '../../../services/api/apiService';
import ViewProfileCard from './ViewProfileCard';
const Profile = () => {
  const [ownerData, setOwnerData] = useState([]);
  const [visible, setVisible] = useState(false);
  const [modalType, setModalType] = useState(null);
  const [accStatus, setAccStatus] = useState(false);
  const [bankData, setBankData] = useState([]);

  const getProfileData = async () => {
    try {
      const res = await getData(apiURL.OWNER_DATA);
      console.log(res.data);
      setOwnerData(res.data);
    } catch (err) {
      console.log(err);
    }
  };
  const checkBankStatus = async () => {
    try {
      const res = await getData(apiURL.CHECK_BANK_STATUS);
      console.log(res.account_status);
      setAccStatus(res.account_status);
    } catch (err) {
      console.log(err);
    }
  };

  const viewBankDetails = async () => {
    try {
      const res = await getData(apiURL.VIEW_BANK_DETAILS);
      console.log(res.data);
      setBankData(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const showModal = type => {
    setModalType(type);
    setVisible(true);
  };
  const hideModal = () => {
    setVisible(false);
  };

  useFocusEffect(
    useCallback(() => {
      reset({
        image: null,
        old_password: '',
        new_password: '',
        confirm_password: '',
        acc_holder_name: '',
        ifsc_code: '',
        acc_number: '',
        confirm_acc_number: '',
      });
      getProfileData();
      checkBankStatus();
      viewBankDetails();
    }, []),
  );

  const onSubmit = async data => {
    console.log('data', data);
    switch (modalType) {
      case 'editResImage':
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
          const response = await postData(apiURL.EDIT_RES_IMAGE, formData, {
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
        }
        break;
      case 'changePassword':
        try {
          const res = await postData(apiURL.CHANGE_PASSWORD, data);
          console.log(res);
          reset({
            old_password: '',
            new_password: '',
            confirm_password: '',
          });
          hideModal();
        } catch (err) {
          reset({
            old_password: '',
            new_password: '',
            confirm_password: '',
          });
          console.log(err);
        }
        break;
      case 'addBankDetails':
        try {
          const res = await postData(apiURL.ADD_BANK_DETAILS, data);
          console.log(res);
          reset({
            acc_holder_name: '',
            acc_number: '',
            ifsc_code: '',
            confirm_acc_number: '',
          });
          check_bank_status();
          hideModal();
        } catch (err) {
          reset({
            acc_holder_name: '',
            acc_number: '',
            ifsc_code: '',
            confirm_acc_number: '',
          });
          console.log(err);
        }
    }
  };

  const {
    control,
    getValues,
    handleSubmit,
    reset,
    formState: {errors, isValid},
  } = useForm({mode: 'onBlur'});

  return (
    <PaperProvider>
      <StyledView tw="flex-1 bg-white">
        <TouchableOpacity onPress={() => showModal('viewProfile')}>
          <NavigationCard
            text={'View Profile'}
            iconName={'account'}></NavigationCard>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => showModal('editResImage')}>
          <NavigationCard
            text={'Edit Restaurant Image'}
            iconName={'image-edit'}></NavigationCard>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => showModal('changePassword')}>
          <NavigationCard
            text={'Change Password'}
            iconName={'pencil'}></NavigationCard>
        </TouchableOpacity>
        {accStatus === true ? (
          <TouchableOpacity onPress={() => showModal('viewBankDetails')}>
            <NavigationCard
              text={'View Bank Details'}
              iconName={'bank'}></NavigationCard>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={() => showModal('addBankDetails')}>
            <NavigationCard
              text={'Add Bank Details'}
              iconName={'bank-plus'}></NavigationCard>
          </TouchableOpacity>
        )}

        <Portal>
          <Modal
            visible={visible}
            onDismiss={hideModal}
            contentContainerStyle={{
              backgroundColor: 'white',
              margin: 20,
              borderRadius: 15,
              minHeight: 200,
              maxHeight: 600,
            }}>
            <ScrollView>
              <ViewProfileCard
                modalVisible={modalType}
                isValid={isValid}
                control={control}
                errors={errors}
                profileData={ownerData}
                bankData={bankData}
                onSubmit={onSubmit}
                handleSubmit={handleSubmit}
                getValues={getValues}
                // childData={childData}
              />
            </ScrollView>
          </Modal>
        </Portal>
        {/* {ownerData.length === 0 ? (
        <StyledView tw=" flex-1 justify-center align-center">
          <StyledText tw="text-black text-center font-bold text-[18px]">
            Loading data...
          </StyledText>
        </StyledView>
      ) : (
        <StyledView>
          <OwnerDetailsCard data={ownerData} isEdit={false}></OwnerDetailsCard>
          <StyledView style={{flexDirection: 'row', justifyContent: 'center'}}>
            <StyledButton
              tw="mr-2"
              label={'Edit Restaurant Image'}></StyledButton>
            <StyledButton tw="mr-2" label={'Change Password'}></StyledButton>
          </StyledView>
        </StyledView>
      )} */}
      </StyledView>
    </PaperProvider>
  );
};

export default Profile;
