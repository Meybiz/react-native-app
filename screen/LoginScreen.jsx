import React from 'react';
import { Alert, View } from 'react-native';
import { observer } from 'mobx-react-lite';
import { userStore } from '../store/rootStore';
import { TextInput, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';


const LoginScreen = observer(() => {
  const [password, setPassword] = React.useState('')
  const nav = useNavigation()

  const checkPassword = () => {
    if(password == userStore.user.passwords) {
      nav.navigate('User')
    } else {
      alert('Неправильный пароль')
    }
  }
  const handleCancel = () => {
    nav.navigate('Root')
  }
  return (
    <View>
        <TextInput placeholder="password" value={password} onChangeText={text => setPassword(text)} />
        <Button title="Войти" onPress={checkPassword}/>
        <Button title="Отмена" onPress={handleCancel}/>
    </View>
  );
});

export default LoginScreen;