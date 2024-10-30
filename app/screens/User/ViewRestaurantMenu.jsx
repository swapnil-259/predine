import {useFocusEffect} from '@react-navigation/native';
import React, {useCallback, useState} from 'react';
import {FlatList, Image} from 'react-native';
import {Appbar} from 'react-native-paper';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {StyledText, StyledView} from '../../components';
import {apiURL} from '../../constants/urls';
import {getData} from '../../services/api/apiService';
import {baseURL} from '../../services/api/axios';

const ViewRestaurantMenu = ({route}) => {
  const [menuData, setMenuData] = useState([]);
  const [dishCounts, setDishCounts] = useState({}); // Track quantities per dish

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

  const incrementCount = id => {
    setDishCounts(prevCounts => ({
      ...prevCounts,
      [id]: (prevCounts[id] || 0) + 1,
    }));
  };

  const decrementCount = id => {
    setDishCounts(prevCounts => ({
      ...prevCounts,
      [id]: Math.max((prevCounts[id] || 1) - 1, 0),
    }));
  };

  const renderDish = ({item}) => (
    <StyledView tw="p-4 bg-[#FEF7F4] mb-4 rounded-lg shadow-lg flex-row m-4 border border-gray-300">
      {/* Left Side: Text Information */}
      <StyledView tw="flex-1 pr-4">
        {/* Name with Inline Diet Indicator */}
        <StyledView tw="flex-row items-center mb-2">
          {/* Bordered Square with Colored Circle */}
          <StyledView tw="w-5 h-5 border rounded border-gray-300 mr-2 items-center justify-center">
            <StyledView
              tw={`w-3 h-3 ${
                item.diet__parent === 'Veg' ? 'bg-green-600' : 'bg-red-600'
              } rounded-full`}
            />
          </StyledView>
          <StyledText tw="text-lg font-bold" text={item.name} />
        </StyledView>

        {/* Description */}
        <StyledText
          tw="text-sm text-gray-700 font-bold mb-1"
          text={`Description: ${item.description}`}
        />

        {/* Diet */}
        <StyledText
          tw="text-sm text-gray-700 font-bold mb-1"
          text={`Diet: ${item.diet__parent}`}
        />

        {/* Category */}
        <StyledText
          tw="text-sm text-gray-700 font-bold mb-1"
          text={`Category: ${item.category__parent}`}
        />

        {/* Price */}
        <StyledText
          tw="text-base text-black font-bold mt-1"
          text={`₹${item.price}`}
        />

        {/* Preparation Time */}
        <StyledText
          tw="text-sm text-gray-700 font-bold mb-1"
          text={`Preparation time: ${item.preparation_time} mins`}
        />

        {/* Recommended Badge */}
        {item.recommended && (
          <StyledText
            tw="text-green-600 font-bold mt-1"
            text="🌟 Recommended"
          />
        )}

        {/* Counter Icons */}
        <StyledView tw="flex-row items-center mt-3">
          <MaterialCommunityIcons
            name="minus-circle-outline"
            size={24}
            color="black"
            onPress={() => decrementCount(item.id)}
          />
          <StyledText
            tw="mx-2 text-lg font-bold"
            text={`${dishCounts[item.id] || 0}`}
          />
          <MaterialCommunityIcons
            name="plus-circle-outline"
            size={24}
            color="black"
            onPress={() => incrementCount(item.id)}
          />
        </StyledView>
      </StyledView>

      {/* Right Side: Dish Image */}
      <StyledView tw="items-center">
        <Image
          source={{uri: baseURL + '/media/' + item.image}} // Assuming there's a base URL for images
          style={{
            width: 100,
            height: 100,
            borderRadius: 10,
          }}
          resizeMode="cover"
        />
      </StyledView>
    </StyledView>
  );

  return (
    <StyledView tw="flex-1 bg-white">
      <Appbar.Header style={{backgroundColor: '#FE7420'}}>
        <Appbar.Content
          title="Restaurant Menu"
          titleStyle={{
            fontSize: 24,
            fontWeight: '800',
            textAlign: 'center',
            color: '#fff',
          }}
        />
      </Appbar.Header>

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
