import { styled } from 'nativewind';
import { View, Text, BackHandler, TextInput as ReactInput } from 'react-native';
import { TextInput as PaperInput, Button } from 'react-native-paper';
import colors from '../styles/colors';
import { Dialog, Portal, Card } from 'react-native-paper';
import { useState } from 'react';

export const StyledView = styled(View)

export const StyledTextInput = ({ label, placeholder, ...props }) => {
    return (
        <PaperInput
            placeholder={placeholder}
            placeholderTextColor={colors.BLACK}
            mode='outlined'
            keyboardType='text'
            tw='m-6 mb-2 mt-2 bg-[#FEF7F4]'
            textColor='#000'
            activeOutlineColor={colors.BLACK}
            outlineStyle={{ borderWidth: 1, borderRadius: 10 }}
            {...props}
        />)
}

export const StyledButton = ({ fun, label, ...props }) => {
    return (
        <Button mode="contained"
            textColor='#fff'
            tw="bg-[#FE7240] m-5 mb-4 mt-4 border-0"
            {...props}
        >
            {label}
        </Button >
    )
}
export const StyledButtonTrans = ({ fun, label, ...props }) => {
    return (
        <Button mode="contained"
            textColor='#FE7240'
            tw="bg-[#fff] m-6 mb-0 mt-0"
            style={{ borderColor: '#FE7240', borderWidth: 0.5 }}
            {...props}
        >
            {label}
        </Button >
    )
}

export const StyledText = ({ tw, text, children, ...props }) => {
    return (
        <Text tw={tw}{...props}>
            {text}
            {children}
        </Text >

    )
}

export const DialogBox = ({ visible, hideDialog, title, text, btnText1, btnText2, onPressbtn1, onPressbtn2 }) => {

    return (
        <Portal>
            <Dialog visible={visible} onDismiss={hideDialog} >
                <Dialog.Title>{title}</Dialog.Title>
                <Dialog.Content>
                    <Text variant="bodyMedium">{text}</Text>
                </Dialog.Content>
                <Dialog.Actions>
                    <Button onPress={onPressbtn1}>{btnText1}</Button>
                    <Button onPress={onPressbtn2}>{btnText2}</Button>
                </Dialog.Actions>

            </Dialog>
        </Portal >
    );
};

export const RestaurantCard = ({ res_name, res_type, onPress }) => {
    return (

        <Card tw='bg-[#FEF7F4] mt-0 mb-5'>
            <Card.Content>
                <StyledText tw='text-black font-bold text-[18px]'>{res_name}</StyledText>
                <StyledText tw='text-[#808080] p-1 pl-0'>{res_type}</StyledText>
            </Card.Content>
            <Card.Cover source={{ uri: 'https://picsum.photos/700' }} style={{
                marginHorizontal: 4
            }} />
            <Card.Actions>
                <StyledButton
                    onPress={onPress}
                    label={'View'}
                    style={{
                        marginRight: 0,
                        marginTop: 0,
                        marginBottom: 0,


                    }}></StyledButton>
            </Card.Actions>
        </Card >

    )
}

export const OwnerDetailsCard = ({ data, editable, editData, onTextChange }) => {
    const handleTextChange = (label, value) => {
        onTextChange(label, value)
    };
    console.log(editData)
    return (
        <Card tw='bg-[#FEF7F4] mt-0 mb-0' style={{ borderRadius: 0 }}>
            <Card.Cover source={{ uri: 'https://picsum.photos/700' }} style={{
                margin: 4, borderRadius: 0
            }} />
            {data.filter(each => each.label !== 'id').map((each, index) => {
                return (
                    <Card.Content style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 4 }} key={index}>
                        <StyledText tw='text-[#808080] text-[15px] font-bold' style={{ alignText: 'flex-start' }}>{each.label}</StyledText>
                        <ReactInput tw='text-black p-1 pl-0 font-bold text-[15px]' style={{ textAlign: 'right' }}
                            defaultValue={each.value}
                            value={editData[each.value]}
                            onChangeText={val => handleTextChange(each.label, val)}
                            editable={each.can_edit === true ? editable : false}
                        ></ReactInput>
                    </Card.Content>
                )
            })}
        </Card>

    )
}


