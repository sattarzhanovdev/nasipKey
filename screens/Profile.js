import AsyncStorage from '@react-native-async-storage/async-storage'
import React from 'react'
import { Text, View } from 'react-native'

function Profile() {
  const profileInfo = AsyncStorage.getItem('isRegistered') 
  console.log(profileInfo);
  // const profile = JSON.parse(profileInfo)
  return (
    <View>
      <Text>
      </Text>
    </View>
  )
}

export default Profile