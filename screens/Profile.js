import AsyncStorage from '@react-native-async-storage/async-storage'
import React from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import { API } from '../api';

function Profile({navigation}) {
  const [ info, setInfo ] = React.useState(null)
  const [ id, setId ] = React.useState(null)

  const getUserInfo = async () => {
    try {
      const userInfoString = await AsyncStorage.getItem('userId');
      if (userInfoString !== null) {
        const userInfo = JSON.parse(userInfoString);
        console.log(userInfo);
        API.getUser(userInfo['userId']['0'])
          .then(res => {
            const result = res.data
            const data = JSON.stringify({
              'userId': {
                "0" : userInfo['userId']['0'],
                "1": result
              }
            })
            AsyncStorage.setItem('userId', data)
          })
        setInfo(userInfo['userId']['1'])
        setId(userInfo['userId']['0'])
        return userInfo;
      }
    } catch (error) {
    }
    return null;
  };

  React.useEffect(() => {
    getUserInfo()
  }, [])

  return (
    <View style={styles.view}>
      <Text style={styles.text}>
        Имя: {info && info['name']}
      </Text>
      <Text style={styles.text}>
        Номер телефона: {info && info['phone_number']}
      </Text>
      <Text style={styles.text}>
        Гос.номер машины: {info && info['car_number']}
      </Text>
      <Text style={styles.text}>
        Блок: {info && info['block']} Квартира: {info && info['apartment']}
      </Text>
      <Text style={styles.text}>
        Статус аккаунта: {info && info['isBlocked'] ? 'Заблокирован' : 'Открытый'}
      </Text>
   

      <Pressable 
        style={styles.button}
        onPress={() => {
          AsyncStorage.removeItem('userId')
            .then(() => navigation.navigate('Auth'))
        }}
      >
        <Text style={styles.btnText}>Выйти из аккаунта</Text>
      </Pressable>
    </View>
  )
}

export default Profile

const styles = StyleSheet.create({
  view: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%'
  },  
  text: {
    color: 'black',
    // fontSize: '24px',
    margin: 10
  },
  button: {
    width: 200,
    height: 40,
    backgroundColor: 'orangered',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    marginTop: 10
  },
  btnText: {
    color: 'white'
  }
})