import {useFocusEffect} from '@react-navigation/native';
import {useCallback, useState} from 'react';
import {ScrollView} from 'react-native-gesture-handler';
import {StyledButtonTrans, StyledText, StyledView} from '../../components';
import CustomAccordian from '../../components/CustomAccordian';
import {apiURL} from '../../constants/urls';
import {getData} from '../../services/api/apiService';

const ViewMenu = () => {
  const [menuData, setMenuData] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  useFocusEffect(
    useCallback(() => {
      getMenu();
      getCategories();
    }, []),
  );

  const getMenu = async () => {
    try {
      const res = await getData(apiURL.ALL_DISH);
      setMenuData(res.data);
      console.log(res.data);
    } catch (err) {
      console.log('Error fetching dish categories:', err);
    }
  };
  const getCategories = async () => {
    try {
      const res = await getData(apiURL.GET_ALL_CATEGORY);
      setCategoryData(res.data);
      console.log(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <StyledView tw="flex-1 bg-white">
      <ScrollView
        contentContainerStyle={
          !menuData
            ? {flexGrow: 1, justifyContent: 'center', alignItems: 'center'}
            : {}
        }
        tw="bg-white">
        {!(menuData && categoryData) ? (
          <StyledText tw="text-center text-black">
            Waiting for data...
          </StyledText>
        ) : (
          categoryData.map((each, index) => {
            return (
              <CustomAccordian
                name={each.parent}
                key={index}
                menuData={menuData}></CustomAccordian>
            );
          })
        )}
      </ScrollView>
      <StyledView tw="pt-3 bg-[#FEF7F4]">
        <ScrollView horizontal>
          <StyledButtonTrans
            label={'All Categories'}
            marginRight={10}
            marginLeft={10}></StyledButtonTrans>

          {categoryData.map((each, index) => {
            return (
              <StyledButtonTrans
                key={index}
                label={each.parent}
                marginRight={10}
                marginLeft={10}></StyledButtonTrans>
            );
          })}
        </ScrollView>
      </StyledView>
    </StyledView>
  );
};

export default ViewMenu;
