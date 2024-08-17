import { Controller } from "react-hook-form";
import { ScrollView } from "react-native-gesture-handler";
import { Modal, Portal } from "react-native-paper";
import { ChefCard, StyledButton, StyledText, StyledTextInput, StyledView } from "../../../components";
const ViewMenuCard = ({
    visibleModal,
    hideModal,
    errors,
    control,
    handleSubmit,
    onSubmit,
    isValid,
    chefData,
    getValues

}) => {
    const renderChefContent = () => {
        switch (visibleModal) {
            case 'assignChef': {
                return (
                    <StyledView>
                        <Controller
                            control={control}
                            name="first_name"
                            rules={{
                                required: { value: true, message: 'First Name is required' },
                                maxLength: {
                                    value: 50,
                                    message: 'First Name cannot exceed 50 characters',
                                },
                                pattern: {
                                    value: /^[A-Za-z]+$/,
                                    message: 'First Name can only contain letters',
                                },
                            }}
                            render={({ field: { onChange, onBlur, value } }) => (
                                <StyledTextInput
                                    maxLength={50}
                                    label="First Name"
                                    placeholder="First Name"
                                    onBlur={onBlur}
                                    onChangeText={onChange}
                                    value={value}
                                />
                            )}
                        />
                        {errors.first_name && (
                            <StyledText tw="text-red-500 ml-6">
                                {errors.first_name.message}
                            </StyledText>
                        )}

                        <Controller
                            control={control}
                            name="last_name"
                            rules={{
                                required: { value: true, message: 'Last Name is required' },
                                maxLength: {
                                    value: 50,
                                    message: 'Last Name cannot exceed 50 characters',
                                },
                                pattern: {
                                    value: /^[A-Za-z]+$/,
                                    message: 'Last Name can only contain letters',
                                },
                            }}
                            render={({ field: { onChange, onBlur, value } }) => (
                                <StyledTextInput
                                    maxLength={50}
                                    label={'Last Name'}
                                    placeholder="Last Name"
                                    onBlur={onBlur}
                                    onChangeText={onChange}
                                    value={value}
                                />
                            )}
                        />
                        {errors.last_name && (
                            <StyledText tw="text-red-500 ml-6">
                                {errors.last_name.message}
                            </StyledText>
                        )}

                        <Controller
                            control={control}
                            name="phone_number"
                            rules={{
                                required: { value: true, message: 'Phone number is required' },
                                pattern: {
                                    value: /^\d{10}$/,
                                    message: 'Enter a valid 10-digit phone number',
                                },
                            }}
                            render={({ field: { onChange, onBlur, value } }) => (
                                <StyledTextInput
                                    placeholder="Phone Number"
                                    label={'Phone Number'}
                                    onBlur={onBlur}
                                    onChangeText={onChange}
                                    value={value}
                                    keyboardType="phone-pad"
                                />
                            )}
                        />
                        {errors.phone_number && (
                            <StyledText tw="text-red-500 ml-6">
                                {errors.phone_number.message}
                            </StyledText>
                        )}

                        <Controller
                            control={control}
                            name="email"
                            rules={{
                                required: { value: true, message: 'Email is required' },
                                pattern: {
                                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                    message: 'Enter a valid email',
                                },
                            }}
                            render={({ field: { onChange, onBlur, value } }) => (
                                <StyledTextInput
                                    placeholder="Email"
                                    label={'Email'}
                                    onBlur={onBlur}
                                    onChangeText={onChange}
                                    value={value}
                                />
                            )}
                        />
                        {errors.email && (
                            <StyledText tw="text-red-500 ml-6">
                                {errors.email.message}
                            </StyledText>
                        )}

                        <Controller
                            control={control}
                            name="password"
                            rules={{
                                required: { value: true, message: 'Password is required' },
                                maxLength: {
                                    value: 150,
                                    message: 'Password cannot exceed 150 characters',
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
                                    placeholder="Password"
                                    maxLength={150}
                                    label={'Password'}
                                    onBlur={onBlur}
                                    onChangeText={onChange}
                                    value={value}
                                    secureTextEntry
                                />
                            )}
                        />
                        {errors.password && (
                            <StyledText tw="text-red-500 ml-6">
                                {errors.password.message}
                            </StyledText>
                        )}

                        <Controller
                            control={control}
                            name="conf_password"
                            rules={{
                                required: { value: true, message: 'Confirm Password is required' },
                                validate: value =>
                                    value === getValues('password') || 'Passwords do not match',
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
                            label={'SUBMIT'}
                            disabled={!isValid}>
                            <StyledText tw="text-white">Register</StyledText>
                        </StyledButton>
                    </StyledView>
                )
            }
            case 'viewAssignedChef': {
                return <ScrollView>
                    {chefData.map((each, index) => {
                        return (
                            <ChefCard key={index} chef__email={each.chef__email} chef__first_name={each.chef__first_name} chef__last_name={each.chef__last_name} chef__phone_number={each.chef__phone_number}>
                            </ChefCard>
                        )
                    })}

                </ScrollView>
            }
            default:
                return null
        }
    };
    return (
        <Portal>
            <Modal
                visible={!!visibleModal}
                onDismiss={hideModal}
                contentContainerStyle={{
                    backgroundColor: 'white',
                    maxHeight: 600,
                    minHeight: 100,
                    margin: 30,
                }}>
                {renderChefContent()}
            </Modal>
        </Portal>
    )
}

export default ViewMenuCard