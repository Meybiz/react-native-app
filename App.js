import { StyleSheet } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './screen/LoginScreen.jsx';
import UserScreen from './screen/UserScreen.jsx';
import { NavigationContainer } from '@react-navigation/native';
import { observer } from 'mobx-react-lite';
import RootScreen from './screen/RootScreen.jsx';
import React from 'react'
import LoadingScreen from './screen/LoadingScreen.jsx';
const Stack = createStackNavigator();
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
const App = observer(() => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Loading">
            <Stack.Screen name='Loading' component={LoadingScreen} options={{ headerShown: false }} />
            <Stack.Screen name='User' component={UserScreen} options={{ headerShown: false }} />
            <Stack.Screen name='Root' component={RootScreen} options={{ headerShown: false }} />
            <Stack.Screen name='Login' component={LoginScreen} options={{ headerShown: false }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
})



export default App;