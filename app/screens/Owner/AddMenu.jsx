import {useFocusEffect} from '@react-navigation/native';
import React, {useCallback, useState} from 'react';
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
import CustomImagePicker from '../../components/CustomFilePicker';
import CustomTimePicker from '../../components/CustomTimePicker';
import {apiURL} from '../../constants/urls';
import {getData, postData} from '../../services/api/apiService';
import {baseURL} from '../../services/api/axios';

const AddMenu = () => {
  const [dishCategory, setDishCategory] = useState([]);

  useFocusEffect(
    useCallback(() => {
      reset({
        name: '',
        description: '',
        preparation_time: '',
        price: '',
        category: '',
        image: '',
      });

      getDishCat();
    }, [reset]),
  );

  const getDishCat = async () => {
    try {
      const res = await getData(apiURL.GET_DISH_CATEGORY);
      setDishCategory(res.data);
    } catch (err) {
      console.log('Error fetching dish categories:', err);
    }
  };

  const {
    control,
    handleSubmit,
    reset,
    formState: {errors, isValid},
  } = useForm({
    mode: 'onBlur',
    defaultValues: {
      name: '',
      description: '',
      preparation_time: '',
      price: '',
      category: '',
      image: '',
    },
  });

  const onSubmit = async data => {

    const formData = new FormData();
    formData.append('preparation_time', data.preparation_time);
    formData.append('name', data.name);
    formData.append('description', data.description);
    formData.append('price', data.price);
    formData.append('category', data.category);

    if (data.image && data.image.uri) {
      const imageUri = data.image.uri.replace('file://', '');

      formData.append('image', {
        uri: `file://${imageUri}`,
        name: data.image.fileName,
        type: data.image.type || 'image/jpeg',
      });
    }

    try {
      const response = await postData(baseURL + apiURL.ADD_DISH, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      reset({
        name: '',
        description: '',
        preparation_time: '',
        price: '',
        category: '',
        image: '',
      });
      console.log(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <PaperProvider>
      <StyledView tw="flex-1 bg-white">
        <ScrollView tw="bg-white">
          <Controller
            control={control}
            name="name"
            rules={{
              required: {value: true, message: 'Dish Name is required'},
              minLength: {
                value: 2,
                message: 'Dish Name must be 2 characters long',
              },
              maxLength: {
                value: 50,
                message: 'Dish Name cannot exceed 50 characters',
              },
            }}
            render={({field: {onChange, onBlur, value}}) => (
              <StyledTextInput
                maxLength={50}
                label="Dish Name"
                placeholder="Dish Name"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
          />
          {errors.name && (
            <StyledText tw="text-red-500 ml-6">
              {errors.name.message}
            </StyledText>
          )}

          <Controller
            control={control}
            name="description"
            rules={{
              required: {value: true, message: 'Description is required'},
              minLength: {
                value: 5,
                message: 'Description must be at least 5 characters long',
              },
              maxLength: {
                value: 200,
                message: 'Description cannot exceed 200 characters',
              },
            }}
            render={({field: {onChange, onBlur, value}}) => (
              <StyledTextInput
                maxLength={200}
                label="Description"
                placeholder="Description"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
          />
          {errors.description && (
            <StyledText tw="text-red-500 ml-6">
              {errors.description.message}
            </StyledText>
          )}

          <Controller
            control={control}
            name="preparation_time"
            rules={{
              required: {
                value: true,
                message: 'Preparation Minutes are required',
              },
            }}
            render={({field: {onChange, value, onBlur}}) => (
              <CustomTimePicker
                value={value}
                onBlur={onBlur}
                onChange={onChange}
                placeholder="Select Preparation Minutes"
              />
            )}
          />
          {errors.preparation_time && (
            <StyledText tw="text-red-500 ml-6">
              {errors.preparation_time.message}
            </StyledText>
          )}

          <Controller
            control={control}
            name="price"
            rules={{
              required: {value: true, message: 'Price is required'},
            }}
            render={({field: {onChange, onBlur, value}}) => (
              <StyledTextInput
                placeholder="Price"
                label="Price"
                onBlur={onBlur}
                keyboardType="numeric"
                onChangeText={onChange}
                value={value}
              />
            )}
          />
          {errors.price && (
            <StyledText tw="text-red-500 ml-6">
              {errors.price.message}
            </StyledText>
          )}

          <Controller
            control={control}
            name="category"
            rules={{
              required: {value: true, message: 'Dish Category is required'},
            }}
            render={({field: {onChange, onBlur, value}}) => (
              <CustomDropdown
                placeholder="Dish Category"
                data={dishCategory}
                label="Dish Category"
                value={value}
                onChange={onChange}
                onBlur={onBlur}
              />
            )}
          />
          {errors.category && (
            <StyledText tw="text-red-500 ml-6">
              {errors.category.message}
            </StyledText>
          )}

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

export default AddMenu;
