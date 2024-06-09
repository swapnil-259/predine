import { styled } from 'nativewind';
import { View, Text, BackHandler } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import colors from '../styles/colors';
import { Dialog, Portal, PaperProvider } from 'react-native-paper';
import { useState } from 'react';

export const StyledView = styled(View)

export const StyledTextInput = ({ label, placeholder, ...props }) => {
    return (
        <TextInput
            placeholder={placeholder}
            placeholderTextColor={colors.BLACK}
            mode='outlined'
            keyboardType='text'
            tw='m-6 mb-2 mt-2 bg-[#FEF7F4]'
            activeOutlineColor={colors.BLACK}
            outlineStyle={{ borderWidth: 1, borderRadius: 10 }}
            {...props}
        />)
}

export const StyledButton = ({ fun, label, ...props }) => {
    return (
        <Button mode="contained"
            textColor='#fff'
            tw="bg-[#FE7240] m-6 mb-4 mt-5 "
            {...props}
        >
            {label}
        </Button >
    )
}

export const StyledText = ({ tw, text, children, ...props }) => {
    console.log({ ...props })
    return (
        <Text tw={tw}{...props}>
            {text}
            {children}
        </Text >

    )
}

export const DialogBox = ({ visible, showDialog, hideDialog }) => {

    return (
        <Portal>
            <Dialog visible={visible} onDismiss={hideDialog} theme={{ colors: { primary: 'green' } }}>
                <Dialog.Title>Exit App</Dialog.Title>
                <Dialog.Content>
                    <Text variant="bodyMedium">Hold on! Are you sure you want to go back?</Text>
                </Dialog.Content>
                <Dialog.Actions>
                    <Button onPress={hideDialog}>Cancel</Button>
                    <Button onPress={() => {
                        BackHandler.exitApp()
                    }}>Exit</Button>
                </Dialog.Actions>

            </Dialog>
        </Portal >
    );
};