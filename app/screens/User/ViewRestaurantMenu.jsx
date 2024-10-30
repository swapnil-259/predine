import BottomSheet from '@gorhom/bottom-sheet';
import {useFocusEffect} from '@react-navigation/native';
import React, {useCallback, useRef, useState} from 'react';
import {FlatList, Image, TouchableOpacity} from 'react-native';
import {Appbar, Modal, PaperProvider, Portal} from 'react-native-paper';
import {StyledText, StyledView} from '../../components';
import HHMMTimepicker from '../../components/HHMMTimepicker';
import {apiURL} from '../../constants/urls';
import {getData} from '../../services/api/apiService';
import {baseURL} from '../../services/api/axios';

const ViewRestaurantMenu = ({route}) => {
  const [menuData, setMenuData] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedTime, setSelectedTime] = useState(null); // State to hold selected time
  const bottomSheetRef = useRef(null); // Ref to control BottomSheet

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handleAdd = item => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(cartItem => cartItem.id === item.id);
      if (existingItem) {
        return prevItems.map(cartItem =>
          cartItem.id === item.id
            ? {...cartItem, quantity: cartItem.quantity + 1}
            : cartItem,
        );
      }
      return [...prevItems, {...item, quantity: 1}];
    });
    bottomSheetRef.current?.expand(); // Open the BottomSheet when item is added
  };

  const handleIncrement = itemId => {
    setCartItems(prevItems =>
      prevItems.map(cartItem =>
        cartItem.id === itemId
          ? {...cartItem, quantity: cartItem.quantity + 1}
          : cartItem,
      ),
    );
  };

  const handleDecrement = itemId => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(cartItem => cartItem.id === itemId);
      if (existingItem.quantity > 1) {
        return prevItems.map(cartItem =>
          cartItem.id === itemId
            ? {...cartItem, quantity: cartItem.quantity - 1}
            : cartItem,
        );
      } else {
        const updatedCartItems = prevItems.filter(
          cartItem => cartItem.id !== itemId,
        );
        if (updatedCartItems.length === 0) {
          bottomSheetRef.current?.close();
        }
        return updatedCartItems;
      }
    });
  };

  const handleClearCart = () => {
    setCartItems([]);
    bottomSheetRef.current?.close();
  };

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

  const renderDish = ({item}) => {
    const cartItem = cartItems.find(cartItem => cartItem.id === item.id);
    const quantity = cartItem ? cartItem.quantity : 0;

    return (
      <StyledView tw="p-4 bg-[#FEF7F4] mb-4 rounded-lg shadow-lg flex-row border border-[#ccc]">
        <StyledView tw="flex-1 pr-4">
          <StyledText tw="text-lg text-black font-bold mb-2" text={item.name} />
          <StyledView style={{flexDirection: 'row'}} tw="gap-1">
            <StyledText
              tw="text-sm text-gray-700 mb-1 font-bold"
              text="Description :"
            />
            <StyledText
              tw="text-sm text-gray-500 mb-1"
              text={item.description}
            />
          </StyledView>
          <StyledView style={{flexDirection: 'row'}} tw="gap-1">
            <StyledText
              tw="text-sm text-gray-700 mb-1 font-bold"
              text="Diet:"
            />
            <StyledText
              tw="text-sm text-gray-500 mb-1"
              text={item.diet__parent}
            />
          </StyledView>
          <StyledView style={{flexDirection: 'row'}} tw="gap-1">
            <StyledText
              tw="text-sm text-gray-700 mb-1 font-bold"
              text="Category:"
            />
            <StyledText
              tw="text-sm text-gray-500 mb-1"
              text={item.category__parent}
            />
          </StyledView>
          <StyledView style={{flexDirection: 'row'}} tw="gap-1">
            <StyledText
              tw="text-sm text-gray-700 font-bold"
              text="Preparation time:"
            />
            <StyledText
              tw="text-sm text-gray-500"
              text={`${item.preparation_time} mins`}
            />
          </StyledView>
          <StyledText
            tw="text-base text-black font-bold mt-1"
            text={`₹${item.price}`}
          />
          {item.recommended && (
            <StyledText tw="text-green-600 font-bold" text="Recommended" />
          )}

          <StyledView>
            {quantity === 0 ? (
              <TouchableOpacity
                onPress={() => handleAdd(item)}
                style={{
                  backgroundColor: 'green',
                  paddingVertical: 8,
                  paddingHorizontal: 20,
                  borderRadius: 5,
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 200,
                  marginTop: 10,
                }}>
                <StyledText
                  tw="text-white font-bold"
                  style={{fontSize: 20}}
                  text="Add"
                />
              </TouchableOpacity>
            ) : (
              <StyledView
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  backgroundColor: 'green',
                  paddingVertical: 8,
                  paddingHorizontal: 15,
                  borderRadius: 5,
                  justifyContent: 'space-between',
                  width: 200,
                  marginTop: 10,
                }}>
                <TouchableOpacity onPress={() => handleDecrement(item.id)}>
                  <StyledText
                    tw="text-white font-bold"
                    style={{fontSize: 20}}
                    text="-"
                  />
                </TouchableOpacity>
                <StyledText
                  tw="text-white font-bold"
                  text={quantity.toString()}
                />
                <TouchableOpacity onPress={() => handleIncrement(item.id)}>
                  <StyledText
                    tw="text-white font-bold"
                    style={{fontSize: 20}}
                    text="+"
                  />
                </TouchableOpacity>
              </StyledView>
            )}
          </StyledView>
        </StyledView>

        <Image
          source={{uri: baseURL + '/media/' + item.image}}
          style={{
            width: 100,
            height: 100,
            borderRadius: 10,
            alignSelf: 'center',
          }}
          resizeMode="cover"
        />
      </StyledView>
    );
  };

  const handleBuyNow = () => {
    openModal();
    console.log('Proceeding to checkout with items:', cartItems);
    console.log('Selected Time:', selectedTime);
  };

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  const handleOrder = () => {
    if (!selectedTime) {
      alert('Please select a time for your order.');
      return;
    }
    console.log('Order Details:');
    console.log('Cart Items:', cartItems);
    console.log('Selected Time:', selectedTime);
    // You can proceed to handle order submission here
    closeModal();
  };

  return (
    <PaperProvider>
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
          tw="p-4"
          data={menuData}
          renderItem={renderDish}
          keyExtractor={(item, index) => index.toString()}
          showsVerticalScrollIndicator={false}
        />

        {/* BottomSheet for Cart */}
        <BottomSheet
          ref={bottomSheetRef}
          snapPoints={['25%', '50%']}
          index={-1}
          backgroundStyle={{backgroundColor: '#f5f5f5'}}>
          <StyledView tw="p-4">
            <StyledText
              tw="text-xl text-black font-bold mb-4"
              text="Your Cart"
            />
            {cartItems.length > 0 ? (
              cartItems.map((item, index) => (
                <StyledView key={index} tw="flex-row justify-between mb-2">
                  <StyledText
                    tw="text-base text-black"
                    text={`${item.name} x ${item.quantity}`}
                  />
                  <StyledText
                    tw="text-base text-black"
                    text={`₹${item.price * item.quantity}`}
                  />
                </StyledView>
              ))
            ) : (
              <StyledText
                tw="text-base text-gray-500"
                text="No items in cart."
              />
            )}
            <StyledText
              tw="text-lg font-bold mt-4 text-black"
              text={`Total: ₹${totalPrice}`}
            />
            <StyledView
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: 10,
              }}>
              <TouchableOpacity
                onPress={handleClearCart}
                style={{
                  backgroundColor: '#f5f5f5',
                  paddingVertical: 10,
                  paddingHorizontal: 20,
                  borderRadius: 5,
                  flex: 1,
                  marginRight: 5,
                  alignItems: 'center',
                  borderColor: 'red',
                  borderWidth: 1,
                }}>
                <StyledText tw="text-red-500 font-bold" text="Clear" />
              </TouchableOpacity>

              <TouchableOpacity
                onPress={handleBuyNow}
                style={{
                  backgroundColor: 'green',
                  paddingVertical: 10,
                  paddingHorizontal: 20,
                  borderRadius: 5,
                  flex: 1,
                  marginLeft: 5,
                  alignItems: 'center',
                }}>
                <StyledText tw="text-white font-bold" text="Buy Now" />
              </TouchableOpacity>
            </StyledView>
          </StyledView>
        </BottomSheet>

        {/* Modal for Order Time */}
        <Portal>
          <Modal
            visible={showModal}
            onDismiss={closeModal}
            contentContainerStyle={{
              padding: 20,
              backgroundColor: 'white',
              borderRadius: 10,
            }}>
            <StyledText
              tw="text-lg font-bold text-black mb-4"
              text="Select Order Time"
            />
            <HHMMTimepicker
              selectedTime={selectedTime}
              onTimeChange={setSelectedTime}
              minTime={new Date()}
            />
            <TouchableOpacity
              onPress={handleOrder}
              style={{
                backgroundColor: '#FE7420',
                paddingVertical: 10,
                borderRadius: 5,
                marginTop: 20,
              }}>
              <StyledText
                tw="text-white text-center font-bold"
                text="Place Order"
              />
            </TouchableOpacity>
          </Modal>
        </Portal>
      </StyledView>
    </PaperProvider>
  );
};

export default ViewRestaurantMenu;
