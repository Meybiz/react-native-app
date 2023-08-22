import axios from 'axios';
import React, {useEffect} from 'react';
import { View, TextInput, Button, Text } from 'react-native';
import {  useNavigation } from '@react-navigation/native';
import { observer } from 'mobx-react-lite';
import { userStore } from '../store/rootStore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Keychain from 'react-native-keychain';


const RootScreen = observer(() => {
  const [phone, setPhone] = React.useState('');
  const nav = useNavigation()
  
  const handleSubmit = async () => {
    try {
      const res = await axios.post('http://10.0.2.2:8080/api/check', {phone});
      const userData = res.data
    if(userData.id) {
      // await Keychain.setGenericPassword('authenticationToken', JSON.stringify(userData))
      await AsyncStorage.setItem('userData', JSON.stringify(userData))
      alert(`${JSON.stringify(res)}`)
      userStore.userData(userData)
      nav.navigate('Login')
    } else {
      alert('Такого телефона нет в базе')
    }
    }
    catch (err){
      console.error('Ошибка авторизации:', err)
    }
    
  }
  // useEffect(() => {
  //   const checkAuth = async () => {
  //     try {
  //       const credit = await Keychain.getGenericPassword()
  //     if(credit) {
  //       const userData = JSON.parse(credit.password)
  //       userStore.userData(userData)
  //       nav.navigate('User')
  //     }
  //     } 
  //     catch (err) {
  //       console.error('Ошибка проверки:', err)
  //     }
      
  //   }
  //   checkAuth()
  // }, [])
  return (
    <View>
      <TextInput placeholder="Phone" value={phone} onChangeText={text => setPhone(text)} />
      <Button title="Login" onPress={handleSubmit}/>
    </View>
  );
});

export default RootScreen;