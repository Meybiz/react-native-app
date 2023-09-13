import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet, TouchableOpacity, View, Text, TextInput  } from 'react-native';
import { observer } from 'mobx-react-lite';
import { userStore } from '../store/rootStore';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc'; // Импортируем плагин для работы с UTC
import timezone from 'dayjs/plugin/timezone';
import SvgScreen from './SvgScreen';

const LoginScreen = observer(() => {

  const style = StyleSheet.create({
    input: {
      marginHorizontal: '21%',
      backgroundColor: 'whitesmoke',
      marginVertical: 20,
      borderWidth: 1,
      height: 50,
      width: '55%',
      textAlign: 'center',
      borderColor: '#d2691e'
    },
    btn: {
      backgroundColor: '#d2691e',
      width: '40%',
      height: '25%',
      marginHorizontal: '28%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 10,
    }
  })
  const [passwords, setPasswords] = React.useState('')
  const phone = userStore.phone
  const nav = useNavigation()
  dayjs.extend(utc); // Активируем плагин UTC
  dayjs.extend(timezone);
  const  checkPassword = async () => {
    // POST запрос для проверки хешей пароля
    try {
      const checkPassword = await axios.post('http://10.0.2.2:8080/api/checkpass', {passwords, phone})

      if(checkPassword.status == 200) {
        const userData = checkPassword.data
        // Преобразование даты в пользовательский вид
        const serverDay = dayjs(userData.birthday).utc();
        const localFormattedDate = serverDay.local().format('DD.MM.YYYY');
        userData.birthday = localFormattedDate
         await AsyncStorage.setItem('userData', JSON.stringify(userData))      
         userStore.userData(userData)
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
    <SafeAreaView>
      <ScrollView style={{backgroundColor: '#f5f5dc', height: '100%'}}>
        <View style={{height: 320, display: 'block', textAlign: 'center', margin: 'auto'}}>
          <SvgScreen stroke="whitesmoke"/>
        </View>
    <View style={{height: 200, display: 'flex', justifyContent:'space-between'}}>
        <TextInput style={style.input}placeholder="password" value={passwords} onChangeText={text => setPasswords(text)} />

        <TouchableOpacity style={style.btn} onPress={checkPassword}>
          <Text>Войти</Text>
        </TouchableOpacity>
        <TouchableOpacity style={style.btn} onPress={handleCancel}>
          <Text>Отмена</Text>
        </TouchableOpacity>
    </View>
    </ScrollView>
    </SafeAreaView>
  );
});

export default LoginScreen;