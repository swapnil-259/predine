import {useFocusEffect} from '@react-navigation/native';
import {useCallback, useState} from 'react';
import {ScrollView} from 'react-native';
import {
  Button,
  Card,
  List,
  Paragraph,
  SegmentedButtons,
  Title,
} from 'react-native-paper';
import {StyledView} from '../../components';
import {apiURL} from '../../constants/urls';
import {getData, postData} from '../../services/api/apiService';

const Orders = () => {
  const [value, setValue] = useState('all');
  const [ordersData, setOrdersData] = useState([]);

  const orders = async () => {
    try {
      const res = await getData(apiURL.ORDERS);
      const orders = res.data || [];
      setOrdersData(orders);
    } catch (err) {
      console.error('Error fetching orders:', err);
    }
  };

  useFocusEffect(
    useCallback(() => {
      orders();
    }, []),
  );

  const handleAccept = async orderId => {
    try {
      const res = await postData(apiURL.ACCEPT_ORDERS, {
        order_id: orderId,
      });
      orders();
    } catch (error) {
      console.log('Error accepting order:', error);
    }
  };

  const handleReject = async orderId => {
    try {
      const res = await postData(apiURL.REJECT_ORDERS, {
        order_id: orderId,
      });
      orders();
    } catch (error) {
      console.log('Error rejecting order:', error);
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

      <ScrollView contentContainerStyle={{paddingBottom: 16, flexGrow: 1}}>
        {/* Display orders based on the selected segment and sort by order_time */}
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
          .sort((a, b) => new Date(b.order_time) - new Date(a.order_time)) // Sort by order_time in descending order
          .map(order => (
            <Card
              key={order.order_id}
              style={{marginVertical: 10, backgroundColor: '#FEF7F4'}}>
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
                    titleStyle={{fontWeight: 'bold'}}
                    descriptionStyle={{fontWeight: 'bold'}}
                    key={dish.dish_id}
                    title={`${dish.dish_name} (x${dish.quantity})`}
                    description={`Amount: Rs ${dish.amount}`}
                    left={props => (
                      <List.Icon {...props} icon="silverware-fork-knife" />
                    )}
                    style={{paddingVertical: 4}}
                  />
                ))}
              </Card.Content>

              {/* Conditional rendering of Accept and Reject buttons */}
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
            </Card>
          ))}
      </ScrollView>
    </StyledView>
  );
};

export default Orders;
