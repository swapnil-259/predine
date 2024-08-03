import { Picker } from '@react-native-picker/picker';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';

const CustomTimePicker = ({ value, onChange, placeholder }) => {
    const [minutes, setMinutes] = useState(value !== undefined ? value : '');

    useEffect(() => {
        setMinutes(value !== undefined ? value : '');
    }, [value]);

    const renderMinutes = () => {
        let minutesArray = [<Picker.Item key="" label={placeholder} value="" enabled={false} />];
        for (let i = 1; i < 61; i++) {
            minutesArray.push(<Picker.Item key={i} label={`${i} minute${(i !== 1 && i !== 0) ? 's' : ''}`} value={i} />);
        }
        return minutesArray;
    };

    const handleMinutesChange = (itemValue) => {
        setMinutes(itemValue);
        onChange(itemValue);
    };

    return (
        <View style={styles.container} focusable={true} >
            <Picker
                dropdownIconColor={'#000'}
                selectedValue={minutes}
                style={{
                    width: '100%',
                    color: minutes === '' ? '#D3D3D3' : '#000',
                }}
                onValueChange={handleMinutesChange}
            >
                {renderMinutes()}
            </Picker>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 25,
        marginTop: 15,
        height: 50,
        backgroundColor: '#FEF7F4',
        borderWidth: 1,
        borderColor: '#808080',
        borderRadius: 10,
        marginBottom: 10,
        justifyContent: 'center',
    },
});

export default CustomTimePicker