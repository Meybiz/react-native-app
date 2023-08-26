import React from 'react';
import { Alert, View } from 'react-native';
import { observer } from 'mobx-react-lite';
import { userStore } from '../store/rootStore';
import { TextInput, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc'; // Импортируем плагин для работы с UTC
import timezone from 'dayjs/plugin/timezone';
const LoginScreen = observer(() => {
  const [passwords, setPasswords] = React.useState('')
  const phone = userStore.phone
  const nav = useNavigation()
  dayjs.extend(utc); // Активируем плагин UTC
  dayjs.extend(timezone);
  const  checkPassword = async () => {
    try {
      const checkPassword = await axios.post('http://10.0.2.2:8080/api/checkpass', {passwords, phone})

      if(checkPassword.status == 200) {
        const userData = checkPassword.data
        const serverDay = dayjs(userData.birthday).utc();
        const localFormattedDate = serverDay.local().format('DD.MM.YYYY');
         await AsyncStorage.setItem('userData', JSON.stringify(userData))
         
         
         await AsyncStorage.setItem('birthday', localFormattedDate)
         console.log(localFormattedDate)
         userStore.userData(userData, localFormattedDate)
          nav.navigate('User')
      } else {
        alert('Неправильный пароль')
      }
    } catch (err) {
      console.error('Ошибка на клиенте:', err)
    }
    // if(passwords == userStore.user.passwords) {
    //   await AsyncStorage.setItem('userData', JSON.stringify(userData))
    //   nav.navigate('User')
    // } else {
    //   alert('Неправильный пароль')
    // }
  }
  const handleCancel = () => {
    nav.navigate('Root')
  }
  return (
    <View>
        <TextInput placeholder="password" value={passwords} onChangeText={text => setPasswords(text)} />
        <Button title="Войти" onPress={checkPassword}/>
        <Button title="Отмена" onPress={handleCancel}/>
    </View>
  );
});

export default LoginScreen;