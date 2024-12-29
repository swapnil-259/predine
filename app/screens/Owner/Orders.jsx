import { useFocusEffect } from '@react-navigation/native';
import axios from 'axios';
import { useCallback, useState } from 'react';
import { ScrollView } from 'react-native';
import {
  Button,
  Card,
  IconButton,
  List,
  Paragraph,
  SegmentedButtons,
  Title,
} from 'react-native-paper';
import { StyledView } from '../../components';
import { apiURL } from '../../constants/urls';
import { postData } from '../../services/api/apiService';
import { baseURL } from '../../services/api/axios';

const Orders = () => {
  const [value, setValue] = useState('all');
  const [ordersData, setOrdersData] = useState([]);

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
      }))
    );
  };

  const fetchOrders = async () => {
    try {
      const res = await axios.get(baseURL + apiURL.ORDERS);
      const sortedOrders = res.data.data
        .sort((a, b) => new Date(b.order_time) - new Date(a.order_time))
        .map(order => ({
          ...order,
          remainingTime: calculateRemainingTime(order.order_time),
        }));
      setOrdersData(sortedOrders);
    } catch (err) {
      console.error('Error fetching orders:', err);
    }
  };

  const cancelDish = async (dishId) => {
    try {
      await postData(apiURL.CANCEL_DISH, {dish_id: dishId });
      fetchOrders();
    } catch (error) {
      console.error('Error cancelling dish:', error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchOrders();
      // const timerInterval = setInterval(updateTimers, 1000);
      // const pollingInterval = setInterval(fetchOrders, 3000);

      return () => {
        // clearInterval(timerInterval);
        // clearInterval(pollingInterval);
      };
    }, [])
  );

  const handleAccept = async orderId => {
    try {
      await postData(apiURL.ACCEPT_ORDERS, { order_id: orderId });
      fetchOrders();
    } catch (error) {
      console.error('Error accepting order:', error);
    }
  };

  const handleReject = async orderId => {
    try {
      await postData(apiURL.REJECT_ORDERS, { order_id: orderId });
      fetchOrders();
    } catch (error) {
      console.error('Error rejecting order:', error);
    }
  };

  return (
    <StyledView tw="flex-1 p-4 bg-white">
      <SegmentedButtons
        value={value}
        style={{
          backgroundColor: '#FEF7F4',
        }}
        onValueChange={setValue}
        buttons={[
          {
            value: 'all',
            label: 'All',
            icon: 'format-list-bulleted',
            style: {
              backgroundColor: value === 'all' ? '#FEF7F4' : '#fff',
            },
          },
          {
            value: 'pending',
            label: 'Pending',
            icon: 'clock',
            style: {
              backgroundColor: value === 'pending' ? '#FEF7F4' : '#fff',
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

      <ScrollView contentContainerStyle={{ paddingBottom: 16, flexGrow: 1 }}>
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
              style={{ marginVertical: 10, backgroundColor: '#FEF7F4' }}>
              <Card.Content>
                <Title>{`Order ID: ${order.order_id}`}</Title>
                <Paragraph>{`Total Amount: Rs ${order.total_amount}`}</Paragraph>
                <Paragraph>{`Order Status: ${order.order_status}`}</Paragraph>
                <Paragraph>{`Order Time: ${new Date(
                  order.order_time,
                ).toLocaleString()}`}</Paragraph>
                <Paragraph>{`Order Receiving Time: ${new Date(
                  order.order_receiving_time,
                ).toLocaleString()}`}</Paragraph>
                <Paragraph>{`Payment Status: ${
                  order.payment_status || 'N/A'
                }`}</Paragraph>
                <Paragraph>Dishes:</Paragraph>
                {order.dishes.map(dish => (
                  <List.Item
                    titleStyle={{ fontWeight: 'bold' }}
                    descriptionStyle={{ fontWeight: 'bold' }}
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
                              style={{ alignSelf: 'center' }}
                              iconColor="red" 
                            />
                          )
                        : null
                    }
                    style={{ paddingVertical: 4 }}
                  />
                ))}
                {order.remainingTime > 0 && order.order_status === 'Pending' && (
                  <Paragraph
                    style={{
                      color: 'red',
                      fontWeight: 'bold',
                      paddingVertical: 4,
                    }}>
                    Time left to respond: {Math.floor(order.remainingTime / 60)}m{' '}
                    {order.remainingTime % 60}s
                  </Paragraph>
                )}
              </Card.Content>

              {order.order_status === 'Pending' && (
                <Card.Actions>
                  <Button
                    mode="contained"
                    onPress={() => handleAccept(order.order_id)}
                    style={{ marginRight: 8, backgroundColor: 'green' }}>
                    Accept
                  </Button>
                  <Button
                    mode="contained"
                    onPress={() => handleReject(order.order_id)}
                    style={{ backgroundColor: 'red' }}>
                    Reject
                  </Button>
                </Card.Actions>
              )}
            </Card>
          ))}
      </ScrollView>
    </StyledView>
  );
};

export default Orders;
