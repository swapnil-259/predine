import {useFocusEffect} from '@react-navigation/native';
import {useCallback, useState} from 'react';
import {useForm} from 'react-hook-form';

import {ScrollView, TouchableOpacity} from 'react-native';
import {Modal, PaperProvider, Portal} from 'react-native-paper';
import {NavigationCard, StyledView} from '../../../components';
import ViewPrivacyPolicyCard from './ViewPrivacyPolicyCard';

const PrivacyPolicy = () => {
  const [visible, setVisible] = useState(false);
  const [modalType, setModalType] = useState(null);

  const showModal = type => {
    setModalType(type);
    setVisible(true);
  };
  const hideModal = () => {
    setVisible(false);
  };
  useFocusEffect(
    useCallback(() => {
      hideModal();
    }, []),
  );

  const {
    control,
    handleSubmit,
    reset,
    formState: {errors, isValid},
  } = useForm({mode: 'onBlur'});
  return (
    <PaperProvider>
      <StyledView tw="flex-1 bg-white">
        <TouchableOpacity onPress={() => showModal('privacyPolicy')}>
          <NavigationCard
            text={'Privacy Policy'}
            iconName={'key'}></NavigationCard>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => showModal('refundPolicy')}>
          <NavigationCard
            text={'Refund Policy'}
            iconName={'cash-multiple'}></NavigationCard>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => showModal('termsCondition')}>
          <NavigationCard
            text={'Terms and Condition'}
            iconName={'file-multiple'}></NavigationCard>
        </TouchableOpacity>
      </StyledView>

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
            <ViewPrivacyPolicyCard modalVisible={modalType} />
          </ScrollView>
        </Modal>
      </Portal>
    </PaperProvider>
  );
};

export default PrivacyPolicy;
