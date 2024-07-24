import {useFocusEffect} from '@react-navigation/native';
import {useCallback} from 'react';
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

const AddMenu = () => {
  useFocusEffect(
    useCallback(() => {
      reset({
        preparation_min: '',
        dish_name: '',
        description: '',
        price: '',
        dish_category: '',
        dish_image: '',
      });
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
      dish_name: '',
      description: '',
      preparation_min: '',
      price: '',
      dish_category: '',
      dish_image: '',
    },
  });

  const onSubmit = async data => {
    console.log(data.dish_image.name);
  };

  return (
    <PaperProvider>
      <StyledView tw="flex-1 bg-white">
        <ScrollView tw="bg-white">
          <Controller
            control={control}
            name="dish_name"
            rules={{
              required: {value: true, message: 'Dish Name is required'},
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
          {errors.dish_name && (
            <StyledText tw="text-red-500 ml-6">
              {errors.dish_name.message}
            </StyledText>
          )}

          <Controller
            control={control}
            name="description"
            rules={{
              required: {value: true, message: 'Description is required'},
              maxLength: {
                value: 200,
                message: 'Description cannot exceed 200 characters',
              },
            }}
            render={({field: {onChange, onBlur, value}}) => (
              <StyledTextInput
                maxLength={50}
                label={'Description'}
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
            name="preparation_min"
            rules={{
              required: {
                value: true,
                message: 'Preparation Minutes is required',
              },
            }}
            render={({field: {onChange, value, onBlur}}) => (
              <CustomTimePicker
                value={value}
                onBlur={onBlur}
                onChange={onChange}
                placeholder={'Select Preparation Minutes'}
              />
            )}
          />
          {errors.preparation_min && (
            <StyledText tw="text-red-500 ml-6">
              {errors.preparation_min.message}
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
                label={'Price'}
                onBlur={onBlur}
                keyboardType={'numeric'}
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
            name="dish_category"
            rules={{
              required: {value: true, message: 'Dish Category is required'},
            }}
            render={({field: {onChange, onBlur, value}}) => (
              <CustomDropdown
                placeholder="Dish Category"
                data={[{label: 'heel', value: 'hej'}]}
                label="Dish Category"
                value={value}
                onChange={onChange}
                onBlur={onBlur}
              />
            )}
          />
          {errors.dish_category && (
            <StyledText tw="text-red-500 ml-6">
              {errors.dish_category.message}
            </StyledText>
          )}

          <Controller
            control={control}
            name="dish_image"
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
          {errors.dish_image && (
            <StyledText style={{color: 'red', marginLeft: 6}}>
              {errors.dish_image.message}
            </StyledText>
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
    </PaperProvider>
  );
};

export default AddMenu;
