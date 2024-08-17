import {useFocusEffect} from '@react-navigation/native';
import {useCallback, useState} from 'react';
import {useForm} from 'react-hook-form';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {NavigationCard, StyledView} from '../../../components';

import {Provider} from 'react-native-paper';
import {apiURL} from '../../../constants/urls';
import {getData, postData} from '../../../services/api/apiService';
import ViewConfigCard from './ViewConfigCard';

const MenuConfig = () => {
  const [parentData, setParentData] = useState([]);
  const [childData, setChildData] = useState([]);
  const [visibleModal, setVisibleModal] = useState(null);
  const showModal = modalName => setVisibleModal(modalName);
  const hideModal = () => {
    setVisibleModal(null);
    reset({
      parent: null,
      child: '',
    });
    setChildData(null);
  };

  const ParentList = async () => {
    try {
      const res = await getData(apiURL.PARENT_LIST);
      setParentData(res.data);
      console.log(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const onSubmit = async data => {
    console.log(visibleModal);
    if (visibleModal === 'manageCategory') {
      try {
        const res = await postData(apiURL.ADD_CHILD, data);
        console.log(res);
        reset({
          parent: null,
          child: '',
        });
        hideModal();
      } catch (err) {
        console.log(err);
      }
    } else if (visibleModal === 'ViewPrevConfig') {
      const parent = data.parent;
      try {
        const res = await getData(apiURL.GET_CHILD, {parent: parent});
        console.log('asdfghj', res.data);
        setChildData(res.data);
        reset({
          parent: null,
        });
        // hideModal();
      } catch (err) {
        reset({
          parent: null,
        });
      }
    }
  };
  // const onPreviousData = async () => {
  //   console.log(getValues('parent'));
  //   const parent = getValues('parent');

  //   try {
  //     const res = await getData(apiURL.GET_CHILD, {parent: parent});
  //     console.log('asdfghj', res.data);
  //     setChildData(res.data);
  //     reset({
  //       parent: null,
  //     });
  //   } catch (err) {
  //     reset({
  //       parent: null,
  //     });
  //   }
  // };

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
  return (
    <Provider>
      <StyledView tw="flex-1 bg-white">
        <TouchableOpacity
          style={{
            margin: 20,
            marginBottom: 0,
          }}
          onPress={() => showModal('manageCategory')}>
          <NavigationCard
            title={'Manage Category '}
            iconName={'cog-outline'}></NavigationCard>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            margin: 20,
            marginBottom: 0,
          }}
          onPress={() => showModal('ViewPrevConfig')}>
          <NavigationCard
            title={'View Previous Configuration'}
            iconName={'chevron-right'}
          />
        </TouchableOpacity>
        <ViewConfigCard
          visibleModal={visibleModal}
          hideModal={hideModal}
          parentData={parentData}
          control={control}
          handleSubmit={handleSubmit}
          reset={reset}
          onSubmit={onSubmit}
          errors={errors}
          isValid={isValid}
          getValues={getValues}
          childData={childData}></ViewConfigCard>
      </StyledView>
    </Provider>
  );
};

export default MenuConfig;
