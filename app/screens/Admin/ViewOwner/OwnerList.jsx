import {useFocusEffect} from '@react-navigation/native';
import {useCallback, useState} from 'react';
import {ScrollView} from 'react-native-gesture-handler';
import {PaperProvider} from 'react-native-paper';
import {RestaurantCard, StyledText, StyledView} from '../../../components';
import {apiURL} from '../../../constants/urls';
import {getData} from '../../../services/api/apiService';

const OwnerList = ({navigation}) => {
  const [data, setData] = useState([]);

  const ownerList = async () => {
    try {
      const res = await getData(apiURL.OWNER_LIST);
      setData(res.data);
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };

  useFocusEffect(
    useCallback(() => {
      ownerList();
    }, []),
  );
  return (
    <PaperProvider>
      <StyledView tw="flex-1 p-3 bg-white">
        <ScrollView
          contentContainerStyle={
            !data
              ? {flexGrow: 1, justifyContent: 'center', alignItems: 'center'}
              : {}
          }
          tw="bg-white">
          {!data ? (
            <StyledText tw="text-center text-black">
              Waiting for data...
            </StyledText>
          ) : (
            data.map((each, index) => {
              console.log('each', each);
              return (
                <RestaurantCard
                  onPress={() =>
                    navigation.navigate('View Owner', {id: each.id})
                  }
                  res_name={each.restaurant_name}
                  res_type={each.restaurant_type__parent}
                  res_image={each.restaurant_pic}
                  key={index}></RestaurantCard>
              );
            })
          )}
        </ScrollView>
      </StyledView>
    </PaperProvider>
  );
};

export default OwnerList;
