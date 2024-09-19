import {useFocusEffect} from '@react-navigation/native';
import React, {useCallback, useState} from 'react';
import {useForm} from 'react-hook-form';
import {ScrollView, TouchableOpacity} from 'react-native';
import {Modal, PaperProvider, Portal} from 'react-native-paper';
import {NavigationCard, StyledView} from '../../../components';
import {apiURL} from '../../../constants/urls';
import {getData, postData} from '../../../services/api/apiService';
import ViewConfigCard from './ViewConfigCard';
const RestauratConfig = () => {
  const [parentData, setParentData] = useState([]);
  const [childData, setChildData] = useState([]);
  const [visible, setVisible] = useState(false);
  const [modalType, setModalType] = useState(null);

  const ParentList = async () => {
    try {
      const res = await getData(apiURL.PARENT_LIST);
      setParentData(res.data);
      console.log(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useFocusEffect(
    useCallback(() => {
      ParentList();
      reset({
        parent: null,
        child: '',
      });
      setChildData([]);
    }, []),
  );

  const {
    control,
    getValues,
    handleSubmit,
    reset,
    formState: {errors, isValid},
  } = useForm({mode: 'onBlur'});

  const onSubmit = async data => {
    console.log(modalType);
    switch (modalType) {
      case 'restaurantConfig':
        try {
          const res = await postData(apiURL.ADD_CHILD, data);
          console.log(res);
          reset({
            parent: null,
            child: '',
          });
        } catch (err) {
          reset({
            parent: null,
            child: '',
          });
          console.log(err);
        }
        break;

      case 'viewPrevConfig':
        const parent = getValues('parent');
        try {
          const res = await getData(apiURL.GET_CHILD, {parent: parent});
          setChildData(res.data);
          console.log(res.data);
          reset({
            parent: null,
          });
        } catch (err) {
          reset({
            parent: null,
          });
        }
        break;
    }
  };
  const showModal = type => {
    setModalType(type);
    setVisible(true);
  };
  const hideModal = () => {
    setVisible(false), setChildData([]);
    reset({
      parent: null,
      child: '',
    });
  };
  return (
    <PaperProvider>
      <StyledView tw="flex-1 bg-white">
        <TouchableOpacity onPress={() => showModal('restaurantConfig')}>
          <NavigationCard
            text={'Restaurant Configuration'}
            iconName={'cog'}></NavigationCard>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => showModal('viewPrevConfig')}>
          <NavigationCard
            text={'View Previous Configuration'}
            iconName={'chevron-left'}></NavigationCard>
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
            <ViewConfigCard
              modalVisible={modalType}
              isValid={isValid}
              control={control}
              errors={errors}
              parentData={parentData}
              onSubmit={onSubmit}
              handleSubmit={handleSubmit}
              childData={childData}
            />
          </ScrollView>
        </Modal>
      </Portal>
    </PaperProvider>
  );
};

export default RestauratConfig;
