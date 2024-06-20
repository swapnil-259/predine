import {View, Text} from 'react-native';
import {getData} from '../../../services/api/apiService';
import {apiURL} from '../../../constants/urls';
import {useEffect, useState} from 'react';
import {OwnerDetailsCard, StyledView} from '../../../components';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const ViewOwner = ({route, navigation}) => {
  const [data, setData] = useState([]);
  console.log(route.params.id);

  const viewOwners = async () => {
    const data = route.params.id;
    try {
      const res = await getData(apiURL.VIEW_OWNERS, {id: data});
      console.log(res.data);
      setData(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    viewOwners();
  }, []);

  return (
    <StyledView tw="flex-1 p-3 bg-white">
      <OwnerDetailsCard data={data}></OwnerDetailsCard>
    </StyledView>
  );
};

export default ViewOwner;
