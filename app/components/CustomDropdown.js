import React, { useState, useEffect } from "react";
import { Dropdown } from "react-native-element-dropdown";
import { StyledView } from ".";

const CustomDropdown = ({ placeholder, data, value, onChange, onBlur }) => {
    const [selectedValue, setSelectedValue] = useState(value);
    useEffect(() => {
        if (value) {
            setSelectedValue(value);
        }
    }, [value]);



    return (
        <StyledView tw='flex-1 m-6 mt-2 mb-2'>
            <Dropdown
                data={data}
                maxHeight={200}
                value={selectedValue}
                labelField="label"
                placeholder={placeholder}
                valueField="value"
                onChange={item => {
                    console.log(item.value)
                    setSelectedValue(item.value);
                    onChange(item.value);
                }}
                onBlur={onBlur}
                itemTextStyle={{
                    color: '#000',
                    backgroundColor: '#FEF7F4'
                }}
                selectedTextStyle={{
                    color: '#000',
                    backgroundColor: '#FEF7F4'
                }}
                activeColor="#FEF7F4"
                itemContainerStyle={{
                    color: '#000',
                    backgroundColor: '#FEF7F4'
                }}
                placeholderStyle={{
                    color: '#000'
                }}
                style={{
                    backgroundColor: '#FEF7F4',
                    color: '#000',
                    height: 55,
                    borderColor: 'black',
                    borderWidth: 0.6,
                    borderRadius: 8,
                    paddingHorizontal: 8,
                }}
            />

        </StyledView>
    );
}

export default CustomDropdown;
