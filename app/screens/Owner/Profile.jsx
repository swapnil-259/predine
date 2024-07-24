import {useFocusEffect} from '@react-navigation/native';
import {useCallback, useState} from 'react';
import {
  OwnerDetailsCard,
  StyledButton,
  StyledText,
  StyledView,
} from '../../components';
import {apiURL} from '../../constants/urls';
import {getData} from '../../services/api/apiService';
const Profile = () => {
  const [ownerData, setOwnerData] = useState([]);
  const getProfileData = async () => {
    try {
      const res = await getData(apiURL.OWNER_DATA);
      console.log(res.data);
      setOwnerData(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useFocusEffect(
    useCallback(() => {
      getProfileData();
    }, []),
  );

  return (
    <StyledView tw="flex-1 bg-white">
      {ownerData.length === 0 ? (
        <StyledView tw=" flex-1 justify-center align-center">
          <StyledText tw="text-black text-center font-bold text-[18px]">
            Loading data...
          </StyledText>
        </StyledView>
      ) : (
        <StyledView>
          <OwnerDetailsCard data={ownerData} isEdit={false}></OwnerDetailsCard>
          <StyledView style={{flexDirection: 'row', justifyContent: 'center'}}>
            <StyledButton
              tw="mr-2"
              label={'Edit Restaurant Image'}></StyledButton>
            <StyledButton tw="mr-2" label={'Change Password'}></StyledButton>
          </StyledView>
        </StyledView>
      )}
    </StyledView>
  );
};

export default Profile;
