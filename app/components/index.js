import { styled } from 'nativewind';
import { TextInput as ReactInput, Text, View } from 'react-native';
import { Button, Card, Dialog, TextInput as PaperInput, Text as PaperText, Portal } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { baseURL } from '../services/api/axios';
import colors from '../styles/colors';



export const StyledView = styled(View)

export const StyledTextInput = ({ label, placeholder, ...props }) => {
    return (
        <PaperInput
            placeholder={placeholder}
            placeholderTextColor={'#000000'}
            mode='outlined'
            label={label}
            focusable={true}
            keyboardType='text'
            tw='m-6 mb-2 mt-2 bg-[#FEF7F4]'
            textColor='#000000'
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
export const StyledButtonTrans = ({ fun, label, onPress, ...props }) => {
    return (
        <Button mode="contained"
            textColor='#FE7240'
            tw="bg-[#fff] m-6 mb-0 mt-0"
            onPress={onPress}
            style={{ borderColor: '#FE7240', borderWidth: 0.5, marginBottom: 10, ...props }}
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
            <Dialog visible={visible} onDismiss={hideDialog} style={{ backgroundColor: '#FEF7F4', }}>
                <Dialog.Title style={{ color: '#000' }}>{title}</Dialog.Title>
                <Dialog.Content>
                    <Text variant="bodyMedium" style={{ color: '#000' }}>{text}</Text>
                </Dialog.Content>
                <Dialog.Actions>
                    <Button onPress={onPressbtn1} buttonColor='#FE7240' textColor='#fff' style={{ height: 40, borderRadius: 20 }}>{btnText1}</Button>
                    <Button onPress={onPressbtn2} buttonColor='#FE7240' textColor='#fff' style={{ height: 40, borderRadius: 20 }}>{btnText2}</Button>
                </Dialog.Actions>

            </Dialog>
        </Portal >
    );
};

export const RestaurantCard = ({ res_name, res_type, res_image, onPress }) => {
    console.log("im", res_image)
    return (

        <Card tw='bg-[#FEF7F4] mt-0 mb-5'>
            <Card.Content>
                <StyledText tw='text-black font-bold text-[18px]'>{res_name}</StyledText>
                <StyledText tw='text-[#808080] p-1 pl-0'>{res_type}</StyledText>
            </Card.Content>
            <Card.Cover source={(res_image === null || res_image === 'None') ? { uri: 'https://picsum.photos/700' } : { uri: baseURL + 'media/' + res_image }} style={{
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

export const OwnerDetailsCard = ({ data, editable, editData, onTextChange, isEdit }) => {
    const handleTextChange = (label, value) => {
        onTextChange(label, value)
    };
    return (
        <Card tw='bg-[#FEF7F4] mt-0 mb-0' style={{ borderRadius: 0 }}>
            <Card.Cover source={data[data.length - 1]['value'] === null || data[data.length - 1]['value'] === 'None' ? { uri: 'https://picsum.photos/700' } : { uri: baseURL + 'media/' + data[data.length - 1]['value'] }} style={{
                margin: 4, borderRadius: 0
            }} />
            {data.filter(each => each.label !== 'id' && each.label !== 'Restaurant Image').map((each, index) => {
                return (
                    <Card.Content style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 4 }} key={index}>
                        <StyledText tw='text-[#808080] text-[15px] font-bold' style={{ alignText: 'flex-start' }}>{each.label}</StyledText>
                        <ReactInput tw='text-black p-1 pl-0 font-bold text-[15px]' style={{ textAlign: 'right' }}
                            defaultValue={each.value}
                            value={isEdit ? editData[each.value] : each.value}
                            onChangeText={val => handleTextChange(each.label, val)}
                            editable={each.can_edit === true ? editable : false}
                        ></ReactInput>
                    </Card.Content>
                )
            })}
        </Card>

    )
}

export const DishCard = ({ props }) => {
    return (
        <Card
            style={{
                // marginBottom: 10,
                paddingRight: 10,
                backgroundColor: '#fff',
                borderRadius: 0,
                elevation: 0
            }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Card.Content style={{ flex: 1, padding: 10 }}>
                    <PaperText variant="titleLarge">{props.name}</PaperText>
                    <PaperText variant="titleMedium">{props.description}</PaperText>

                    <PaperText variant="bodyMedium">
                        Preparation Time: {props.preparation_time} minutes
                    </PaperText>
                    <PaperText variant="bodyMedium">Price: {props.price}rs</PaperText>
                    <PaperText variant="bodyMedium">
                        Recommended: {props.recommended}
                    </PaperText>
                    {/* <Text variant="bodyMedium">
                      Diet: {each.diet__parent == 'Veg' ? 'Veg' : 'Non-Veg'}
                    </Text> */}
                </Card.Content>
                <Card.Cover
                    source={{ uri: baseURL + '/media/' + props.image }}
                    style={{
                        aspectRatio: 1,
                        width: 125,
                        height: 125,
                        marginLeft: 10,
                    }}
                />
            </View>
        </Card>
    )
}


export const NavigationCard = ({ title, iconName }) => {
    return (

        <Card
            style={{
                backgroundColor: '#fff',
                borderColor: '#FE7240',
                borderWidth: 0.7,
                height: 'auto',
                justifyContent: 'center',
            }}>

            <Card.Title
                title={title}
                titleStyle={{
                    color: '#FE7240',
                    fontSize: 18,
                    marginTop: 5,
                    fontWeight: '700',
                    flexWrap: 'wrap',
                }}
                allowFontScaling={true}
                ellipsizeMode="tail"
                right={() => (
                    <MaterialCommunityIcons
                        name={iconName}
                        color="#000"
                        size={25}
                        style={{ paddingRight: 20 }}
                    />
                )}
            />
        </Card>
    )
}

export const ChefCard = ({ chef__first_name, chef__email, chef__last_name, chef__phone_number }) => {
    return (<Card style={{ margin: 10, backgroundColor: '#FEF7F4' }}>
        <Card.Content>
            <StyledView style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 5 }}>
                <StyledText tw='text-[#808080]'>
                    Name
                </StyledText>
                <StyledText tw='text-black'>
                    {chef__first_name} {chef__last_name}
                </StyledText>
            </StyledView>
            <StyledView style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 5 }}>
                <StyledText tw='text-[#808080]'>
                    Email
                </StyledText>
                <StyledText tw='text-black'>
                    {chef__email}
                </StyledText>
            </StyledView>
            <StyledView style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <StyledText tw='text-[#808080]'>
                    Phone Number
                </StyledText>
                <StyledText tw='text-black'>
                    {chef__phone_number}
                </StyledText>
            </StyledView>
        </Card.Content>
    </Card>)
}