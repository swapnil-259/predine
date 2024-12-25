import React from 'react';
import {Image, TouchableOpacity, View} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import {StyledText} from '.';

const CustomImagePicker = ({onChange, onBlur, value}) => {
  const handleImagePick = () => {
    launchImageLibrary(
      {
        mediaType: 'photo',
        maxWidth: 300,
        maxHeight: 400,
        includeBase64: false,
        cropping: true,
      },
      response => {
        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.error) {
          console.log('ImagePicker Error: ', response.error);
        } else if (response.assets && response.assets.length > 0) {
          const image = response.assets[0];
          onChange(image);
        }
      },
    );
  };

  const handleRemoveImage = () => {
    onChange(null);
  };

  return (
    <View>
      <TouchableOpacity
        onBlur={onBlur}
        style={{
          flex: 1,
          margin: 25,
          marginTop: 15,
          height: 50,
          backgroundColor: '#FEF7F4',
          borderWidth: 1,
          borderColor: '#808080',
          borderRadius: 10,
          marginBottom: 10,
          padding: 10,
          paddingHorizontal: 10,
        }}
        onPress={handleImagePick}>
        {!value?.uri ? (
          <StyledText
            tw="text-[#D3D3D3] pl-2 pt-1 text-[17px] font-bold"
            text={'Pick Image'}></StyledText>
        ) : (
          <StyledText
            tw="text-black text-[17px]"
            text={value.fileName}></StyledText>
        )}
      </TouchableOpacity>

      {value?.uri && (
        <View
          style={{
            borderWidth: 1,
            borderColor: '#D3D3D3',
            width: 110,
            height: 110,
            margin: 20,
            marginTop: 15,
            justifyContent: 'center',
            alignItems: 'center',
            position: 'relative',
          }}>
          <Image
            source={{uri: value.uri}}
            style={{width: 100, height: 100, margin: 10}}
          />
          <TouchableOpacity
            onPress={handleRemoveImage}
            style={{
              position: 'absolute',
              top: 0,
              right: 0,
              backgroundColor: 'white',
              borderRadius: 15,
              width: 30,
              height: 30,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <StyledText
              style={{color: 'red', fontWeight: 'bold'}}
              text={'X'}></StyledText>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default CustomImagePicker;
