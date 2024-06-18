import {useEffect, useState} from 'react';
import {View, Text} from 'react-native';
import CustomDropdown from '../../components/CustomDropdown';
import {Dropdown} from 'react-native-element-dropdown';
import {RestaurantCard, StyledText, StyledView} from '../../components';
import {getData, postData} from '../../services/api/apiService';
import {apiURL} from '../../constants/urls';
import {ScrollView} from 'react-native-gesture-handler';

const ViewOwner = () => {
  const [value, setValue] = useState(null);
  const [data, setData] = useState([]);

  const viewOwners = async () => {
    console.log(apiURL.VIEW_OWNERS);
    try {
      const res = await getData(apiURL.VIEW_OWNERS);
      setData(res.data);
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    viewOwners();
  }, []);
  return (
    <StyledView tw="flex-1 p-5 bg-white">
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
            return (
              <RestaurantCard
                res_name={each.restaurant_name}
                res_type={each.restaurant_type__parent}
                key={index}></RestaurantCard>
            );
          })
        )}
      </ScrollView>
    </StyledView>
  );
};

export default ViewOwner;
