import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import axios from 'axios';

export default function Home() {
  const [ active, setActive ] = React.useState(false)
  React.useEffect(() => {
    axios.put('https://635946bf38725a1746ac64d6.mockapi.io/api/v1/value/1/', {value: active})
    setTimeout(() => {
      setActive(false)
    }, 15000)
  }, [active])
  return (
    <View
      style={styles.View}
    >
      <Pressable 
        style={styles.Button}
        onPress={() => {
          setActive(!active)
        }}
      >
        <Text style={styles.Text}>
          Открыть
        </Text>
      </Pressable>
      <Text style={styles.OpenText}>
        {active ? 'Открывается' : 'Закрыто'}
      </Text> 
    </View>
  );
}

const styles = StyleSheet.create({
  View: {
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  Button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
    paddingHorizontal: 100,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: 'black',
  },
  Text: {
    color: 'white'
  },
  OpenText: {
    marginTop: 20
  }
})