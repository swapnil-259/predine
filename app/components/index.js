import { styled } from 'nativewind';
import { View, Text } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import colors from '../styles/colors';

export const StyledView = styled(View)

export const StyledTextInput = ({ label, placeholder, ...props }) => {
    return (
        <TextInput
            placeholder={placeholder}
            placeholderTextColor={colors.BLACK}
            mode='outlined'
            keyboardType='text'
            tw='m-6 mb-2 mt-2 bg-[#FEF7F4] '
            activeOutlineColor={colors.BLACK}
            outlineStyle={{ borderWidth: 1, borderRadius: 10 }}
            {...props}
        />)
}

export const StyledButton = ({ fun, label, ...props }) => {
    console.log({ ...props })
    return (
        <Button mode="contained"
            tw="bg-[#FE7240] m-10 mb-4 mt-5"
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

