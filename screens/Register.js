import React from 'react'
import { View, Text, Pressable, StyleSheet } from 'react-native'
import { Icon, Input } from 'react-native-elements'
import { API } from '../api'
import AsyncStorage from '@react-native-async-storage/async-storage';

function Register({navigation}) {
  const [name, setName] = React.useState()
  const [phone_number, setPhoneNumber] = React.useState()
  const [block, setBlock] = React.useState()
  const [apartment, setApartment] = React.useState()
  const [car_number, setCarNumber] = React.useState()
  const [password, setPassword] = React.useState()

  const handleRegister = () => {
    API.postUser({
      name, phone_number, block, apartment, car_number, password, isBlocked: false
    })
      .then(() => {
        const data = JSON.stringify({
          userId: {name, phone_number, block, apartment, car_number, password, isBlocked: false}
        })
        AsyncStorage.setItem('userId', data)
        alert('Регистрация прошла успешно!')
        navigation.navigate('Main')
      })
  }

  return (
    <View style={style.view}>
      <Input 
        placeholder="Ф.И.О"
        style={style.input}
        onChangeText={e => setName(e)}
        leftIcon={
          <Icon 
            name='person'
          />
        }
      />
      <Input 
        placeholder="Номер телефона"
        style={style.input}
        onChangeText={e => setPhoneNumber(e)}
        leftIcon={
          <Icon 
            name='phone'
          />
        }
      />
      <Input 
        placeholder="Блок"
        style={style.input}
        onChangeText={e => setBlock(e)}
        leftIcon={
          <Icon 
            name='apartment'
          />
        }
        />
      <Input 
        placeholder="Квартира"
        style={style.input}
        onChangeText={e => setApartment(e)}
        leftIcon={
          <Icon 
            name='house'
          />
        }
      />
      <Input 
        placeholder="Гос.номер автомобиля"
        style={style.input}
        onChangeText={e => setCarNumber(e)}
        leftIcon={
          <Icon 
            name=''
          />
        }
      />
      <Input  
        inputMode="password"
        placeholder="Пароль"
        style={style.input}
        onChangeText={e => setPassword(e)}
        leftIcon={
          <Icon 
            name='key'
          />
        }
      />
      <Pressable onPress={() => handleRegister()} style={style.button}>
        <Text style={style.btnText}>Регистрация</Text>
      </Pressable>
      <Text onPress={() => navigation.navigate('Auth')} style={style.p}>Войти в аккаунт</Text>
    </View>
  )
}

export default Register


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
  }
})