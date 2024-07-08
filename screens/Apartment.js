import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react'
import { View, Text, Pressable, StyleSheet } from 'react-native'
import { API } from '../api';

function Apartment() {
  const [users, setUsers] = React.useState(null);
  const [ info, setInfo ] = React.useState(null)
  const [apartments, setApartments] = React.useState(null);
  const [dep, setDep] = React.useState(0);


  const getApartmentInfo = async () => {
    try {
      const userInfoString = await AsyncStorage.getItem('apartmentUsers');
      if (userInfoString !== null) {
       const userInfo = JSON.parse(userInfoString);
       setInfo(userInfo);
       return userInfo;
      }
    } catch (error) {
      console.error('Error retrieving user info from AsyncStorage:', error);
    }
    return null;
  };
  
  React.useEffect(() => {
    API.getUsers()
      .then(res => {
        const result = Object.entries(res.data).map((item, id) => {
          return {
            ...item
          }
        });

        setUsers(result)

        const uniqueByApartment = Object.values(result.reduce((acc, item) => {
          const apartment = item["1"].apartment;
          acc[apartment] = item;
          return acc;
        }, {}));
        setApartments(uniqueByApartment); 
      }); 
      getApartmentInfo()
  }, [dep]);


  const handleBlock = (apartment) => {
    const apUsers = users?.filter(item => item["1"]["apartment"] === apartment)
    const data = []
    for(let i = 0; i < apUsers.length; i++){
      const res = users?.filter(item => item[1].apartment === apartment)[i]["1"]
      data.push(res)
    }
    const stringData = JSON.stringify(data)
    AsyncStorage.setItem('apartmentUsers', stringData)

    apUsers.forEach(item => {
      API.blockApartment(item['0'], {...item["1"], isBlocked: apartments?.find(item => item['1'].apartment === apartment)["1"].isBlocked ? false : true})
    });
    setDep(Math.random())
    console.log(info);
  }

  return (
    <View>
      <Text style={styles.text}>
        Блок: {info && info[0].block} Квартира: {info && info[0].apartment}
      </Text>
      {
        info && info.map((item, i) => (
          <View key={i} style={styles.user}>
            <Text style={{fontSize: 16}}>
              {item.name}
            </Text>
            <Text style={{fontSize: 16}}>
              {item.phone_number}
            </Text>
            <Text style={{fontSize: 16}}>
              {item.car_number}
            </Text>
            <Text style={{fontSize: 16}}>
              {!item.isBlocked ? 'Квартира заблокирована' : 'Квартира разблокирована' }
            </Text>
          </View>
        ))
      }


      {
        info && !info[0].isBlocked ?
        <Pressable style={styles.buttonGreen} onPress={() => handleBlock(info && info[0].apartment)}>
          <Text style={styles.buttonText}>
            Разблокировать 
          </Text>
        </Pressable> :
        <Pressable style={styles.buttonRed} onPress={() => handleBlock(info && info[0].apartment)}>
          <Text style={styles.buttonText}>
            Заблокировать
          </Text>
        </Pressable> 
      }
    </View>
  )
}

export default Apartment


const styles = StyleSheet.create({
  user: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: 10,
    margin: 20
  },
  text: {
    fontSize: 16,
    margin: 20
  },
  buttonRed: {
    width: '450px',
    height: 50,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'red'
  },
  buttonGreen: {
    width: '450px',
    height: 50,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'green'
  },
  buttonText: {
    color: 'white'
  }
})