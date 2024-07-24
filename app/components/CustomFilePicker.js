import React from 'react';
import { Image, TouchableOpacity, View } from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import ImageCropPicker from 'react-native-image-crop-picker';
import { StyledText } from '.';

const CustomImagePicker = ({ onChange, onBlur, value }) => {

    const handleDocumentPick = async () => {
        try {
            const res = await DocumentPicker.pick({
                type: [DocumentPicker.types.images],
            });
            console.log(res);
            onChange(res.uri);
        } catch (err) {
            if (DocumentPicker.isCancel(err)) {
                console.log('User cancelled the picker');
            } else {
                throw err;
            }
        }
    };
    const handleImagePick = () => {
        ImageCropPicker.openPicker({
            width: 300,
            height: 400,
            cropping: true,
        }).then(image => {
            console.log(image);
            const { path, filename } = image;
            onChange({ uri: path, name: filename || path.split('/').pop() });
        }).catch(error => {
            if (ImageCropPicker.isCancel(error)) {
                console.log('User cancelled image picker');
            } else {
                console.log(error);
            }
        });
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
                onPress={handleImagePick}
            >
                {!value?.uri ? (
                    <StyledText tw='text-[#D3D3D3] pl-2 text-[17px] '>
                        Pick Image
                    </StyledText>
                ) : (
                    <StyledText tw='text-black text-[17px]'>
                        {value.name}
                    </StyledText>

                )}
            </TouchableOpacity>

            {value?.uri && (
                <View style={{ borderWidth: 1, borderColor: '#D3D3D3', width: 110, height: 110, margin: 20, marginTop: 15, justifyContent: 'center', alignItems: 'center', position: 'relative' }}>
                    <Image source={{ uri: value.uri }} style={{ width: 100, height: 100, margin: 10 }} />
                    <TouchableOpacity onPress={handleRemoveImage} style={{ position: 'absolute', top: 0, right: 0, backgroundColor: 'white', borderRadius: 15, width: 30, height: 30, justifyContent: 'center', alignItems: 'center' }}>
                        <StyledText style={{ color: 'red', fontWeight: 'bold' }}>X</StyledText>
                    </TouchableOpacity>
                </View>
            )}
        </View>

    );
};

export default CustomImagePicker;
