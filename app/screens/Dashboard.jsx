import React, {useEffect, useState} from 'react';
import {
  Appbar,
  Card,
  PaperProvider,
  Paragraph,
  Title,
} from 'react-native-paper';
import {StyledView} from '../components';
import {apiURL} from '../constants/urls';
import {LeftPanel} from '../navigation/DrawerNavigator';
import {getData} from '../services/api/apiService';

const Dashboard = ({navigation}) => {
  const [statistics, setStatistics] = useState(null);

  useEffect(() => {
    LeftPanel();
    getStatistics();
  }, []);

  const getStatistics = async () => {
    try {
      const res = await getData(apiURL.RESTAURANT_STATISTICS);
      setStatistics(res.data);
    } catch (err) {}
  };
  const logoutUser = async () => {
    try {
      const res = await getData(apiURL.LOGOUT);
      navigation.navigate('Logout');
    } catch (err) {}
  };

  return (
    <PaperProvider>
      <StyledView tw="flex-1">
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
        </Appbar.Header>
        <StyledView tw="flex-1 items-center p-2 bg-white">
          {statistics && (
            <StyledView tw="w-full px-4 mt-4">
              {/* Today's Statistics */}
              <StyledView tw="flex-row justify-between mb-4">
                <Card
                  style={{
                    marginBottom: 10,
                    backgroundColor: '#fff',
                    borderColor: '#FE7420',
                    borderWidth: 1,
                    borderRadius: 10,
                    flex: 1,
                    marginRight: 8,
                    height: 80,
                  }}>
                  <Card.Content>
                    <Title style={{color: '#FE7420'}}>Today's Order</Title>
                    <Paragraph style={{color: '#FE7420', fontSize: 20}}>
                      {statistics.todays_orders}
                    </Paragraph>
                  </Card.Content>
                </Card>
                <Card
                  style={{
                    marginBottom: 10,
                    backgroundColor: '#fff',
                    borderColor: '#FE7420',
                    borderWidth: 1,
                    borderRadius: 10,
                    flex: 1,
                    marginLeft: 8,
                    height: 80,
                  }}>
                  <Card.Content>
                    <Title style={{color: '#FE7420'}}>Today's Revenue</Title>
                    <Paragraph style={{color: '#FE7420', fontSize: 20}}>
                      ₹{statistics.todays_revenue}
                    </Paragraph>
                  </Card.Content>
                </Card>
              </StyledView>

              {/* Total Statistics */}
              <StyledView tw="flex-row justify-between">
                <Card
                  style={{
                    marginBottom: 10,
                    backgroundColor: '#fff',
                    borderColor: '#FE7420',
                    borderWidth: 1,
                    borderRadius: 10,
                    flex: 1,
                    marginRight: 8,
                    height: 80,
                  }}>
                  <Card.Content>
                    <Title style={{color: '#FE7420'}}>Total Orders</Title>
                    <Paragraph style={{color: '#FE7420', fontSize: 20}}>
                      {statistics.total_orders}
                    </Paragraph>
                  </Card.Content>
                </Card>
                <Card
                  style={{
                    backgroundColor: '#fff',
                    borderColor: '#FE7420',
                    borderWidth: 1,
                    borderRadius: 10,
                    flex: 1,
                    marginLeft: 8,
                    height: 80,
                  }}>
                  <Card.Content>
                    <Title style={{color: '#FE7420'}}>Total Revenue</Title>
                    <Paragraph style={{color: '#FE7420', fontSize: 20}}>
                      ₹{statistics.total_revenue}
                    </Paragraph>
                  </Card.Content>
                </Card>
              </StyledView>
            </StyledView>
          )}
        </StyledView>
      </StyledView>
    </PaperProvider>
  );
};

export default Dashboard;
