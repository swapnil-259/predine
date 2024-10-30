import {useFocusEffect} from '@react-navigation/native';
import {useCallback, useState} from 'react';
import {StyledText, StyledView} from '../../components'; // Imported StyledButton
import {apiURL} from '../../constants/urls';
import {getData} from '../../services/api/apiService';

const UserProfile = () => {
  const [userData, setUserData] = useState([]); // Assuming userData is an array now

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
      <StyledView>
        <StyledText text="Loading profile..." tw="text-black" />
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
          <StyledView tw="mb-4">
            <StyledText tw="text-lg text-black mb-1 font-bold" text="Email" />
            <StyledText tw="text-base text-black" text={user.email} />
          </StyledView>
          <StyledView tw="mb-4">
            <StyledText
              tw="text-lg text-black mb-1 font-bold"
              text="Phone Number "
            />
            <StyledText
              tw="text-base text-black"
              text={user.phone_number.toString()}
            />
          </StyledView>
        </StyledView>
      ))}
    </StyledView>
  );
};

export default UserProfile;
