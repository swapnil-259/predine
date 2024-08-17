// ProfileModals.js
import React from 'react';
import { Controller } from 'react-hook-form';
import { Modal, Portal } from 'react-native-paper';
import {
  OwnerDetailsCard,
  StyledButton,
  StyledText,
  StyledTextInput,
  StyledView,
} from '../../../components';
import CustomImagePicker from '../../../components/CustomFilePicker';

const ViewProfileCard = ({
  visibleModal,
  hideModal,
  ownerData,
  control,
  handleSubmit,
  reset,
  onSubmit,
  errors,
  isValid,
  getValues,
}) => {
  const renderProfileContent = () => {
    switch (visibleModal) {
      case 'viewProfile':
        return (
          <StyledView>
            <OwnerDetailsCard data={ownerData} isEdit={false} />
          </StyledView>
        );

      case 'changePassword':
        return (
          <StyledView>
            <Controller
              control={control}
              name="old_password"
              rules={{
                required: { value: true, message: 'Old Password is required' },
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <StyledTextInput
                  placeholder="Old Password"
                  maxLength={150}
                  label={'Old Password'}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  secureTextEntry
                />
              )}
            />
            {errors.old_password && (
              <StyledText tw="text-red-500 ml-6">
                {errors.old_password.message}
              </StyledText>
            )}
            <Controller
              control={control}
              name="new_password"
              rules={{
                required: { value: true, message: 'New Password is required' },
                maxLength: {
                  value: 12,
                  message: 'Password cannot exceed 12 characters',
                },
                pattern: {
                  value:
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                  message:
                    'Password must be at least 8 characters long, contain an uppercase letter, a lowercase letter, a number, and a special character',
                },
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <StyledTextInput
                  placeholder="New Password"
                  maxLength={150}
                  label={'New Password'}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  secureTextEntry
                />
              )}
            />
            {errors.new_password && (
              <StyledText tw="text-red-500 ml-6">
                {errors.new_password.message}
              </StyledText>
            )}

            <Controller
              control={control}
              name="conf_password"
              rules={{
                required: {
                  value: true,
                  message: 'Confirm Password is required',
                },
                validate: value =>
                  value === getValues('new_password') ||
                  'Passwords do not match',
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <StyledTextInput
                  maxLength={150}
                  placeholder="Confirm Password"
                  label={'Confirm Password'}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  secureTextEntry
                />
              )}
            />
            {errors.conf_password && (
              <StyledText tw="text-red-500 ml-6">
                {errors.conf_password.message}
              </StyledText>
            )}
            <StyledButton
              onPress={handleSubmit(onSubmit)}
              tw="mt-6"
              label="SUBMIT"
              disabled={!isValid}>
              <StyledText tw="text-white">SUBMIT</StyledText>
            </StyledButton>
          </StyledView>
        );

      case 'changeImage':
        return (
          <StyledView>
            <Controller
              control={control}
              name="image"
              rules={{
                required: { value: true, message: 'Dish Image is required' },
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <CustomImagePicker
                  onChange={onChange}
                  onBlur={onBlur}
                  value={value}
                />
              )}
            />
            {errors.image && (
              <StyledText style={{ color: 'red', marginLeft: 6 }}>
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
          </StyledView>
        );

      case 'addBankDetails':
        return (
          <StyledView>
            <Controller
              control={control}
              name="acc_holder_name"
              rules={{
                required: 'Account Holder Name is required',
                minLength: {
                  value: 2,
                  message: 'Account Holder Name must be 2 characters long',
                },
                maxLength: {
                  value: 50,
                  message: 'Account Holder Name cannot exceed 50 characters',
                },
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <StyledTextInput
                  maxLength={50}
                  label="Account Holder Name"
                  placeholder="Account Holder Name"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
              )}
            />
            {errors.acc_holder_name && (
              <StyledText tw="text-red-500 ml-6">
                {errors.acc_holder_name.message}
              </StyledText>
            )}
            <Controller
              control={control}
              name="ifsc_code"
              rules={{
                required: 'IFSC Code is required',
                pattern: {
                  value: /^[A-Za-z]{4}[a-zA-Z0-9]{7}$/,
                  message: 'Invalid IFSC Code',
                },
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <StyledTextInput
                  maxLength={11}
                  label="IFSC Code"
                  placeholder="IFSC Code"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
              )}
            />
            {errors.ifsc_code && (
              <StyledText tw="text-red-500 ml-6">
                {errors.ifsc_code.message}
              </StyledText>
            )}
            <Controller
              control={control}
              name="acc_number"
              rules={{
                required: 'Account Number is required',
                minLength: {
                  value: 9,
                  message: 'Account Number must be at least 9 digits long',
                },
                maxLength: {
                  value: 18,
                  message: 'Account Number cannot exceed 18 digits',
                },
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <StyledTextInput
                  maxLength={18}
                  label="Account Number"
                  placeholder="Account Number"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  keyboardType="numeric"
                />
              )}
            />
            {errors.acc_number && (
              <StyledText tw="text-red-500 ml-6">
                {errors.acc_number.message}
              </StyledText>
            )}
            <Controller
              control={control}
              name="conf_acc_number"
              rules={{
                required: 'Confirm Account Number is required',
                validate: value =>
                  value === getValues('acc_number') ||
                  'Account numbers do not match',
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <StyledTextInput
                  maxLength={18}
                  label="Confirm Account Number"
                  placeholder="Confirm Account Number"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  keyboardType="numeric"
                />
              )}
            />
            {errors.conf_acc_number && (
              <StyledText tw="text-red-500 ml-6">
                {errors.conf_acc_number.message}
              </StyledText>
            )}
            <StyledButton
              onPress={handleSubmit(onSubmit)}
              tw="mt-6"
              label="SUBMIT"
              disabled={!isValid}>
              <StyledText tw="text-white">Register</StyledText>
            </StyledButton>
          </StyledView>
        );

      default:
        return null;
    }
  };

  return (
    <Portal>
      <Modal
        visible={!!visibleModal}
        onDismiss={hideModal}
        contentContainerStyle={{
          backgroundColor: 'white',
          maxHeight: 400,
          minHeight: 100,
          margin: 30,
        }}>
        {renderProfileContent()}
      </Modal>
    </Portal>
  );
};

export default ViewProfileCard;
