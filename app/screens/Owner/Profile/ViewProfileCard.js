import React from 'react';
import {Controller} from 'react-hook-form';
import {Card} from 'react-native-paper';
import {
  OwnerDetailsCard,
  StyledButton,
  StyledText,
  StyledTextInput,
  StyledView,
} from '../../../components';
import CustomImagePicker from '../../../components/CustomFilePicker';
import {baseURL} from '../../../services/api/axios';

const ViewProfileCard = ({
  modalVisible,
  control,
  errors,
  getValues,
  profileData,
  bankData,
  isValid,
  handleSubmit,
  onSubmit,
}) => {
  const renderContent = () => {
    console.log(
      'daa',
      baseURL + 'media/' + profileData[profileData.length - 1]['value'],
    );
    switch (modalVisible) {
      case 'viewProfile':
        return (
          <StyledView tw="justify-center pb-2">
            <OwnerDetailsCard
              data={profileData}
              isEdit={false}></OwnerDetailsCard>
          </StyledView>
        );
      case 'editResImage':
        return (
          <StyledView tw={'justify-content pt-5'}>
            <Controller
              control={control}
              name="image"
              rules={{
                required: {value: true, message: 'Image is required'},
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
              <StyledText
                style={{color: 'red', marginLeft: 6}}
                text={errors.image.message}></StyledText>
            )}
            <StyledButton
              onPress={handleSubmit(onSubmit)}
              tw="mt-6"
              label={'SUBMIT'}
              disabled={!isValid}
            />
          </StyledView>
        );
      case 'changePassword':
        return (
          <StyledView tw={'justify-content pt-1.5'}>
            <Controller
              control={control}
              name="old_password"
              rules={{
                required: {value: true, message: 'Old Password is required'},
                maxLength: {
                  value: 50,
                  message: 'Old Password cannot exceed 50 characters',
                },
              }}
              render={({field: {onChange, onBlur, value}}) => (
                <StyledTextInput
                  maxLength={50}
                  secureTextEntry={true}
                  placeholder="Old Password"
                  label={'Old Password'}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
              )}
            />
            {errors.old_password && (
              <StyledText
                tw="text-red-500 ml-6"
                text={errors.old_password.message}></StyledText>
            )}

            <Controller
              control={control}
              name="new_password"
              rules={{
                required: {value: true, message: 'New Password is required'},
                maxLength: {
                  value: 50,
                  message: 'New Password cannot exceed 50 characters',
                },
                minLength: {
                  value: 8,
                  message: 'New Password must be at least 8 characters',
                },
                pattern: {
                  value:
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                  message:
                    'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character',
                },
              }}
              render={({field: {onChange, onBlur, value}}) => (
                <StyledTextInput
                  maxLength={50}
                  placeholder="New Password"
                  label={'New Password'}
                  onBlur={onBlur}
                  secureTextEntry={true}
                  onChangeText={onChange}
                  value={value}
                />
              )}
            />
            {errors.new_password && (
              <StyledText
                tw="text-red-500 ml-6"
                text={errors.new_password.message}></StyledText>
            )}

            <Controller
              control={control}
              name="confirm_password"
              rules={{
                required: {
                  value: true,
                  message: 'Confirm Password is required',
                },
                maxLength: {
                  value: 50,
                  message: 'Confirm Password cannot exceed 50 characters',
                },
                validate: value =>
                  value === getValues('new_password') ||
                  'Passwords do not match',
              }}
              render={({field: {onChange, onBlur, value}}) => (
                <StyledTextInput
                  maxLength={50}
                  placeholder="Confirm Password"
                  label={'Confirm Password'}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  secureTextEntry={true}
                  value={value}
                />
              )}
            />
            {errors.confirm_password && (
              <StyledText
                tw="text-red-500 ml-6"
                text={errors.confirm_password.message}></StyledText>
            )}

            <StyledButton
              onPress={handleSubmit(onSubmit)}
              tw="mt-6"
              label={'SUBMIT'}
              disabled={!isValid}
            />
          </StyledView>
        );
      case 'addBankDetails':
        return (
          <StyledView tw={'justify-content pt-1.5'}>
            <Controller
              control={control}
              name="acc_holder_name"
              rules={{
                required: {
                  value: true,
                  message: 'Account Holder Name is required',
                },
                maxLength: {
                  value: 150,
                  message: 'Account Holder Name cannot exceed 150 characters',
                },
                pattern: {
                  value: /^[a-zA-Z\s]+$/,
                  message:
                    'Account Holder Name can only contain letters and spaces',
                },
              }}
              render={({field: {onChange, onBlur, value}}) => (
                <StyledTextInput
                  maxLength={150}
                  placeholder="Account Holder Name"
                  label={'Account Holder Name'}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
              )}
            />
            {errors.acc_holder_name && (
              <StyledText
                tw="text-red-500 ml-6"
                text={errors.acc_holder_name.message}></StyledText>
            )}

            <Controller
              control={control}
              name="ifsc_code"
              rules={{
                required: {value: true, message: 'IFSC Code is required'},
                pattern: {
                  value: /^[A-Za-z]{4}\d{7}$/,
                  message:
                    'Invalid IFSC Code format. Format: 4 letters followed by 7 digits',
                },
              }}
              render={({field: {onChange, onBlur, value}}) => (
                <StyledTextInput
                  placeholder="IFSC Code"
                  label={'IFSC Code'}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
              )}
            />
            {errors.ifsc_code && (
              <StyledText
                tw="text-red-500 ml-6"
                text={errors.ifsc_code.message}></StyledText>
            )}

            <Controller
              control={control}
              name="acc_number"
              rules={{
                required: {
                  value: true,
                  message: 'Account Number is required',
                },
                minLength: {
                  value: 9,
                  message: 'Account Number must be at least 9 digits long',
                },
                maxLength: {
                  value: 18,
                  message: 'Account Number cannot exceed 18 digits',
                },
                pattern: {
                  value: /^\d+$/,
                  message: 'Account Number must contain only numbers',
                },
              }}
              render={({field: {onChange, onBlur, value}}) => (
                <StyledTextInput
                  maxLength={18}
                  placeholder="Account Number"
                  label={'Account Number'}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
              )}
            />
            {errors.acc_number && (
              <StyledText
                tw="text-red-500 ml-6"
                text={errors.acc_number.message}></StyledText>
            )}

            <Controller
              control={control}
              name="confirm_acc_number"
              rules={{
                required: {
                  value: true,
                  message: 'Confirm Account Number is required',
                },
                validate: value =>
                  value === getValues('acc_number') ||
                  'Account numbers do not match',
              }}
              render={({field: {onChange, onBlur, value}}) => (
                <StyledTextInput
                  maxLength={18}
                  placeholder="Confirm Account Number"
                  label={'Confirm Account Number'}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
              )}
            />
            {errors.confirm_acc_number && (
              <StyledText
                tw="text-red-500 ml-6"
                text={errors.confirm_acc_number.message}></StyledText>
            )}

            <StyledButton
              onPress={handleSubmit(onSubmit)}
              tw="mt-6"
              label={'SUBMIT'}
              disabled={!isValid}
            />
          </StyledView>
        );
      case 'viewBankDetails':
        return (
          <StyledView tw="justify-center m-4">
            {bankData.map((each, index) => {
              return (
                <StyledView
                  key={index}
                  tw="mb-6 p-4 bg-white rounded-lg shadow-md">
                  {/* Account Holder's Name */}
                  <StyledText
                    tw="text-gray-500 text-[15px] font-bold mb-1 mr-2"
                    text={'Account Holder Name'}></StyledText>
                  <Card
                    style={{
                      padding: 10,
                      backgroundColor: '#FEF7F4',
                      borderRadius: 10,
                      elevation: 3,
                      shadowColor: '#000',
                      shadowOpacity: 0.2,
                      shadowRadius: 4,
                      shadowOffset: {width: 0, height: 2},
                    }}>
                    <StyledText
                      tw="text-black text-[18px] font-bold"
                      text={each.acc_holder_name}
                    />
                  </Card>

                  {/* Account Number */}
                  <StyledText
                    tw="text-gray-500 text-[15px] font-bold mt-5 mb-1 mr-2"
                    text={'Account Number'}></StyledText>
                  <Card
                    style={{
                      padding: 10,
                      backgroundColor: '#FEF7F4',
                      borderRadius: 10,
                      elevation: 3,
                      shadowColor: '#000',
                      shadowOpacity: 0.2,
                      shadowRadius: 4,
                      shadowOffset: {width: 0, height: 2},
                    }}>
                    <StyledText
                      tw="text-black text-[18px] font-bold"
                      text={each.acc_number}
                    />
                  </Card>

                  {/* IFSC Code */}
                  <StyledText
                    tw="text-gray-500 text-[15px] font-bold mt-5 mb-1 mr-2"
                    text={'IFSC Code'}></StyledText>
                  <Card
                    style={{
                      padding: 10,
                      backgroundColor: '#FEF7F4',
                      borderRadius: 10,
                      elevation: 3,
                      shadowColor: '#000',
                      shadowOpacity: 0.2,
                      shadowRadius: 4,
                      shadowOffset: {width: 0, height: 2},
                    }}>
                    <StyledText
                      tw="text-black text-[18px] font-bold"
                      text={each.acc_ifsc_code}
                    />
                  </Card>
                </StyledView>
              );
            })}
          </StyledView>
        );
      default:
        return null;
    }
  };

  return renderContent();
};

export default ViewProfileCard;
