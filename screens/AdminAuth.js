import React from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import { Icon, Input } from 'react-native-elements'

function AdminAuth({navigation}) {
  const [ status, setStatus ] = React.useState(false)
  const [ login, setLogin ] = React.useState('')
  const [ password, setPassword ] = React.useState('')

  const handleAuth = () => {
    if(login === 'admin' && password === 'admin'){
      navigation.navigate('Admin')
      setStatus(false)
    }else{
      setStatus(true)
    }
  }

  return (
    <View style={style.view}>
      <Input 
        placeholder="login"
        style={style.input}
        onChangeText={e => setLogin(e)}
        leftIcon={
          <Icon
            name='person'
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
    </View>
  )
}

export default AdminAuth


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
    marginTop: 10,
    // fontSize: '18px'
  }
})