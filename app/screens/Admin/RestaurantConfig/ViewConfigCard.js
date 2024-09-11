import React from 'react';
import {Controller} from 'react-hook-form';
import {ScrollView, View} from 'react-native';
import {Card} from 'react-native-paper';
import {
  StyledButton,
  StyledText,
  StyledTextInput,
  StyledView,
} from '../../../components';
import CustomDropdown from '../../../components/CustomDropdown';

const ViewConfigCard = ({
  modalVisible,
  control,
  errors,
  childData,
  parentData,
  isValid,
  handleSubmit,
  onSubmit,
}) => {
  const renderContent = () => {
    switch (modalVisible) {
      case 'restaurantConfig':
        return (
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
              <StyledText tw="text-red-500 ml-6">
                {errors.child.message}
              </StyledText>
            )}

            <StyledButton
              onPress={handleSubmit(onSubmit)}
              tw="mt-6"
              label={'SUBMIT'}
              disabled={!isValid}
            />
          </StyledView>
        );
      case 'viewPrevConfig':
        return (
          <StyledView tw="justify-content pt-5">
            <Controller
              control={control}
              name="parent"
              rules={{
                required: {value: true, message: 'Parent Category is required'},
              }}
              render={({field: {onChange, onBlur, value}}) => (
                <CustomDropdown
                  style={{marginBottom: 65, marginTop: 0}}
                  placeholder="Select Parent Category"
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
            <StyledButton
              onPress={handleSubmit(onSubmit)}
              tw="mt-6"
              label={'SUBMIT'}
              disabled={!isValid}
            />
            <ScrollView>
              {childData ? (
                childData.map((child, index) => (
                  <Card
                    key={index}
                    style={{
                      padding: 10,
                      margin: 10,
                      backgroundColor: '#FEF7F4',
                    }}>
                    <StyledText tw="text-black text-[16px] font-bold">
                      {child.label}
                    </StyledText>
                  </Card>
                ))
              ) : (
                <StyledText tw="text-gray-500 ml-6">
                  No child data available for the selected parent.
                </StyledText>
              )}
            </ScrollView>
          </StyledView>
        );
      default:
        return null;
    }
  };

  return <View>{renderContent()}</View>; // Ensure View takes up available space
};

export default ViewConfigCard;
