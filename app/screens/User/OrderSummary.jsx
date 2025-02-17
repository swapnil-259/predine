import {useFocusEffect} from '@react-navigation/native';
import axios from 'axios';
import {useCallback, useState} from 'react';
import {ScrollView} from 'react-native';
import {Button, Card, List, Text, Title} from 'react-native-paper';
import RazorpayCheckout from 'react-native-razorpay';
import {StyledText, StyledView} from '../../components';
import {razorpay} from '../../constants/razorpay';
import {apiURL} from '../../constants/urls';
import {getData, postData} from '../../services/api/apiService';
import {baseURL} from '../../services/api/axios';
const OrderSummary = () => {
  const [orders, setOrders] = useState([]);

  const calculateRemainingTime = orderTime => {
    const orderTimestamp = new Date(orderTime).getTime();
    const currentTimestamp = new Date().getTime();
    const timeDiff = Math.max(0, 120000 - (currentTimestamp - orderTimestamp));
    return Math.floor(timeDiff / 1000);
  };

  const calculateRemainingTimeForPay = orderTime => {
    const orderTimestamp = new Date(orderTime).getTime();
    const currentTimestamp = new Date().getTime();
    const timeDiff = Math.max(0, 180000 - (currentTimestamp - orderTimestamp));
    return Math.floor(timeDiff / 1000);
  };

  const updateTimers = () => {
    setOrders(prevOrders =>
      prevOrders.map(order => ({
        ...order,
        remainingTime: calculateRemainingTime(order.order_time),
        paymentTiming:
          order.payment_status === 'Pending' &&
          order.level === 1 &&
          order.order_status === 'Accepted (by Restaurant Owner)'
            ? calculateRemainingTimeForPay(order.last_order_time)
            : 0,
      })),
    );
  };

  const getOrderSummary = async () => {
    try {
      const res = await getData(apiURL.ORDER_SUMMARY);
      setOrders(res.data);
    } catch (err) {
      console.log('Error fetching restaurant data:', err);
    }
  };

  const orderSummary = async () => {
    try {
      const res = await axios.get(baseURL + apiURL.ORDER_SUMMARY);

      const sortedOrders = res.data.data
        .sort((a, b) => new Date(b.order_time) - new Date(a.order_time))
        .map(order => ({
          ...order,
          remainingTime: calculateRemainingTime(order.order_time),
          paymentTiming:
            order.payment_status === 'Pending' &&
            order.level === 1 &&
            order.order_status === 'Accepted (by Restaurant Owner)'
              ? calculateRemainingTimeForPay(order.last_order_time)
              : 0,
          show_paynow_button:
            order.payment_status === 'Pending' &&
            order.level === 1 &&
            order.order_status === 'Accepted (by Restaurant Owner)',
          show_cancel_button:
            order.payment_status === 'Pending' &&
            order.level === 1 &&
            (order.order_status === 'Pending (by Restaurant Owner)' ||
              order.order_status === 'Accepted (by Restaurant Owner)'),
          show_recieved_button:
            order.payment_status === 'Success' &&
            order.level === 3 &&
            order.orders_status === 'Pending',
        }));
      console.log('order', sortedOrders);

      setOrders(sortedOrders);
    } catch (err) {
      console.error('Error fetching order summary:', err);
    }
  };

  const handleRecievedOrder = async orderId => {
    console.log(orderId);
    try {
      const canceledOrder = await postData(apiURL.RECIEVED_ORDER, {
        orderId: orderId,
      });
      console.log(canceledOrder);
      orderSummary();
    } catch (error) {
      console.error('Error marking order as received:', error);
    }
  };
  useFocusEffect(
    useCallback(() => {
      getOrderSummary();
      const timer = setInterval(updateTimers, 1000);
      const polling = setInterval(orderSummary, 3000);

      return () => {
        clearInterval(timer);
        clearInterval(polling);
      };
    }, []),
  );

  const cancelOrder = async orderId => {
    try {
      await postData(apiURL.CANCEL_ORDER, {order_id: orderId});
      orderSummary();
    } catch (err) {
      console.error('Error cancelling order:', err);
    }
  };

  const initiatePayment = async order => {
    try {
      const response = await postData(apiURL.CREATE_ORDER, {
        order_id: order.order_id,
      });
      const {razorpayOrderId, amount, prefill} = response;
      console.log('resssss', response);

      const options = {
        description: 'Order Payment',
        image: 'https://your-logo-url.com/logo.png',
        currency: 'INR',
        key: razorpay.PRODUCTION_RAZORPAY_KEY,
        amount: amount * 100,
        order_id: razorpayOrderId,
        name: 'Predine',
        prefill: {
          email: prefill.email,
          contact: prefill.contact,
        },
        theme: {color: '#FE7240'},
      };

      RazorpayCheckout.open(options)
        .then(async paymentData => {
          await postData(apiURL.CONFIRM_ORDER, {
            razorpay_order_id: paymentData.razorpay_order_id,
            razorpay_payment_id: paymentData.razorpay_payment_id,
            razorpay_signature: paymentData.razorpay_signature,
          });

          orderSummary();
        })
        .catch(error => {
          console.log(error);
        });
    } catch (error) {}
  };

  return (
    <ScrollView contentContainerStyle={{flexGrow: 1}}>
      <StyledView tw="flex-1 bg-white p-4">
        {orders.length === 0 ? (
          <StyledText tw="text-black text-center" text="No orders found." />
        ) : (
          orders.map((order, index) => (
            <Card
              key={index}
              style={{
                marginBottom: 16,
                borderRadius: 10,
                backgroundColor: '#FEF7F4',
              }}>
              <Card.Content>
                <Title>Order ID: {order.order_id}</Title>
                <Text variant="titleMedium" tw="text-black">
                  Order Status: {order.order_status}
                </Text>
                <Text variant="titleMedium" tw="text-black">
                  Payment Status: {order.payment_status}
                </Text>
                <Text variant="titleMedium" tw="text-black">
                  Total Amount: Rs {order.total_amount}
                </Text>
                <Text variant="titleMedium" tw="text-black">
                  Order Time: {new Date(order.order_time).toLocaleString()}
                </Text>
                <Text variant="titleMedium" tw="text-black">
                  Receiving Time:{' '}
                  {new Date(order.order_receiving_time).toLocaleString()}
                </Text>

                {order.payment_status === 'Success' && order.payment_id && (
                  <Text variant="titleMedium" tw="text-black">
                    Payment ID: {order.payment_id}
                  </Text>
                )}

                {order.dishes && order.dishes.length > 0 && (
                  <StyledView tw="mt-2">
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
                              text={`Price: Rs ${dish.total_amount}`}
                              tw="font-bold"
                            />
                          </StyledView>
                        }
                        left={props => (
                          <List.Icon {...props} icon="food-fork-drink" />
                        )}
                        style={{
                          paddingVertical: 5,
                        }}
                      />
                    ))}
                    {order.remainingTime > 0 &&
                      order.payment_status == 'Pending' &&
                      order.order_status == 'Pending (by Restaurant Owner)' && (
                        <StyledView style={{flexDirection: 'row'}}>
                          <StyledText
                            text="Time left to response the order:"
                            tw="text-black font-bold font-[16px]"
                          />
                          <StyledText
                            text={
                              ' ' +
                              `${Math.floor(order.remainingTime / 60)}m ${
                                order.remainingTime % 60
                              }s`
                            }
                            tw="text-red-500 font-bold"
                          />
                        </StyledView>
                      )}
                    {order.paymentTiming > 0 &&
                      order.payment_status === 'Pending' &&
                      order.level === 1 &&
                      order.order_status ===
                        'Accepted (by Restaurant Owner)' && (
                        <StyledView style={{flexDirection: 'row'}}>
                          <StyledText
                            text="Time left to pay the order:"
                            tw="text-black font-bold font-[16px]"
                          />
                          <StyledText
                            text={
                              ' ' +
                              `${Math.floor(order.paymentTiming / 60)}m ${
                                order.paymentTiming % 60
                              }s`
                            }
                            tw="text-red-500 font-bold"
                          />
                        </StyledView>
                      )}
                  </StyledView>
                )}

                {order.paymentTiming > 0 && order.show_paynow_button && (
                  <Button
                    mode="contained"
                    onPress={() => initiatePayment(order)}
                    style={{
                      marginTop: 10,
                      backgroundColor: '#FE7240',
                    }}>
                    Pay Now
                  </Button>
                )}

                {order.paymentTiming > 0 && order.show_cancel_button && (
                  <Button
                    mode="outlined"
                    onPress={() => cancelOrder(order.id)}
                    style={{
                      marginTop: 10,
                      borderColor: '#FE7240',
                      borderWidth: 1,
                    }}
                    labelStyle={{color: '#FE7240'}}>
                    Cancel
                  </Button>
                )}
                {order.show_recieved_button && (
                  <Button
                    mode="contained"
                    onPress={() => handleRecievedOrder(order.order_id)}
                    style={{
                      marginTop: 10,
                      backgroundColor: '#FE7240',
                    }}>
                    Recieved
                  </Button>
                )}
              </Card.Content>
            </Card>
          ))
        )}
      </StyledView>
    </ScrollView>
  );
};

export default OrderSummary;
