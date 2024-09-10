import React from 'react';
import {Dropdown} from 'react-native-element-dropdown';
import {StyledView} from '.';

const CustomDropdown = ({
  placeholder,
  data,
  value,
  onChange,
  onBlur,
  ...props
}) => {
  return (
    <StyledView tw="flex-1 m-6 mt-3 mb-2" {...props}>
      <Dropdown
        data={data}
        // maxHeight={50}
        // minHeight={100}
        value={value}
        maxHeight={200}
        labelField="label"
        placeholder={placeholder}
        valueField="value"
        onChange={item => {
          console.log(item);
          onChange(item.value);
        }}
        onBlur={onBlur}
        itemTextStyle={{
          color: '#000',
          backgroundColor: '#FEF7F4',
        }}
        selectedTextStyle={{
          color: '#000',
          backgroundColor: '#FEF7F4',
        }}
        activeColor="#FEF7F4"
        itemContainerStyle={{
          color: '#000',
          backgroundColor: '#FEF7F4',
        }}
        placeholderStyle={{
          color: '#D3D3D3',
        }}
        style={{
          marginTop: 5,
          backgroundColor: '#FEF7F4',
          color: '#000',
          height: 50,
          borderColor: 'black',
          borderWidth: 0.6,
          borderRadius: 8,
          paddingHorizontal: 15,
        }}
      />
    </StyledView>
  );
};

export default CustomDropdown;
