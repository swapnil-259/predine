import BottomSheet from '@gorhom/bottom-sheet';
// import DateTimePicker from '@react-native-community/datetimepicker';
import {BottomSheetScrollView} from '@gorhom/bottom-sheet';
import {useFocusEffect} from '@react-navigation/native';
import React, {useCallback, useRef, useState} from 'react';
import {Alert, Image, ScrollView, TouchableOpacity} from 'react-native';
import DatePicker from 'react-native-date-picker';
import {Appbar, Modal, PaperProvider, Portal} from 'react-native-paper';
import {StyledButton, StyledText, StyledView} from '../../components';
import {apiURL} from '../../constants/urls';
import {getData, postData} from '../../services/api/apiService';
import {baseURL} from '../../services/api/axios';

const ViewRestaurantMenu = ({route, navigation}) => {
  const [menuData, setMenuData] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [selectedTime, setSelectedTime] = useState(new Date());
  const [isTimePicked, setIsTimePicked] = useState(false);
  const [openingTime, setOpeningTime] = useState(null);
  const [closingTime, setClosingTime] = useState(null);

  const bottomSheetRef = useRef(null);

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedTime(new Date());
    setIsTimePicked(false);
  };

  const getTimings = async () => {
    try {
      const res = await getData(apiURL.GET_TIMIMGS);
      const startTime = new Date();
      startTime.setHours(res.data.opening_time, 0, 0);
      const endTime = new Date();
      endTime.setHours(res.data.closing_time, 0, 0);
      setOpeningTime(startTime);
      setClosingTime(endTime);
    } catch (err) {}
  };

  const handleTimeChange = time => {
    if (time >= openingTime && time <= closingTime) {
      setSelectedTime(time);
      setIsTimePicked(true);
      setShowTimePicker(false);
    } else {
      Alert.alert(
        'Invalid Time',
        'Please select a time between 9 AM and 7 PM.',
      );
      setShowTimePicker(false);
    }
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
    bottomSheetRef.current?.expand();
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
      getTimings();
    }, []),
  );

  const restaurantMenu = async () => {
    try {
      const res = await getData(apiURL.MENU_DATA, {data: route.params.id});
      setMenuData(res.data);
    } catch (err) {}
  };

  const renderDish = ({item}) => {
    const cartItem = cartItems.find(cartItem => cartItem.id === item.id);
    const quantity = cartItem ? cartItem.quantity : 0;

    return (
      <StyledView tw="p-4 bg-[#FEF7F4] mb-4 rounded-lg shadow-lg flex-row border border-[#ccc]">
        <StyledView tw="flex-1 pr-4">
          <StyledView style={{flexDirection: 'row', alignItems: 'center'}}>
            <StyledView
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginRight: 8,
              }}>
              <StyledView tw="w-5 h-5 border rounded border-gray-300 mr-2 items-center justify-center">
                <StyledView
                  tw={`w-3 h-3 ${
                    item.diet__parent === 'Veg' ? 'bg-green-600' : 'bg-red-600'
                  } rounded-full`}
                />
              </StyledView>
            </StyledView>
            <StyledText tw="text-lg text-black font-bold" text={item.name} />
          </StyledView>

          <StyledView style={{flexDirection: 'row'}} tw="gap-1">
            <StyledText
              tw="text-sm text-gray-700 mb-1 font-bold"
              text="Description :"
            />
            <StyledText
              tw="text-sm text-gray-500 mb-1 font-bold"
              text={item.description}
            />
          </StyledView>
          <StyledView style={{flexDirection: 'row'}} tw="gap-1">
            <StyledText
              tw="text-sm text-gray-700 mb-1 font-bold"
              text="Diet:"
            />
            <StyledText
              tw="text-sm text-gray-500 mb-1 font-bold"
              text={item.diet__parent}
            />
          </StyledView>
          <StyledView style={{flexDirection: 'row'}} tw="gap-1">
            <StyledText
              tw="text-sm text-gray-700 mb-1 font-bold"
              text="Category:"
            />
            <StyledText
              tw="text-sm text-gray-500 mb-1 font-bold"
              text={item.category__parent}
            />
          </StyledView>
          <StyledView style={{flexDirection: 'row'}} tw="gap-1">
            <StyledText
              tw="text-sm text-gray-700 font-bold"
              text="Preparation time:"
            />
            <StyledText
              tw="text-sm text-gray-500 font-bold"
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
                  tw="text-white font-bold text-[16px]"
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
                    style={{fontSize: 22}}
                    text="-"
                  />
                </TouchableOpacity>
                <StyledText
                  tw="text-white font-bold text-[16px]"
                  text={quantity.toString()}
                />
                <TouchableOpacity onPress={() => handleIncrement(item.id)}>
                  <StyledText
                    tw="text-white font-bold "
                    style={{fontSize: 22}}
                    text="+"
                  />
                </TouchableOpacity>
              </StyledView>
            )}
          </StyledView>
        </StyledView>

        <Image
          source={{uri: baseURL + 'media/' + item.image}}
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
    console.log('cartitems', cartItems);
    openModal();
  };

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  const handleOrder = async () => {
    if (!isTimePicked) {
      alert('Please select a time for your order.');
      return;
    }
    const totalPrice = cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0,
    );
    data = {
      cartItems: cartItems,
      selectedTime: selectedTime,
      totalPrice: totalPrice,
      restaurantId: route.params.id,
    };
    try {
      const res = await postData(apiURL.ORDER_PLACED, data);
      closeModal();
      setCartItems([]);
      console.log('res', res);

      bottomSheetRef.current?.close();
    } catch (err) {}
  };

  const getMinimumDate = () => {
    console.log('cartItems', cartItems);

    const maxPreparationTime = cartItems.reduce(
      (maxTime, item) => Math.max(maxTime, item.preparation_time),
      0,
    );

    console.log('Max Preparation Time:', maxPreparationTime);

    const minimumDate = new Date();
    console.log('Prev Minimum Date:', minimumDate);

    minimumDate.setMinutes(minimumDate.getMinutes() + maxPreparationTime);

    console.log('Next Minimum Date:', minimumDate);
    return minimumDate;
  };

  return (
    <PaperProvider>
      <StyledView tw="flex-1 bg-white">
        <Appbar.Header style={{backgroundColor: '#FE7420'}}>
          <Appbar.Action
            color="#fff"
            icon="arrow-left"
            onPress={() => {
              navigation.goBack();
            }}
          />
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
        <ScrollView contentContainerStyle={{padding: 10, paddingBottom: '50%'}}>
          {menuData.map((item, index) => (
            <StyledView key={index} tw="mb-4">
              {renderDish({item})}
            </StyledView>
          ))}
        </ScrollView>

        <BottomSheet
          ref={bottomSheetRef}
          snapPoints={['28%', '28%', '28%']}
          index={-1}
          enablePanDownToClose
          enableDynamicSizing={false}
          backgroundStyle={{
            backgroundColor: '#FEF7F4',
            borderRadius: 40,
            borderWidth: 1,
            borderColor: '#ccc',
          }}>
          <StyledText
            tw="text-xl text-black font-bold mb-4 pl-5 text-center"
            text="Your Cart"
          />
          <BottomSheetScrollView
            style={{
              margin: 10,
              marginTop: 0,
              borderWidth: 1,
              borderColor: '#ccc',
              borderRadius: 5,
            }}>
            {cartItems.length > 0 ? (
              cartItems.map((item, index) => {
                return (
                  <StyledView
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      padding: 10,
                    }}
                    key={index}>
                    <StyledText
                      tw="text-base text-black font-bold"
                      text={`${item.name} x ${item.quantity}`}
                    />
                    <StyledText
                      tw="text-base text-black font-bold"
                      text={`₹${item.price * item.quantity}`}
                    />
                  </StyledView>
                );
              })
            ) : (
              <StyledText
                tw="text-base text-gray-500"
                text="No items in cart."
              />
            )}
          </BottomSheetScrollView>
          <StyledText
            tw="text-lg font-bold text-black ml-5"
            text={`Total: ₹${totalPrice}`}
          />
          <StyledView
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              margin: 20,
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
                borderWidth: 0.5,
              }}>
              <StyledText
                tw="text-red-500 font-bold text-[16px]"
                text="Clear"
              />
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
              <StyledText
                tw="text-white font-bold text-[16px]"
                text="Buy Now"
              />
            </TouchableOpacity>
          </StyledView>
        </BottomSheet>

        <Portal>
          <Modal
            visible={showModal}
            onDismiss={closeModal}
            contentContainerStyle={{
              padding: 20,
              margin: 20,
              backgroundColor: 'white',
              borderRadius: 10,
              elevation: 5,
              shadowColor: '#000',
              shadowOffset: {width: 0, height: 2},
              shadowOpacity: 0.2,
              shadowRadius: 4,
            }}>
            <StyledView style={{alignItems: 'center', marginBottom: 20}}>
              <StyledText
                tw="text-lg font-bold text-black"
                text="Select Order Time"
              />
            </StyledView>

            <TouchableOpacity
              onPress={() => {
                setShowTimePicker(true), setSelectedTime(getMinimumDate());
              }}
              style={{
                backgroundColor: '#FEF7F4',
                padding: 15,
                borderRadius: 5,
                height: 50,
                width: '100%',
                borderColor: '#ccc',
                borderWidth: 1,
              }}>
              <StyledText
                tw="text-black align-center font-bold text-[18px]"
                text="Pick a time"
              />
            </TouchableOpacity>

            <DatePicker
              modal
              theme="light"
              open={showTimePicker}
              minimumDate={getMinimumDate()}
              date={selectedTime}
              onConfirm={handleTimeChange}
              onCancel={() => setShowTimePicker(false)}
              mode="time"
            />

            <StyledView style={{marginVertical: 20, alignItems: 'center'}}>
              <StyledText
                tw={'text-black text-lg font-bold'}
                text={
                  isTimePicked
                    ? selectedTime.toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                        hour12: true,
                      })
                    : 'No time selected'
                }
              />
            </StyledView>

            <StyledButton
              label={'Place Order'}
              onPress={handleOrder}></StyledButton>
          </Modal>
        </Portal>
      </StyledView>
    </PaperProvider>
  );
};

export default ViewRestaurantMenu;
