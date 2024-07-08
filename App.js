import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Pages } from './screens';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Auth">
        <Stack.Screen name="Auth" component={Pages.Auth} options={{title: 'Авторизация'}} />
        <Stack.Screen name="Register" component={Pages.Register} options={{title: 'Регистрация'}} />
        <Stack.Screen name="Main" component={Pages.Main} options={{title: 'Главная страница'}} />
        <Stack.Screen name="Open" component={Pages.Open} options={{title: 'Открыть вороту'}} />
        <Stack.Screen name="Profile" component={Pages.Profile} options={{title: 'Профиль'}} />
        <Stack.Screen name="Admin" component={Pages.Admin} options={{title: 'Администратор'}} />
        <Stack.Screen name="AdminAuth" component={Pages.AdminAuth} options={{title: 'Вход в админ'}} />
        <Stack.Screen name="Apartment" component={Pages.Apartment} options={{title: 'Данные квартиры'}} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
