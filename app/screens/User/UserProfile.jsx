import {useFocusEffect} from '@react-navigation/native';
import React, {useCallback, useState} from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {StyledText, StyledView} from '../../components';
import {apiURL} from '../../constants/urls';
import {getData} from '../../services/api/apiService';

const UserProfile = () => {
  const [userData, setUserData] = useState([]);

  useFocusEffect(
    useCallback(() => {
      userProfile();
    }, []),
  );

  const userProfile = async () => {
    try {
      const res = await getData(apiURL.USER_DATA);
      setUserData(res.data);
      console.log(res.data);
    } catch (err) {
      console.log('Error fetching user data:', err);
    }
  };

  if (!userData.length) {
    return (
      <StyledView tw="flex-1 justify-center items-center bg-white">
        <StyledText text="Loading profile..." tw="text-black text-xl" />
      </StyledView>
    );
  }

  return (
    <StyledView tw="p-6 bg-white flex-1">
      {userData.map((user, index) => (
        <StyledView
          key={index}
          tw="bg-[#FEF7F4] border border-[#ccc] shadow-xl rounded-2xl p-6 mb-6">
          <StyledText
            tw="text-2xl font-bold mb-4 text-black"
            text={`${user.first_name} ${user.last_name}`}
          />

          <StyledView tw="flex-row items-center mb-4">
            <Icon
              name="email"
              size={20}
              color="#000"
              style={{marginRight: 15}}
            />
            <StyledView tw="tems-center">
              <StyledText tw="text-lg text-black font-bold" text="Email" />
              <StyledText tw="text-base text-black" text={user.email} />
            </StyledView>
          </StyledView>

          <StyledView tw="flex-row items-center">
            <Icon
              name="phone"
              size={20}
              color="#000"
              style={{marginRight: 15}}
            />
            <StyledView>
              <StyledText
                tw="text-lg text-black font-bold"
                text="Phone Number"
              />
              <StyledText
                tw="text-base text-black"
                text={user.phone_number.toString()}
              />
            </StyledView>
          </StyledView>
        </StyledView>
      ))}
    </StyledView>
  );
};

export default UserProfile;
