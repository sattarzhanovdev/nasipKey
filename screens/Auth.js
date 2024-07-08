import AsyncStorage from '@react-native-async-storage/async-storage'
import React from 'react'
import { View, Text, Pressable, StyleSheet } from 'react-native'
import { Icon, Input } from 'react-native-elements'

function Auth({navigation}) {
  React.useEffect(() => {
    AsyncStorage.getItem('isRegistered') && navigation.navigate('Main')
  }, [])

  return (
    <View style={style.view}>
      <Input 
        placeholder="Номер телефона"
        style={style.input}
        leftIcon={
          <Icon 
            name='phone'
          />
        }
      />
      <Input  
        inputMode="password"
        placeholder="Пароль"
        style={style.input}
        leftIcon={
          <Icon 
            name='key'
          />
        }
      />
      <Pressable style={style.button}>
        <Text style={style.btnText}>Войти</Text>
      </Pressable>
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
    fontSize: '36px',
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
    fontSize: '20px',
    marginTop: 20
  },
  btnText: {
    color: 'white'
  }
})