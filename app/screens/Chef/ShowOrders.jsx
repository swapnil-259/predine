import { useFocusEffect } from '@react-navigation/native';
import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';
import { BackHandler, Keyboard, ScrollView, Text } from 'react-native';
import {
  Appbar,
  Card,
  List,
  Paragraph,
  SegmentedButtons,
  Title,
} from 'react-native-paper';
import { StyledButton, StyledText, StyledView } from '../../components';
import { apiURL } from '../../constants/urls';
import { getData, postData } from '../../services/api/apiService';
import { baseURL } from '../../services/api/axios';
const ShowOrders = ({navigation}) => {
  const [orders, setOrders] = useState([]);
  const [value, setValue] = useState('all');
  const [visible, setVisible] = useState(false);



    const showDialog = () => setVisible(true);
    const hideDialog = () => setVisible(false);
  
    useEffect(() => {
      const keyboardDidShowListener = Keyboard.addListener(
        'keyboardDidShow',
        () => {
          setKeyboardVisible(true);
        },
      );
      const keyboardDidHideListener = Keyboard.addListener(
        'keyboardDidHide',
        () => {
          setKeyboardVisible(false);
        },
      );
  
      const backAction = () => {
        showDialog();
        return true;
      };
  
      BackHandler.addEventListener('hardwareBackPress', backAction);
  
      return () => {
        keyboardDidHideListener.remove();
        keyboardDidShowListener.remove();
        BackHandler.removeEventListener('hardwareBackPress', backAction);
      };
    }, []);
  
  const orderData = async () => {
    try {
      const res = await axios.get(baseURL+ apiURL.CHEF_ORDER_DATA);
      console.log(res.data);
      setOrders(res.data.data);
    } catch (err) {
      console.log('Error fetching order data:', err);
    }
  };


  const checkAndUpdateOrderStatus = () => {
    const currentTime = new Date();
    orders.forEach(order => {
      console.log('order',order);
      const receivingTime = new Date(order.order_receiving_time);
      if (receivingTime < currentTime && order.order_status == 'Preparing') {
        handleUpdateOrderStatus(order.order_id);
      }
    });
  };

   useFocusEffect(
    useCallback(() => {
      orderData();

      const intervalId = setInterval(() => {
        orderData(); 
        checkAndUpdateOrderStatus(); 
      }, 5000);
      return () => clearInterval(intervalId); 
    }, []),
  );

  const filteredOrders = orders.filter(order => {
    if (value === 'all') {
      return true;
    } else if (value === 'prep') {
      return order.order_status === 'Preparing';
    } else if (value === 'prev') {
      return (
        order.order_status === 'Completed' || order.order_status === 'Cancelled'
      );
    }
    return false;
  });

  const handleUpdateOrderStatus = async orderId => {
    try {
      const updatedOrder = await postData(apiURL.COMPLETE_ORDER, {
        orderId: orderId,
      });
      console.log(updatedOrder);
      orderData();
    } catch (error) {
      console.error('Error updating order status:', error);
    }
  };

  const handleRecievedOrder = async orderId => {
    console.log(orderId);
    try {
      const canceledOrder = await postData(apiURL.RECIEVED_ORDER, {
        orderId: orderId,
      });
      console.log(canceledOrder);
      orderData();
    } catch (error) {
      console.error('Error marking order as received:', error);
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

  return (
    <ScrollView contentContainerStyle={{flexGrow: 1}}>
      <StyledView style={{flex: 1, backgroundColor: '#fff'}}>
        <Appbar.Header style={{backgroundColor: '#FE7420'}}>
          <Appbar.Content
            title="Dashboard"
            titleStyle={{
              fontSize: 24,
              fontWeight: '800',
              marginLeft: 35,
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
        </Appbar.Header>
        <SegmentedButtons
          value={value}
          style={{
            backgroundColor: '#FEF7F4',
            marginTop: 20,
            margin: 20,
          }}
          onValueChange={setValue}
          buttons={[
            {
              value: 'all',
              label: 'All',
              icon: 'view-list',
              style: {
                backgroundColor: value === 'all' ? '#FEF7F4' : '#fff',
              },
            },
            {
              value: 'prep',
              label: 'Preparing',
              icon: 'chef-hat',
              style: {
                backgroundColor: value === 'prep' ? '#FEF7F4' : '#fff',
              },
            },
            {
              value: 'prev',
              label: 'Previous',
              icon: 'history',
              style: {
                backgroundColor: value === 'prev' ? '#FEF7F4' : '#fff',
              },
            },
          ]}
        />
       
        {filteredOrders.map((order, index) => (
          <Card
            key={index}
            style={{
              marginBottom: 15,
              borderRadius: 10,
              shadowColor: '#000',
              shadowOffset: {width: 0, height: 2},
              shadowOpacity: 0.3,
              shadowRadius: 4,
              elevation: 5,
              marginTop: 0,
              margin: 20,
            }}>
            <Card.Content
              style={{backgroundColor: '#FEF7F4', borderRadius: 10}}>
              <Title style={{fontSize: 18, fontWeight: 'bold', color: '#333'}}>
                Order ID: {order.order_id}
              </Title>
              <Paragraph style={{marginBottom: 5}}>
                <Text style={{fontWeight: 'bold', color: '#000'}}>
                  Order Time:
                </Text>{' '}
                {new Date(order.order_time).toLocaleString()}
              </Paragraph>
              <Paragraph style={{marginBottom: 5}}>
                <Text style={{fontWeight: 'bold', color: '#000'}}>
                  Receiving Time:
                </Text>{' '}
                {new Date(order.order_receiving_time).toLocaleString()}
              </Paragraph>
              <Paragraph style={{marginBottom: 5}}>
                <Text style={{fontWeight: 'bold', color: '#000'}}>
                  Total Amount:
                </Text>{' '}
                ₹{order.total_amount}
              </Paragraph>
              <Paragraph style={{marginBottom: 5}}>
                <Text style={{fontWeight: 'bold', color: '#000'}}>
                  Restaurant:
                </Text>{' '}
                {order.restaurant?.name}
              </Paragraph>
              <Paragraph style={{marginBottom: 5}}>
                <Text style={{fontWeight: 'bold', color: '#000'}}>
                  Address:
                </Text>{' '}
                {order.restaurant?.address}
              </Paragraph>
              <Paragraph style={{marginBottom: 5}}>
                <Text style={{fontWeight: 'bold', color: '#000'}}>
                  Order Status:
                </Text>{' '}
                {order?.order_status}
              </Paragraph>

              {order.dishes.map((dish, dishIndex) => (
                <List.Item
                  key={dishIndex}
                  titleStyle={{fontWeight: 'bold'}}
                  title={dish.dish_name}
                  description={
                    <StyledView>
                      <StyledText
                        text={`Quantity: ${dish.quantity}`}
                        tw="font-bold"
                      />
                      <StyledText
                        text={`Price: Rs ${dish.amount}`}
                        tw="font-bold"
                      />
                    </StyledView>
                  }
                />
              ))}

              {order.order_status === 'Preparing' && (
                <StyledButton
                  mode="contained"
                  onPress={() => handleUpdateOrderStatus(order.order_id)}
                  style={{marginTop: 10}}
                  label={'Completed'}
                />
              )}

              {order.order_status === 'Completed' &&
                order.receiver_status === 'Pending' && (
                  <StyledButton
                    mode="contained"
                    onPress={() => handleRecievedOrder(order.order_id)}
                    style={{marginTop: 10}}
                    label={'Received'}
                  />
                )}
            </Card.Content>
          </Card>
        ))}
      </StyledView>
    </ScrollView>
  );
};

export default ShowOrders;
