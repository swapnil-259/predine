import {useFocusEffect} from '@react-navigation/native';
import React, {useCallback, useState} from 'react';
import {FlatList, Image} from 'react-native';
import {StyledText, StyledView} from '../../components';
import {apiURL} from '../../constants/urls';
import {getData} from '../../services/api/apiService';
import {baseURL} from '../../services/api/axios';

const ViewRestaurantMenu = ({route}) => {
  const [menuData, setMenuData] = useState([]);
  console.log('id', route.params.id);

  useFocusEffect(
    useCallback(() => {
      restaurantMenu();
    }, []),
  );

  const restaurantMenu = async () => {
    try {
      const res = await getData(apiURL.MENU_DATA, {data: route.params.id});
      setMenuData(res.data);
      console.log(res.data);
    } catch (err) {
      console.log('Error fetching menu data:', err);
    }
  };

  // Render each dish item
  const renderDish = ({item}) => (
    <StyledView tw="p-4 bg-[#FEF7F4] mb-4 rounded-lg shadow-lg flex-row">
      {/* Left side: Dish details */}
      <StyledView tw="flex-1 pr-4">
        <StyledText tw="text-lg font-bold mb-2" text={item.name} />
        <StyledText
          tw="text-sm text-gray-500 mb-1"
          text={`Description: ${item.description}`}
        />
        <StyledText
          tw="text-sm text-gray-700 mb-1"
          text={`Diet: ${item.diet__parent}`}
        />
        <StyledText
          tw="text-sm text-gray-700 mb-1"
          text={`Category: ${item.category__parent}`}
        />
        <StyledText
          tw="text-base text-black font-bold mt-1"
          text={`₹${item.price}`}
        />
        <StyledText
          tw="text-sm text-gray-500"
          text={`Preparation time: ${item.preparation_time} mins`}
        />
        {item.recommended && (
          <StyledText tw="text-green-600 font-bold" text="Recommended" />
        )}
      </StyledView>
      {/* Right side: Dish image */}
      <Image
        source={{uri: baseURL + '/media/' + item.image}} // Assuming there's a base URL for images
        style={{width: 100, height: 100, borderRadius: 10, alignSelf: 'center'}}
        resizeMode="cover"
      />
    </StyledView>
  );

  return (
    <StyledView tw="flex-1 bg-white p-4">
      <StyledText
        tw="text-2xl font-bold text-black mb-4"
        text="Restaurant Menu"
      />
      <FlatList
        data={menuData}
        renderItem={renderDish}
        keyExtractor={(item, index) => index.toString()}
        showsVerticalScrollIndicator={false}
      />
    </StyledView>
  );
};

export default ViewRestaurantMenu;
