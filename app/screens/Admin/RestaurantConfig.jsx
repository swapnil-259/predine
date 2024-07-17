import {useFocusEffect} from '@react-navigation/native';
import React, {useCallback, useState} from 'react';
import {Controller, useForm} from 'react-hook-form';
import {
  StyledButton,
  StyledButtonTrans,
  StyledText,
  StyledTextInput,
  StyledView,
} from '../../components';
import CustomDropdown from '../../components/CustomDropdown';
import {apiURL} from '../../constants/urls';
import {getData, postData} from '../../services/api/apiService';

const RestauratConfig = () => {
  const [parentData, setParentData] = useState([]);
  const [childData, setChildData] = useState([]);

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
  };

  const onPreviousData = async data => {
    const parent = getValues('parent');

    try {
      const res = await getData(apiURL.GET_CHILD, {parent: parent});
      setChildData(res.data);
      reset({
        parent: null,
      });
    } catch (err) {
      reset({
        parent: null,
      });
    }
  };

  return (
    <StyledView tw="flex-1 bg-white ">
      <StyledView tw="justify-center pt-5">
        <Controller
          control={control}
          name="parent"
          rules={{
            required: {value: true, message: 'Parent Category is required'},
            maxLength: {
              value: 50,
              message: 'Parent Category cannot exceed 50 characters',
            },
          }}
          render={({field: {onChange, onBlur, value}}) => (
            <CustomDropdown
              style={{marginBottom: 65, marginTop: 0}}
              placeholder="Parent Category"
              data={parentData}
              value={value}
              onChange={onChange}
              onBlur={onBlur}
            />
          )}
        />
        {errors.parent && (
          <StyledText tw="text-red-500 ml-6">
            {errors.parent.message}
          </StyledText>
        )}

        <Controller
          control={control}
          name="child"
          rules={{
            required: {value: true, message: 'Child is required'},
            maxLength: {
              value: 50,
              message: 'Child cannot exceed 50 characters',
            },
          }}
          render={({field: {onChange, onBlur, value}}) => (
            <StyledTextInput
              maxLength={50}
              placeholder="Child Category"
              label={'Child Category'}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
        />
        {errors.child && (
          <StyledText tw="text-red-500 ml-6">{errors.child.message}</StyledText>
        )}

        <StyledButton
          onPress={handleSubmit(onSubmit)}
          tw="mt-6"
          label={'SUBMIT'}
          disabled={!isValid}></StyledButton>

        <StyledButtonTrans
          label={'VIEW PREVIOUS '}
          // disabled={!isValid}
          onPress={onPreviousData}></StyledButtonTrans>
      </StyledView>
      <StyledView tw="flex-1  align-center mt-5">
        {childData.map((item, index) => (
          <StyledText tw="text-black text-[20px] p-5" key={index}>
            {item.label}
          </StyledText>
        ))}
      </StyledView>
    </StyledView>
  );
};

export default RestauratConfig;
