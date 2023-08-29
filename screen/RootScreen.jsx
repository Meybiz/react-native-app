import axios from 'axios';
import React, {useState} from 'react';
import { View, TextInput, Button } from 'react-native';
import {  useNavigation } from '@react-navigation/native';
import { observer } from 'mobx-react-lite';
import { userStore } from '../store/rootStore';

const RootScreen = observer(() => {
  const [phone, setPhone] = useState('');
  const nav = useNavigation()
  const handleSubmit = async () => {    
    try {
      const res = await axios.post('http://10.0.2.2:8080/api/check', {phone});
      const userData = res.data
    if(userData.id) {
      userStore.handlePhone(phone)
      nav.navigate('Login')
    } else {
      alert('Такого телефона нет в базе')
    }
    }
    catch (err){
      console.error('Ошибка авторизации:', err)
    }
    
  }

  return (
    <View style={{marginTop: 150}}>
      <TextInput placeholder="Phone" value={phone} onChangeText={text => setPhone(text)} />
      <Button title="Login" onPress={handleSubmit}/>
    </View>
  );
});

export default RootScreen;