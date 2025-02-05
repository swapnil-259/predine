import {useFocusEffect} from '@react-navigation/native';
import axios from 'axios';
import {useCallback, useState} from 'react';
import {ScrollView, Text} from 'react-native';
import {
  Button,
  Card,
  IconButton,
  List,
  Paragraph,
  SegmentedButtons,
  Title,
} from 'react-native-paper';
import Sound from 'react-native-sound';
import {StyledButton, StyledView} from '../../components';
import {apiURL} from '../../constants/urls';
import {getData, postData} from '../../services/api/apiService';
import {baseURL} from '../../services/api/axios';
const ManageOrders = () => {
  const [value, setValue] = useState('all');
  const [ordersData, setOrdersData] = useState([]);
  const [prevOrderCount, setPrevOrderCount] = useState(0);

  const notificationSound = new Sound(
    require('../../assets/sounds/notification.mp3'),
    error => {
      if (error) {
        console.error('Failed to load the sound', error);
      }
    },
  );
  const calculateRemainingTime = orderTime => {
    const orderTimestamp = new Date(orderTime).getTime();
    const currentTimestamp = new Date().getTime();
    const timeDiff = Math.max(0, 120000 - (currentTimestamp - orderTimestamp));
    return Math.floor(timeDiff / 1000);
  };

  const updateTimers = () => {
    setOrdersData(prevOrders =>
      prevOrders.map(order => ({
        ...order,
        remainingTime: calculateRemainingTime(order.order_time),
      })),
    );
  };

  const getOrderSummary = async () => {
    try {
      const res = await getData(apiURL.MANAGE_ORDERS);

      setOrdersData(res.data);
    } catch (err) {
      console.log('Error fetching restaurant data:', err);
    }
  };

  const handleUpdateOrderStatus = async orderId => {
    try {
      const updatedOrder = await postData(apiURL.COMPLETE_ORDER, {
        orderId: orderId,
      });
      fetchOrders();
    } catch (error) {
      console.error('Error updating order status:', error);
    }
  };

  const handleRecievedOrder = async orderId => {
    try {
      const canceledOrder = await postData(apiURL.RECIEVED_ORDER, {
        orderId: orderId,
      });
      fetchOrders();
    } catch (error) {
      console.error('Error marking order as received:', error);
    }
  };

  const fetchOrders = async () => {
    try {
      const res = await axios.get(baseURL + apiURL.MANAGE_ORDERS);
      const sortedOrders = res.data.data
        .sort((a, b) => new Date(b.order_time) - new Date(a.order_time))
        .map(order => ({
          ...order,
          remainingTime: calculateRemainingTime(order.order_time),
        }));

      if (sortedOrders.length > prevOrderCount) {
        notificationSound.play();
      }

      setPrevOrderCount(sortedOrders.length);
      setOrdersData(sortedOrders);
    } catch (err) {
      console.error('Error fetching orders:', err);
    }
  };

  const cancelDish = async dishId => {
    try {
      await postData(apiURL.CANCEL_DISH, {dish_id: dishId});
      fetchOrders();
    } catch (error) {
      console.error('Error cancelling dish:', error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      getOrderSummary();
      const timerInterval = setInterval(updateTimers, 1000);
      const pollingInterval = setInterval(fetchOrders, 3000);

      return () => {
        clearInterval(timerInterval);
        clearInterval(pollingInterval);
      };
    }, [prevOrderCount]),
  );

  const handleAccept = async orderId => {
    try {
      await postData(apiURL.ACCEPT_ORDERS, {order_id: orderId});
      fetchOrders();
    } catch (error) {
      console.error('Error accepting order:', error);
    }
  };

  const handleReject = async orderId => {
    try {
      await postData(apiURL.REJECT_ORDERS, {order_id: orderId});
      fetchOrders();
    } catch (error) {
      console.error('Error rejecting order:', error);
    }
  };

  const allCount = ordersData.length;
  const pendingCount = ordersData.filter(
    order => order.order_status === 'Pending',
  ).length;
  const prevCount = ordersData.filter(
    order =>
      order.order_status !== 'Pending' &&
      (order.order_status === 'Accepted' || order.order_status === 'Rejected'),
  ).length;

  return (
    <StyledView tw="flex-1 p-4 bg-white">
      <SegmentedButtons
        value={value}
        style={{
          backgroundColor: '#FEF7F4', // Background color of the segmented button container
          borderRadius: 20, // Rounded corners to make the background fit the buttons
          padding: 2, // Ensures that the buttons don't stretch beyond their container
        }}
        onValueChange={setValue}
        buttons={[
          {
            value: 'all',
            label: (
              <Text
                style={{
                  fontWeight: 'bold',
                  color: value === 'all' ? '#FF6347' : '#000',
                }}>
                All ({allCount})
              </Text>
            ),
            icon: 'format-list-bulleted',
            style: {
              backgroundColor: value === 'all' ? '#FEF7F4' : '#fff',
            },
          },
          {
            value: 'pending',
            label: (
              <Text
                style={{
                  fontWeight: 'bold',
                  color: value === 'pending' ? '#FF6347' : '#000',
                }}>
                Pending ({pendingCount})
              </Text>
            ),
            icon: 'clock',
            style: {
              backgroundColor: value === 'pending' ? '#FEF7F4' : '#fff',
            },
          },
          {
            value: 'prev',
            label: (
              <Text
                style={{
                  fontWeight: 'bold',
                  color: value === 'prev' ? '#FF6347' : '#000',
                }}>
                Previous ({prevCount})
              </Text>
            ),
            icon: 'history',
            style: {
              backgroundColor: value === 'prev' ? '#FEF7F4' : '#fff',
            },
          },
        ]}
      />

      <ScrollView contentContainerStyle={{paddingBottom: 16, flexGrow: 1}}>
        {ordersData
          .filter(order => {
            if (value === 'all') return true;
            if (value === 'pending') return order.order_status === 'Pending';
            if (value === 'prev')
              return (
                order.order_status !== 'Pending' &&
                (order.order_status === 'Accepted' ||
                  order.order_status === 'Rejected')
              );
            return false;
          })
          .sort((a, b) => new Date(b.order_time) - new Date(a.order_time))
          .map(order => (
            <Card
              key={order.order_id}
              style={{
                marginVertical: 10,
                backgroundColor:
                  order.payment_status === 'Success'
                    ? '#baf5c2'
                    : order.payment_status === 'Cancelled'
                    ? '#FFD1D1'
                    : '#FEF7F4',
              }}>
              <Card.Content>
                <Title>{`Order ID: ${order.order_id}`}</Title>
                <Paragraph>{`Total Amount: Rs ${order.total_amount}`}</Paragraph>
                <Paragraph>{`Order Status: ${order.order_status}`}</Paragraph>
                <Paragraph>{`Food Status: ${
                  order.food_status === null ? 'No Status' : order.food_status
                }`}</Paragraph>
                <Paragraph>{`Order Time: ${new Date(
                  order.order_time,
                ).toLocaleString()}`}</Paragraph>
                <Paragraph>{`Order Receiving Time: ${new Date(
                  order.order_receiving_time,
                ).toLocaleString()}`}</Paragraph>
                <Paragraph>{`Payment Status: ${
                  order.payment_status || 'N/A'
                }`}</Paragraph>
                <Paragraph>{`Reciever Status: ${
                  order.receiver_status || 'N/A'
                }`}</Paragraph>
                <Paragraph>Dishes:</Paragraph>
                {order.dishes.map(dish => (
                  <List.Item
                    titleStyle={{fontWeight: 'bold'}}
                    descriptionStyle={{fontWeight: 'bold'}}
                    key={dish.dish_id}
                    title={`${dish.dish_name} (x${dish.quantity})`}
                    description={`Amount: Rs ${dish.amount}`}
                    left={props => (
                      <List.Icon {...props} icon="silverware-fork-knife" />
                    )}
                    right={
                      order.order_status === 'Pending'
                        ? props => (
                            <IconButton
                              {...props}
                              icon="close"
                              onPress={() => cancelDish(dish.id)}
                              style={{alignSelf: 'center'}}
                              iconColor="red"
                            />
                          )
                        : null
                    }
                    style={{paddingVertical: 4}}
                  />
                ))}
                {order.remainingTime > 0 &&
                  order.order_status === 'Pending' && (
                    <Paragraph
                      style={{
                        color: 'red',
                        fontWeight: 'bold',
                        paddingVertical: 4,
                      }}>
                      Time left to respond:{' '}
                      {Math.floor(order.remainingTime / 60)}m{' '}
                      {order.remainingTime % 60}s
                    </Paragraph>
                  )}
              </Card.Content>

              {order.order_status === 'Pending' && (
                <Card.Actions>
                  <Button
                    mode="contained"
                    onPress={() => handleAccept(order.order_id)}
                    style={{marginRight: 8, backgroundColor: 'green'}}>
                    Accept
                  </Button>
                  <Button
                    mode="contained"
                    onPress={() => handleReject(order.order_id)}
                    style={{backgroundColor: 'red'}}>
                    Reject
                  </Button>
                </Card.Actions>
              )}
              {order.food_status === 'Preparing' && (
                <StyledButton
                  mode="contained"
                  onPress={() => handleUpdateOrderStatus(order.order_id)}
                  style={{marginTop: 10}}
                  label={'Completed'}
                />
              )}
              {order.food_status === 'Completed' &&
                order.receiver_status === 'Pending' && (
                  <StyledButton
                    mode="contained"
                    onPress={() => handleRecievedOrder(order.order_id)}
                    style={{marginTop: 10}}
                    label={'Received'}
                  />
                )}
            </Card>
          ))}
      </ScrollView>
    </StyledView>
  );
};

export default ManageOrders;
