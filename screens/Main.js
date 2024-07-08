import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react'
import { View, Text, StyleSheet, Pressable } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome5';

function Main({navigation}) {
  const [ info, setInfo ] = React.useState(null)

  const getUserInfo = async () => {
    try {
      const userInfoString = await AsyncStorage.getItem('userId');
      const userInfo = JSON.parse(userInfoString);
      setInfo(userInfo['userId']['1'])
      API.getUser(userInfo['userId']['0'])
        .then(res => {
          const result = res.data
          const data = JSON.stringify({
            'userId': {
              "0" : userInfo['userId']['0'],
              "1": result
            }
          })
          setInfo(data['userId']['1'])
          AsyncStorage.setItem('userId', data)
        })
      return userInfo;
    } catch (error) {
    }
    return 'Нету';
  };

  React.useEffect(() => {
    getUserInfo()
  }, [info])

  if(info && info?.isBlocked){
    alert('Ваш аккаунт заблокирован!')
    navigation.navigate('Auth')
  }
  

  return (
    <View style={style.view}>
      <Pressable
        style={style.btn}
        onPress={() => navigation.navigate('Profile')}
      >
        <Text style={style.btnText}>
          <Icon name='user' size={30}/> Профиль 
        </Text>
      </Pressable>
      <Pressable
        style={style.btn}
        onPress={() => navigation.navigate('Open')}
      >
        <Text style={style.btnText}>
          <Icon name='door-open' size={30}/> Ворота
        </Text>
      </Pressable>
      <Pressable
        style={style.btn}
        onPress={() => navigation.navigate('AdminAuth')}
      >
        <Text style={style.btnText}>
          <Icon name='key' size={30}/> Админ
        </Text>
      </Pressable>
    </View>
  )
}

export default Main

const style = StyleSheet.create({
  view: {
    display: 'flex',
    alignItems: 'center',
    height: '100%',
  },  
  h1: {
    // fontSize: '36px'
  },
  btn: {  
    width: '100%',
    height: 70,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'orangered',
    borderBottomWidth: 2,
    borderBottomColor: 'white'
  },
  btnText: {
    // fontSize: '24px',
    color: 'white'
  }
})