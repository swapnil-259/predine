import {styled} from 'nativewind';
import {TextInput as ReactInput, Text, View} from 'react-native';
import {
  Button,
  Card,
  Dialog,
  TextInput as PaperInput,
  Text as PaperText,
  Portal,
} from 'react-native-paper';
import {baseURL} from '../services/api/axios';
import colors from '../styles/colors';

export const StyledView = styled(View);

import React, {useState} from 'react';
import {TouchableOpacity} from 'react-native';
import {
  default as Icon,
  default as MaterialCommunityIcons,
} from 'react-native-vector-icons/MaterialCommunityIcons';
export const StyledTextInput = ({
  label,
  placeholder,
  secureTextEntry,
  ...props
}) => {
  const [isPasswordVisible, setPasswordVisible] = useState(false);

  return (
    <View style={{position: 'relative'}}>
      <PaperInput
        placeholder={placeholder}
        placeholderTextColor={'#000000'}
        mode="outlined"
        label={label}
        secureTextEntry={secureTextEntry && !isPasswordVisible}
        tw="m-6 mb-2 mt-2 bg-[#FEF7F4] font-bold"
        textColor="#000000"
        activeOutlineColor={colors.BLACK}
        outlineStyle={{borderWidth: 1, borderRadius: 10}}
        {...props}
        style={{paddingRight: 30}}
      />

      {secureTextEntry && (
        <TouchableOpacity
          onPress={() => setPasswordVisible(!isPasswordVisible)}
          style={{
            position: 'absolute',
            right: 35,
            top: '53%',
            transform: [{translateY: -12}],
          }}>
          <Icon
            name={isPasswordVisible ? 'eye-off' : 'eye'}
            size={24}
            color="#000"
          />
        </TouchableOpacity>
      )}
    </View>
  );
};
export const StyledButton = ({fun, label, ...props}) => {
  return (
    <Button
      mode="contained"
      textColor="#fff"
      tw="bg-[#FE7240] m-5 mb-4 mt-4 border-0 font-bold"
      {...props}>
      {label}
    </Button>
  );
};
export const StyledButtonTrans = ({fun, label, ...props}) => {
  return (
    <Button
      mode="contained"
      textColor="#FE7240"
      tw="bg-[#fff] m-6 mb-0 mt-0"
      style={{
        borderColor: '#FE7240',
        borderWidth: 0.5,
        marginBottom: 10,
      }}
      {...props}>
      {label}
    </Button>
  );
};

export const StyledText = ({tw, text, ...props}) => {
  return (
    <PaperText tw={tw} {...props}>
      {text}
    </PaperText>
  );
};

export const DialogBox = ({
  visible,
  hideDialog,
  title,
  text,
  btnText1,
  btnText2,
  onPressbtn1,
  onPressbtn2,
}) => {
  return (
    <Portal>
      <Dialog visible={visible} onDismiss={hideDialog}>
        <Dialog.Title>{title}</Dialog.Title>
        <Dialog.Content>
          <Text variant="bodyMedium">{text}</Text>
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={onPressbtn1}>{btnText1}</Button>
          <Button onPress={onPressbtn2}>{btnText2}</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

export const RestaurantCard = ({res_name, res_type, onPress}) => {
  return (
    <Card tw="bg-[#FEF7F4] mt-0 mb-5">
      <Card.Content>
        <StyledText
          tw="text-black font-bold text-[18px]"
          text={res_name}></StyledText>
        <StyledText tw="text-[#808080] p-1 pl-0" text={res_type}></StyledText>
      </Card.Content>
      <Card.Cover
        source={{uri: 'https://picsum.photos/700'}}
        style={{
          marginHorizontal: 4,
        }}
      />
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
    </Card>
  );
};

export const OwnerDetailsCard = ({
  data,
  editable,
  editData,
  onTextChange,
  isEdit,
}) => {
  const handleTextChange = (label, value) => {
    onTextChange(label, value);
  };
  return (
    <Card tw="bg-[#FEF7F4] mb-0" style={{borderRadius: 10, margin: 10}}>
      <Card.Cover
        source={
          data[data.length - 1]['value'] === null ||
          data[data.length - 1]['value'] === 'None' ||
          data[data.length - 1]['value'] === ''
            ? {uri: 'https://picsum.photos/700'}
            : {uri: baseURL + 'media/' + data[data.length - 1]['value']}
        }
        style={{
          margin: 4,
          borderRadius: 0,
        }}
      />
      {data
        .filter(
          each => each.label !== 'id' && each.label !== 'Restaurant Image',
        )
        .map((each, index) => {
          return (
            <Card.Content
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: 4,
              }}
              key={index}>
              <StyledText
                tw="text-[#808080] text-[15px] font-bold"
                style={{alignText: 'flex-start'}}
                text={each.label}></StyledText>
              <ReactInput
                tw="text-black p-1 pl-0 font-bold text-[15px]"
                style={{textAlign: 'right'}}
                defaultValue={each.value}
                value={isEdit ? editData[each.value] : each.value}
                onChangeText={val => handleTextChange(each.label, val)}
                editable={
                  each.can_edit === true ? editable : false
                }></ReactInput>
            </Card.Content>
          );
        })}
    </Card>
  );
};

export const DishCard = ({props}) => {
  console.log('img', props.image);
  return (
    <Card
      style={{
        // marginBottom: 10,
        paddingRight: 10,
        backgroundColor: '#fff',
        borderRadius: 0,
        elevation: 0,
      }}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Card.Content style={{flex: 1, padding: 10}}>
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
          source={{
            uri:
              props.image !== ''
                ? baseURL + '/media/' + props.image
                : 'https://picsum.photos/700',
          }}
          style={{
            aspectRatio: 1,
            width: 125,
            height: 125,
            marginLeft: 10,
          }}
        />
      </View>
    </Card>
  );
};

export const NavigationCard = ({iconName, text}) => {
  return (
    <StyledView
      style={{
        height: 85,
        backgroundColor: '#fff',
        margin: 20,
        marginBottom: 0,
        borderRadius: 15,
        borderWidth: 1,
        borderColor: '#FE7240',
        flexDirection: 'row',
        alignItems: 'center',
        elevation: 5,
        paddingHorizontal: 20,
      }}>
      <StyledText
        tw=" flex-1 text-[19px] font-bold text-[#FE7240]"
        text={text}></StyledText>
      <MaterialCommunityIcons name={iconName} size={25} color="#000" />
    </StyledView>
  );
};
