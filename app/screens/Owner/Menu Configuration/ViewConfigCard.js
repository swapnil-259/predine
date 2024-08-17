import { Controller } from "react-hook-form"
import { ScrollView } from "react-native-gesture-handler"
import { Card, Modal, Portal } from "react-native-paper"
import { StyledButton, StyledText, StyledTextInput, StyledView } from "../../../components"
import CustomDropdown from "../../../components/CustomDropdown"


const ViewConfigCard = ({ visibleModal, control, parentData, errors, handleSubmit, onSubmit, isValid, hideModal, getValues, childData }) => {
    const renderMenuContent = () => {
        switch (visibleModal) {
            case 'manageCategory':
                return (
                    <StyledView>
                        <Controller
                            control={control}
                            name="parent"
                            rules={{
                                required: { value: true, message: 'Parent Category is required' },
                                maxLength: {
                                    value: 50,
                                    message: 'Parent Category cannot exceed 50 characters',
                                },
                            }}
                            render={({ field: { onChange, onBlur, value } }) => (
                                <CustomDropdown
                                    style={{ marginTop: 10, marginBottom: 60 }}
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
                                required: { value: true, message: 'Child is required' },
                                maxLength: {
                                    value: 50,
                                    message: 'Child cannot exceed 50 characters',
                                },
                            }}
                            render={({ field: { onChange, onBlur, value } }) => (
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
                    </StyledView>

                )
            case 'ViewPrevConfig':
                return (
                    <StyledView style={{ flexShrink: 1 }}>
                        <Controller
                            control={control}
                            name="parent"
                            rules={{
                                required: { value: true, message: 'Parent Category is required' },
                                maxLength: {
                                    value: 50,
                                    message: 'Parent Category cannot exceed 50 characters',
                                },
                            }}
                            render={({ field: { onChange, onBlur, value } }) => (
                                <CustomDropdown
                                    style={{ marginTop: 10, marginBottom: 60 }}
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
                        <StyledButton
                            onPress={handleSubmit(onSubmit)}
                            tw="mt-6"
                            label={'SUBMIT'}
                            disabled={!getValues('parent')}
                        />
                        <ScrollView >
                            {childData ? childData.map((each, index) => (
                                <Card key={index} style={{ margin: 10, padding: 10, backgroundColor: '#FEF7F4' }}>
                                    <StyledText tw='text-black text-[18x] font-bold'>
                                        {each.label}
                                    </StyledText>
                                </Card>
                            )) : null}
                        </ScrollView>
                    </StyledView>

                )


            default:
                return null
        }
    }

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
                {renderMenuContent()}
            </Modal>
        </Portal>
    );
}
export default ViewConfigCard