import { styled } from 'nativewind';
import { View, Text, BackHandler } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import colors from '../styles/colors';
import { Dialog, Portal, Card } from 'react-native-paper';

export const StyledView = styled(View)

export const StyledTextInput = ({ label, placeholder, ...props }) => {
    return (
        <TextInput
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

export const RestaurantCard = ({ res_name, res_type }) => {
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
                    label={'View'}
                    style={{
                        marginRight: 0,
                        marginTop: 0,
                        marginBottom: 0
                    }}></StyledButton>
                {/* <StyledButton label={'Delete'}
                    style={{
                        marginRight: 0,
                        marginTop: 0,
                        marginBottom: 0
                    }}></StyledButton> */}

            </Card.Actions>
        </Card >

    )
}