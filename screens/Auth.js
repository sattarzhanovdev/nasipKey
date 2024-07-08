import AsyncStorage from '@react-native-async-storage/async-storage'
import React from 'react'
import { View, Text, Pressable, StyleSheet } from 'react-native'
import { Icon, Input } from 'react-native-elements'
import { API } from '../api'

function Auth({navigation}) {
  const [ users, setUsers ] = React.useState(null)
  const [ status, setStatus ] = React.useState(false)
  const [ phone, setPhone ] = React.useState('')
  const [ password, setPassword ] = React.useState('')

  const getUserInfo = async () => {
    try {
      const userInfoString = await AsyncStorage.getItem('userId');
      const userInfo = JSON.parse(userInfoString);
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
      setInfo(userInfo['userId']['1'])
      return userInfo;
    } catch (error) {
    }
    return 'Нету';
  };

  const handleAuth = async () => {
    API.getUsers()
      .then(res => {
        const result = Object.entries(res.data).map((item, id) => {
          return {
            ...item
          }
        })
        const user = result && result?.find(item => item["1"].phone_number === phone && item["1"].password === password)
        if(user){
          const userInfo = {
            userId: user
          }

          const jsonUser = JSON.stringify(userInfo)
          AsyncStorage.setItem('userId', jsonUser)
          setStatus(false)
          getUserInfo()
        }
      })
      // getUserInfo()["1"] !== null && navigation.navigate('Main')
  }

  return (
    <View style={style.view}>
      <Input 
        placeholder="Номер телефона"
        style={style.input}
        onChangeText={e => setPhone(e)}
        leftIcon={
          <Icon 
            name='phone'
          />
        }
      />
      <Input  
        inputMode="password"
        placeholder="Пароль"
        onChangeText={e => setPassword(e)}
        style={style.input}
        leftIcon={
          <Icon 
            name='key'
          />
        }
      />
      <Pressable 
        style={style.button}
        onPress={() => handleAuth()}
      >
        <Text style={style.btnText}>Войти</Text>
      </Pressable>
      {status ? <Text style={style.errorText}>Введите верный пароль</Text> : ''}
      <Text onPress={() => navigation.navigate('Register')} style={style.p}>Регистрация</Text>
    </View>
  )
}

export default Auth


const style = StyleSheet.create({
  view: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '80%'
  },
  h1: {
    color: 'black',
    // fontSize: '36px',
    marginBottom: 50
  },
  input: {
    width: 250,
    height: 40
  },   
  button: {
    width: '95%',
    height: 50,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'orangered'
  },
  p: {
    color: 'black',
    // fontSize: '20px',
    marginTop: 20
  },
  btnText: {
    color: 'white'
  },
  errorText: {
    color: 'red',
    marginTop: 10
  }
})