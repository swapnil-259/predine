import { useFocusEffect, useNavigation } from '@react-navigation/native';
import React, { useCallback, useState } from 'react';
import { Image, ScrollView, Text, View } from 'react-native';
import { Appbar, Card, Paragraph, Searchbar, Title } from 'react-native-paper';
import { StyledButton } from '../../components';
import { apiURL } from '../../constants/urls';
import { getData } from '../../services/api/apiService';
import { baseURL } from '../../services/api/axios';

const UserDashboard = () => {
  const [allRestaurantsData, setAllRestaurantsData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');


  const navigation = useNavigation();

  useFocusEffect(
    useCallback(() => {
      allRestaurants();
    }, []),
  );

  const allRestaurants = async () => {
    try {
      const res = await getData(apiURL.ALL_RESTAURANTS);
      setAllRestaurantsData(res.data);
      setFilteredData(res.data);
    } catch (err) {
      console.log('Error fetching restaurant data:', err);
    }
  };
  const logoutUser = async () => {
    try {
      const res = await getData(apiURL.LOGOUT);
      navigation.navigate('Logout');
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };

  const onChangeSearch = query => {
    setSearchQuery(query);
    if (query) {
      const filtered = allRestaurantsData.filter(restaurant => {
        const lowerQuery = query.toLowerCase();
        return (
          restaurant.restaurant_name.toLowerCase().includes(lowerQuery) ||
          restaurant.address.toLowerCase().includes(lowerQuery) ||
          restaurant.restaurant_type__parent.toLowerCase().includes(lowerQuery)
        );
      });
      setFilteredData(filtered);
    } else {
      setFilteredData(allRestaurantsData);
    }
  };

  const handleCategoryPress = category => {
    console.log('hlelo');
  };

  const handleViewPress = restaurant => {
    navigation.navigate('ViewMenu', {restaurant});
  };

  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <Appbar.Header style={{backgroundColor: '#FE7420'}}>
        <Appbar.Action
          color="#fff"
          icon="menu"
          onPress={() => {
            navigation.openDrawer();
          }}
        />
        <Appbar.Content
          title="Dashboard"
          titleStyle={{
            fontSize: 24,
            fontWeight: '800',
            textAlign: 'center',
            color: '#fff',
          }}
        />
        <Appbar.Action
          icon="logout"
          onPress={() => {
            logoutUser();
          }}
          color="#fff"
        />
        <Appbar.Action
          icon="account"
          onPress={() => {
            navigation.navigate('User Profile');
          }}
          color="#fff"
        />
      </Appbar.Header>

      <Searchbar
        placeholder="Search by name, address, or category"
        onChangeText={onChangeSearch}
        value={searchQuery}
        style={{
          margin: 15,
          borderRadius: 10,
          backgroundColor: '#FEF7F4',
          borderWidth: 1,
          borderColor: '#ccc',
        }}
      />

      {/* <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{marginVertical: 10, margin: 20}}>
        {categories.map(category => (
          <TouchableOpacity
            key={category.id}
            onPress={() => handleCategoryPress(category)}
            style={{
              width: 100,
              height: 130, // Set width to square or long rectangle
              marginRight: 10,
              marginLeft: 10,
              alignItems: 'center', // Center align the content
            }}>
            <View
              style={{
                width: 80,
                height: 80,
                borderRadius: 40, // Circle shape
                overflow: 'hidden',
                marginBottom: 5,
              }}>
              <Image
                source={{uri: category.image}} // Placeholder image or category image URL
                style={{width: '100%', height: '100%', resizeMode: 'cover'}}
              />
            </View>
            <Text
              style={{
                color: '#000',
                fontWeight: 'bold',
                textAlign: 'center',
              }}>
              {category.name}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView> */}

      <ScrollView
        contentContainerStyle={{
          margin: 15,
          paddingTop: 0,
          paddingBottom: 10,
          // marginBottom: 10,
        }}>
        {filteredData.map((item, index) => (
          <Card
            key={index}
            style={{
              marginBottom: 15,
              borderRadius: 10,
              backgroundColor: '#FEF7F4',
              borderWidth: 1,
              borderColor: '#ccc',
              overflow: 'hidden',
            }}>
            {item.restaurant_pic ? (
              <Image
                source={{uri: `${baseURL}media/${item.restaurant_pic}`}} // Updated URL structure
                style={{
                  height: 150,
                  width: '100%',
                  resizeMode: 'cover',
                }}
              />
            ) : (
              <View
                style={{
                  height: 150,
                  width: '100%',
                  backgroundColor: '#f0f0f0',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text style={{color: '#aaa', fontSize: 16}}>No Image</Text>
              </View>
            )}

            <Card.Content>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <View style={{flex: 3}}>
                  <Title
                    style={{
                      fontWeight: 'bold',
                      fontSize: 20,
                      marginTop: 10,
                      color: '#000',
                    }}>
                    {item.restaurant_name}
                  </Title>
                  <Paragraph style={{fontSize: 16, color: '#555'}}>
                    {item.address}
                  </Paragraph>
                  <Text style={{fontSize: 15, color: '#000', marginTop: 5}}>
                    {item.restaurant_type__parent}
                  </Text>
                </View>
                <StyledButton
                  onPress={() =>
                    navigation.navigate('ViewRestaurantMenu', {id: item.id})
                  }
                  label={'View'}>
                  View
                </StyledButton>
              </View>
            </Card.Content>
          </Card>
        ))}
      </ScrollView>
    </View>
  );
};

export default UserDashboard;
