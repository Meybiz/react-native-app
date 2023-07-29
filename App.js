import { StyleSheet } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './screen/LoginScreen.jsx';
import UserScreen from './screen/ProfileScreen.jsx';
import { NavigationContainer } from '@react-navigation/native';
import { observer } from 'mobx-react-lite';
import RegistrationScreen from './screen/RegistrationScreen.jsx';

const Stack = createStackNavigator();
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
const App = observer(() => {

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name='Login' component={LoginScreen}/>
        <Stack.Screen name='Reg' component={RegistrationScreen}/>
        <Stack.Screen name='User' component={UserScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
})



export default App;